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
   })
// -------------------------------------------------- //
// login api //
app.post('/api/login',jsonParser, async (req,res) => {
   const { username, password } = req.body;
   const data = await db.Login(username);
   try{
      bcrypt.compare(password,data[0].UserPW,(err,logged)=>{
         //console.log(logged)
         if(logged){
            let logindata = { username: data[0].UserUN,userRole:data[0].UserR }
            var token = jwt.sign({exp:Math.floor(Date.now() + ((1000*60) * 60) ),data:logindata}, secret);
            res.status(200).json({status:"success",message:"logged in",token:token})
         }else{
            res.status(400).json({status:'error',message:'wrong password',data:err})
         };
      })
   }catch(error){
      res.status(400).json({status:'error',message: 'User not found',data:data});
   }
})
 
// authentication login //
app.post('/api/auth',(req,res,next)=>{
   try{
      
      const currentDate = Date.now()
      const DateNow = new Date(currentDate)
      const token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token,secret);
      let exp = decoded.exp

      if(decoded.exp < currentDate){console.log(exp+'\nexpired')}
      console.log('<----   AUTHENTED   ---->')
      console.log('<- '+ DateNow +' ->')
      console.log('username : ' + decoded.data.username)
      console.log('now: ' + new Date(currentDate))
      console.log('expire@ : ' + new Date(exp))
      console.log('<----------------------->')
      
      res.json({status:"ok",token:token,decode:decoded});
   }catch(err){
      res.json({status:"error",message:err.message})
   }
})

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
})

// insert to CompetitionTable //
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
})

// insert to CompetitionpriceTable //
app.post('/api/addcompetitionprice' , async (req, res) => {
   console.log(req.body) 
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
         console.log(values)
         const type = 'Type'+count
         const data = values['Type'+count]
         const price = parseInt(data.price)
         const typename = data.name
         const weight = data.weight[0]
         console.log(id,type,typename,price,weight)    
         console.log('***********')
         db.InsertCompetitionData(id,type,typename,price,weight)
         count++ 
      })
      price.forEach((values,index)=>{
         console.log('key : ',values[0])
         console.log('value :',values[1])    
         console.log('***********')
         let key = values[0]
         let value = values[1]
         db.InsertCompetitionRewardPrice(id,key,value)
      })
      res.status(201).json({status:"success",data: id});
      //res.status(500).json({status:"error",data: error});
   } catch(error){
      console.log(error)
      res.status(500).json({status:"error",data: error});
   }
})

// competition register //
app.post('/api/competitionregister/:Cid' , async (req,res) => {
   const cid = req.params.Cid
   let data = req.body
   let result = []
   try{
      let firstNumber = parseInt(data.fnum);
      let lastNumber = parseInt(data.lnum);
      let totalNum = (lastNumber-firstNumber) + 1;
      for(let i = 0; i < totalNum ;i++){
         let number = firstNumber + i;
         console.log('ลงทะเบียนคันที่ : '+(i+1)+'\nหมายเลข: '+number+'\nทีม: '+data.name)
         console.log('<---------------->')
         const datas = {
            registerName: data.name,
            registerNumber: number,
            CompetitionID: cid
         };
         const tablename = 'CompetitionRegisterTable';
         const insert = await db.InsertData(tablename,datas);
         result.push(insert)
      }
      res.status(201).json({status:"success",data: result});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",data: error});
   }
})

// insert Score //
app.post('/api/addscore/:Cid' , async (req, res) => {
   try{
      const cid = req.params.Cid
      const tablename = 'ScoresTable';
      const datas = {
         CompetitionID: cid,
         Number: req.body.Number,
         FishWeight: req.body.FishWeight,
         FishType: req.body.FishType
      };
      const insert = await db.InsertData(tablename,datas,cid);
      res.status(201).json({status:"success",response_data: insert});
   } catch(error){
      //console.log(error.errno);
      res.status(500).json({status:"error",response_data: error});
   }
})

