const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const mysql = require("mysql")
const jsonParser = bodyParser.json()
const bcrypt = require("bcrypt")
const saltround = 10
var jwt = require("jsonwebtoken")
const { useAsyncError } = require("react-router-dom")
const secret = 'A140B3715_c'

const app = express();
//  use Libary  //
app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
   host:   'localhost',
   user:   'root',
   port:   '3306',
   password:   '12345678',
   database:   'FishingSportManagerDB',
});

// promises query function //
const InsertData = (TableName,Datas) => new Promise((resolve,reject) => {
   const SqlInsert = 'INSERT INTO '+TableName+' SET ?';
   pool.query(SqlInsert,Datas,(error,result) => {
      if(error){
         return reject(error);
      }
      return resolve(result);
   });
});
// insert to userstable //
app.post('/api/try_to_register' ,async (req,res) => {
   try{
         await bcrypt.hash(req.body.password,saltround,async (err,hashedpw)=>{
         if(err){return};
         const tablename = 'UsersTable';
         const datas = {
            UserUN: req.body.username,
            UserPW: hashedpw,
            UserR: 'user'
         };
         try{
            const insert = await InsertData(tablename,datas);
            res.status(201),json({status:"success",response_data:insert});
         }catch(err){
            res.status(500).json({status:"error",response_data:err});
         }
      })
   }catch(error){
      res.status(500).json({status:"error hash",response_data:error});
   }
});
// insert to NewsTable //
app.post('/api/addnewspost' , async (req, res) => {
   try{
      const tablename = 'NewsTable';
      const datas = {
         NewsHeader: req.body.NewsHeader,
         NewsLocation: req.body.NewsLocation,
         NewsMatchDate: req.body.NewsMatchDate,
         NewsContent: req.body.NewsContent
      };

      const insert = await InsertData(tablename,datas);

      res.status(201).json({status:"success",data: insert});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",data: error});
   }
});

// test db connection function //
const testDBConn = () => {
   return new Promise((resolve, reject) => {
      pool.getConnection((err,conn) => {
         if(err){
            reject(err);
            return;
         }else{
            conn.release();
            resolve("DB connection OK");
         }
      });
   });
};
// use testDBConn to test database connection //
testDBConn()
   .then(results => {
    console.log(results);
   })
   .catch(error => {
    console.error(error);
   });

//  insert register data  //
app.post('/api/register',(req ,res) => {
   pool.getConnection((err, conn)=>{
      if(err){res.status(500).json(err);return};
      if((req.body.username == "")||(req.body.password == "")){res.json({"massage":"please input valid"});return};
      bcrypt.hash(req.body.password,saltround,(err,hashedpw)=>{
         const data =  {UserUN:req.body.username,UserPW:hashedpw,UserR:'user'};
         let sql = "INSERT INTO UsersTable SET ?";
         conn.query(sql,data,(err, results) => {
            conn.release();
            if(err) {res.json(err);return};
               res.json({"status": 200, "error": null, "response_data": results});
         });
      })
   })
});

// show UsersTable //
app.get('/api/showuser',(req,res) =>{
   pool.getConnection((err,conn) =>{
      if(err){
         res.status(500).json(err);
         return
      }else{
         console.log("ok");
         res.status(200);
      };
      // start query data  //
      let sql = "SELECT * FROM UsersTable";
      conn.query(sql,(err,results)=>{
         conn.release();
         err ? res.status(500).json({status:'error',data:err}):res.json({status:'success',result:(results)});
      });
   });
}); 

//  check login //
app.post('/api/login',jsonParser,(req,res) => {
   let usernameN = req.body.username;
   let passN = req.body.password;
   pool.getConnection((err,conn)=>{
      if(err){res.status(500).json(err);return}
      const sql = "SELECT * FROM UsersTable WHERE UserUN=?";
      conn.query(sql,[usernameN],(err,results,fields)=>{
         if(err){res.status(500).json(err);return}
         if(results.length == 0){res.json({status:'error',message:'no have this user.',err});return}
         //if(results[0].UserPW == passN){res.json({status:'login success'})};
         bcryt.compare(passN,results[0].UserPW,(err,logged)=>{
            if(logged){
               conn.release();
               var token = jwt.sign({ username: usernameN,userRole:results[0].UserR }, secret,{expiresIn:'1h'});
               res.json({status:"ok",message:"logged in",token:token})
            }else{
               conn.release();
               res.json({status:"error",message:"wrong password"})
            };
         })
      })
   })
})

// authentication login //
app.post('/api/auth',(req,res,next)=>{
   try{
      const token = req.headers.authorization.split(" ")[1];
      var decoded = jwt.verify(token,secret);
      res.json({status:"ok",token:token,decode:decoded});
   }catch(err){
      res.json({status:"error",message:err.message})
   }
})

app.get("/api", (req, res) => {
   res.json({ message: "Hello from server!" });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`Server listening on ${PORT}`);
});