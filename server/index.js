const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
var jwt = require("jsonwebtoken")
const db = require('./modules/db')
const mysql = require('mysql')
const http = require('http')
// ---------------------------------------------------- //
const app = express();
const router = express.Router();
const jsonParser = bodyParser.json()
const bcrypt = require("bcrypt")
const InsertData = require("./modules/db")
const { log } = require("console")
const saltround = 10
const secret = 'A140B3715_c'
app.use(cors())
CORS_ALLOW_HEADERS = (
   "accept",
   "authorization",
   "content-type",
   "user-agent",
   "x-csrftoken",
   "x-requested-with",
   "ngrok-skip-browser-warning"
)
app.use(bodyParser.json())

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
// create to CompetitionpriceTable //
app.post('/api/addcompetition' , async (req, res) => {
   try{
      const tablename = 'CompetitionTable';
      const datas = {
         CompetitionTitle: req.body.CompetitionTitle,
         CompetitionDate: req.body.CompetitionDate,
         CompetitionLocation: req.body.CompetitionLocation,
         CompetitionCost: req.body.CompetitionCost,
         CompetitionDetail: req.body.CompetitionDetail
      };
      const insert = await db.InsertData(tablename,datas);
      res.status(201).json({status:"success",data: insert});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",data: error});
   }
});
// insert to CompetitionTable //
app.post('/api/getcompetitionid' , async (req, res) => {
   try{
      const date = req.body.Date
      const selectedid = await db.SelectCompetitionID(date);
      const id = selectedid[0].CompetitionID;
      res.status(201).json({status:"success",data: id});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",data: error});   
   }
});
// create to CompetitionpriceTable //
app.post('/api/addcompetitionprice' , async (req, res) => {
   const date = req.body[0];
   const types = req.body[1];
   const price = Object.entries(req.body[2]);
   const id = req.body[3];
   console.log(id,"\n*********");
   console.log(date,"\n*********");
   console.log(types,"\n*********");
   console.log(price,"\n*********");
   try{
      //const tablename = 'CompetitionDetailTable';
      let count = 1
      types.forEach((values,index) => {
         const type = 'Type'+count
         const data = values['Type'+count]
         const price = parseInt(data.price)
         const typename = data.name
         const Id = id.CompetitionID
         console.log(id.CompetitionID,type,typename,price)    
         console.log('***********')
         db.InsertCompetitionData(Id,type,typename,price)
         count++
      })
      price.forEach((values,index)=>{
         console.log('key : ',values[0])
         console.log('value :',values[1])    
         console.log('***********')
         let key = values[0]
         let value = values[1]
         let Id = id.CompetitionID
         db.InsertCompetitionRewardPrice(Id,key,value)
      })
      res.status(201).json({status:"success",data: id.CompetitionID});
      //res.status(500).json({status:"error",data: error});
   } catch(error){
      console.log(error)
      res.status(500).json({status:"error",data: error});
   }
});
// insert to NewsTable //
app.post('/api/addscore' , async (req, res) => {
   try{
      const tablename = 'ScoresTable';
      const datas = {
         Number: req.body.Number,
         FishWeight: req.body.FishWeight,
         TeamName: req.body.TeamName,
         FishType: req.body.FishType
      };
      const insert = await db.InsertData(tablename,datas);
      res.status(201).json({status:"success",response_data: insert});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",response_data: error});
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
app.get('/api/competition', async (req,res) => {
   try{
      const table = 'CompetitionTable'
      const Datas = await db.SelectData(table);``
      if(Datas.length <= 0){
         res.status(204).json({status:"success",data: Datas});
      }else{
         res.status(200).json({status:"success",data: Datas});
      }
   }
   catch(error){
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
// show Score //
app.get('/api/showscore', async (req,res) =>{
   try{
      const table = 'ScoresTable';
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
// login api //
app.post('/api/login',jsonParser, async (req,res) => {
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