// edit-update CompetitionpTable //
app.put('/api/editcompetition/:Cid' , async (req, res) => {
   const cid = req.params.Cid
   const updatedData = req.body;
   let databaseData = {}
   try{
      databaseData = { ...databaseData, ...updatedData };
      const tablename = 'CompetitionTable'; 
      const insert = await db.UpdateCompetition(tablename,databaseData,cid);
      res.status(201).json({status:"success",data: databaseData,id:cid});
   } catch(error){
      console.log(error);
      res.status(500).json({status:"error",data: error});
   }
})

// edit-update CompetitionpriceTable //
app.put('/api/updatecompetitionprice/:Cid' , async (req, res) => {
   console.log(req.body) 
   const types = req.body[0];
   const price = Object.entries(req.body[1]);
   const id = req.params.Cid
   console.log(id,"\n*********");
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
         console.log(id,type,typename,price)    
         console.log('***********')
         db.UpdateCompetitionData(id,type,typename,price)
         count++ 
      })
      price.forEach((values,index)=>{
         console.log('key : ',values[0])
         console.log('value :',values[1])    
         console.log('***********')
         let key = values[0]
         let value = values[1]
         db.UpdateCompetitionRewardPrice(id,key,value)
      })
      res.status(201).json({status:"success",data: id});
      //res.status(500).json({status:"error",data: error});
   } catch(error){
      console.log(error)
      res.status(500).json({status:"error",data: error});
   }
})

// UPDATE Competition status -> start //
app.put('/api/startcompetition/:Cid' , async (req, res) => {
   const cid = req.params.Cid
   let Data = {}
   try{
      Data = {'CompetitionStatus':'start'}
      const tablename = 'CompetitionTable'
      const insert = await db.UpdateCompetition(tablename,Data,cid);
      res.status(201).json({status:"success",data: insert,id:cid});
   } catch(error){
      console.log(error);
      res.status(500).json({status:"error",data: error});
   }
})

// UPDATE Competition status -> plan //
app.put('/api/canclecompetition/:Cid' , async (req, res) => {
   const cid = req.params.Cid
   let Data = {}
   try{
      Data = {'CompetitionStatus':'plan'}
      const tablename = 'CompetitionTable'
      const insert = await db.UpdateCompetition(tablename,Data,cid);
      res.status(201).json({status:"success",data: insert,id:cid});
   } catch(error){
      console.log(error);
      res.status(500).json({status:"error",data: error});
   }
})

// UPDATE Competition status -> end //
app.put('/api/endcompetition/:Cid' , async (req, res) => {
   const cid = req.params.Cid
   let Data = {}
   try{
      Data = {'CompetitionStatus':'end'}
      const tablename = 'CompetitionTable'
      const insert = await db.UpdateCompetition(tablename,Data,cid);
      res.status(201).json({status:"success",data: insert,id:cid});
   } catch(error){
      console.log(error);
      res.status(500).json({status:"error",data: error});
   }
})

// get competitionID for UPDATE //
app.get('/api/getcompetitionid/:CompDate' , async (req, res) => {
   try{
      const date = req.params.CompDate
      const selectedid = await db.SelectCompetitionID(date);
      const id = selectedid[0].CompetitionID;
      res.status(201).json({status:"success",data: id});
   } catch(error){
      console.log(error)
      //console.log(error.errno);
      res.status(500).json({status:"error",data: error});   
   }
})

