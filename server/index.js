const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
var jwt = require("jsonwebtoken")
const db = require('./modules/db')
const mysql = require('mysql')
// ---------------------------------------------------- //
const app = express();
const jsonParser = bodyParser.json()
const bcrypt = require("bcrypt")
const InsertData = require("./modules/db")
const saltround = 10
const secret = 'A140B3715_c'
app.use(cors());
app.use(bodyParser.json());
// --------------------------------------------------- //
// use testDBConn to test database connection //
db.TestDBConn()
   .then(results => {
    console.log(results);
   })
   .catch(error => {
    console.error(error);
   });
// -------------------------------------------------- //

// insert to userstable //
app.post('/api/register' ,async (req,res) => {
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
            const insert = await db.InsertData(tablename,datas);
            res.status(201),json({status:"success",response_data:insert});
         }catch(err){
            res.status(400).json({status:"error INSERT",response_data:err});
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
      const insert = await db.InsertData(tablename,datas);
      res.status(201).json({status:"success",data: insert});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",data: error});
   }
});

// show UsersTable //
app.get('/api/showuser', async (req,res) =>{
   try{
      const table = 'UsersTable';
      const Datas = await db.SelectData(table);
      if(Datas.length <= 0){
         res.status(204).json({status:"error",data: error});
      }else{
         res.status(200).json({status:"success",data: Datas});
      }
   }catch(error){
      res.status(500).json({status:"error",data: error});
   }
})
// show NewsTable //
app.get('/api/news', async (req,res) => {
   try{
      const table = 'NewsTable'
      const Datas = await db.SelectData(table);
      if(Datas.length <= 0){
         res.status(204).json({status:"error",data: error});
      }else{
         res.status(200).json({status:"success",data: Datas});
      }
   }
   catch(error){
      res.status(500).json({status:"error",data: error});
   }
})
//  check login //
app.post('/api/login',jsonParser,(req,res) => {
   const pool =  mysql.createPool({
      host:   '192.168.0.102',
      user:   'root',
      port:   '3306',
      password:   'PASSWORD',
      database:   'FishingSportManagerDB',
   });
   let usernameN = req.body.username;
   let passN = req.body.password;
   pool.getConnection((err,conn)=>{
      if(err){res.status(500).json(err);return}
      const sql = "SELECT * FROM UsersTable WHERE UserUN=?";
      conn.query(sql,[usernameN],(err,results,fields)=>{
         if(err){res.status(500).json(err);return}
         if(results.length == 0){res.json({status:'error',message:'no have this user.',err});return}
         //if(results[0].UserPW == passN){res.json({status:'login success'})};
         bcrypt.compare(passN,results[0].UserPW,(err,logged)=>{
            if(logged){
               conn.release();
               var token = jwt.sign({ username: usernameN,userRole:results[0].UserR }, secret ,{expiresIn:'1h'});
               res.json({status:"ok",message:"logged in",token:token})
            }else{
               conn.release();
               res.json({status:"error",message:"wrong password"})
            };
         })
      })
   })
})
// new login api //
app.post('/api/test/login',jsonParser, async (req,res) => {
   const { username, password } = req.body;
   const data = await db.Login(username);
   try{
      bcrypt.compare(password,data[0].UserPW,(err,logged)=>{
         //console.log(logged)
         if(logged){
            var token = jwt.sign({ username: data[0].UserUN,userRole:data[0].UserR }, secret ,{expiresIn:'1h'});
            res.status(200).json({status:"success",message:"logged in",token:token})
         }else{
            res.status(400).json({status:"error",message:"wrong password",data:err})
         };
      })
   }catch(error){
      res.status(400).json({ error: 'User not found' });
   }
})
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
   const token = req.headers['authorization'];
 
   if (!token) {
     return res.status(401).send('Unauthorized');
   }
 
   jwt.verify(token, secretKey, (err, user) => {
     if (err) {
       return res.status(403).send('Invalid token');
     }
     req.user = user;
     next();
   });
 };
 // Example route that requires authentication
app.get('/secure-route', verifyToken, (req, res) => {
   // Access user details from req.user
   res.json({ message: 'This is a secure route', user: req.user });
 });
 
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