// show competition //
app.get('/api/allcompetitions', async (req,res) => {
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

// show RgistedNumber //
app.get('/api/registednumber/:Cid', async (req,res) => {
   try{
      let cid = req.params.Cid
      //console.log(cid)
      const table = 'CompetitionRegisterTable'
      const Datas = await db.SelectCompetitionData(table,cid);
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

// show competitiondetails //
app.get('/api/competition/:Cid', async (req,res) => {
   try{
      let cid = req.params.Cid
      //console.log(cid)
      const table = 'CompetitionTable'
      const Datas = await db.SelectCompetitionData(table,cid);
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

// show competitiondetails //
app.get('/api/competitiondetail/:Cid', async (req,res) => {
   try{
      let cid = req.params.Cid
      //console.log(cid)
      const table = 'CompetitionDetailTable'
      const Datas = await db.SelectCompetitionData(table,cid);
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

// show competition reward //
app.get('/api/getcompetitionreward/:cid', async (req,res) =>{
   let cid = req.params.cid 
   try{
      let detailtable = 'CompetitionDetailTable';
      const type = await db.SelectCompetitionData(detailtable,cid);
      let rewardtable = 'CompetitionReward';
      const reward = await db.SelectCompetitionData(rewardtable,cid);
      if(type.length <= 0){
         console.log('204\n'+{type:type,reward:reward})
         res.status(204).json({status:"success",data: {type:type,reward:reward}});
      }else{
         console.log('200\n'+{type:type,reward:reward}) 
         res.status(200).json({status:"success",data: {type:type,reward:reward}});
      }
   }catch(error){
      console.log(error)
      res.status(500).json({status:"error",data: error});
   }
})

// show not starting competition //
app.get('/api/notendcompetitions', async (req,res) => {
   try{
      const Datas = await db.SelectNotEnd();
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

// show ended competition //
app.get('/api/endedcompetitions', async (req,res) => {
   try{
      const Datas = await db.SelectEnded();
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

// show started competition //
app.get('/api/startedcompetitions', async (req,res) => {
   try{
      const table = 'CompetitionTable'
      const Datas = await db.SelectStarted()
      if(Datas.length <= 0){
         console.log('StartedCompetition 204 : \n'+ {Datas})
         res.status(204).json({status:"success",data: Datas});
      }else{
         console.log('StartedCompetition 200 : \n',{Datas})
         res.status(200).json({status:"success",data: Datas});
      }
   }
   catch(error){
      console.log(error)
      res.status(500).json({status:"error",data: error});
   }
})

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

// show competition Score //
app.get('/api/showcompetitionscore/:cid', async (req,res) =>{
   let cid = req.params.cid 
   try{
      const table = 'ScoresTable';
      const Datas = await db.GetCompetitionScore(table,cid);
      if(Datas.length <= 0){
         //console.log('204 competition score : \n'+{Datas})
         res.status(204).json({status:"success",data: Datas});
      }else{
         //console.log('200 competition score : \n'+Datas)
         res.status(200).json({status:"success",data: Datas});
      }
   }catch(error){
      res.status(500).json({status:"error",data: error});
      console.log(error)
   }
})

// remove Score //
app.delete('/api/removescore/:Sid', async (req,res) =>{
   let sid = req.params.Sid 
   try{
      const table = 'ScoresTable';
      const Datas = await db.RemoveCompetitionScore(table,sid);
      res.status(200).json({status:"success",data: Datas});
   }catch(error){
      console.log('remove score error : \n' +error)
      res.status(500).json({status:"error",data: error});
      
   }
})

// show competition Score //
app.get('/api/competitionreport/:cid', async (req,res) =>{
   let cid = req.params.cid 
   try{
      let reward = []
      let allreport = []
      const Detail = await db.GetCompetitionWeight(cid);
      //console.log(Detail)

      await Promise.all(Detail.map(async (values,key) => {
         let typename = values.CompetitionTypeName
         let weight = values.CompetitionTypeWeight
         let totalreward = values.CompetitionTotalReward
         reward.push(values)
         let report = []
         if(weight===null||weight===0){
            const Datas = await db.getMaxReportCompetition(cid,totalreward)
            report = Datas.map(value => value) // Copy Datas into report array
         }else{
            const Datas = await db.GetReportCompetition(cid,weight,totalreward)
            report = Datas.map(value => value) // Copy Datas into report array
         }
         console.log(report)
         allreport[key] = {[typename]:report}
      }));
      console.log(allreport)
      res.status(200).json({status:"success",reward: reward,report:allreport});
   } catch (error) {
      console.log(error)
      res.status(500).json({status:"error",data: error});
      
   }
})


app.get("/api", (req, res) => {
   res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log(`Server listening on ${PORT}`);
});