const { json } = require("body-parser");
const mysql = require("mysql");
const { resolvePath } = require("react-router-dom");
/*
const pool =  mysql.createPool({
    host:   '192.168.0.102',
    user:   'root',
    port:   '3306',
    password:   'PASSWORD',
    database:   'FishingSportManagerDB',
 });
*/
 // second pool //
 const pool =  mysql.createPool({
    host:   '192.168.0.101',
    user:   'root',
    port:   '3306',
    password:   '12345678',
    database:   'FishingSportManagerDB',
 });
 // test db connection function //
const TestDBConn = () => {
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
// select data function //
const SelectData = (TableName) => new Promise((resolve,reject) => {
    const sql = 'SELECT * FROM '+TableName;
    pool.query(sql,(error,result) => {
        if(error){
            return reject(error)
        }
        return resolve(result)
    })
})
// select competition function //
const SelectCompetitionData = (TableName,CompetitionID) => new Promise((resolve,reject) => {
    const sql = 'SELECT * FROM '+TableName+' WHERE CompetitionID='+CompetitionID;
    try{
        pool.query(sql,(error,result)=>{
            if(!error){
                console.log(result)
                return resolve(result)
            }else{
                return reject(error)
            }
        })
    }catch(e){
        console.log(e);
        return reject(e)
    }
})

const Login = (un) => new Promise((resolve,reject) => {
    const sql = "SELECT * FROM UsersTable WHERE UserUN=?";
    pool.query(sql,[un],(err,results,Fields) => {
        if(err){
            return reject(err)
        }
        return resolve(results)
    })
})
const SelectCompetitionID =(dates) => new Promise((resolve,reject) => {
    console.log("<----    THIS IS NO DB MODULES    ---->\n<---- START SELECT COMPETITION ID ---->")
    let sql = "SELECT CompetitionID FROM CompetitionTable WHERE CompetitionDate=?"+" ORDER BY CompetitionID DESC LIMIT 1";
    console.log('DATE INPUT : '+dates)
    pool.query(sql,[dates],(err,result,Fields) => {
        if(err){
            return reject(err)
        }else{
            console.log(result)
            console.log('<---- SUCCESS ---->');
            return resolve(result)
        }
    })
})
const CretePriceTable = (id,date,name) => new Promise((resolve,reject) => {
    const column = []
    const TableName = 'Competition'+competitionid+'Details'
    let sql = "CREATE TABLE "+TableName+" ()"
    return resolve
})
const InsertCompetitionData = (CompetitionID,CompetitionType,CompetitionTypeName,CompetitionTotalReward) => new Promise((resolve,reject) => {
    const Datas = {
        CompetitionID : CompetitionID,
        CompetitionType: CompetitionType,
        CompetitionTypeName:CompetitionTypeName,
        CompetitionTotalReward:CompetitionTotalReward
    }
    const SqlInsert = 'INSERT INTO CompetitionDetailTable SET ?';
    pool.query(SqlInsert,Datas,(error,result) => {
       if(error){
          return reject(error);
       }
       return resolve(result);
    })
})
const InsertCompetitionRewardPrice = (CompetitionID,RewardType,RewardPrice) => new Promise((resolve,reject) => {
    const Datas = {
        CompetitionID : CompetitionID,
        CompetitionRewardType: RewardType,
        CompetitionRewardPrice: RewardPrice
    }
    const SqlInsert = 'INSERT INTO CompetitionReward SET ?';
    pool.query(SqlInsert,Datas,(error,result) => {
       if(error){
          return reject(error);
       }
       return resolve(result);
    })
 })
const TruncateTable = () => new Promise((resolve,reject) => {
    const column = []

    let sql = ""
    return resolve
}) 
module.exports = {TestDBConn,InsertData,SelectData,SelectCompetitionData,Login,SelectCompetitionID,CretePriceTable,InsertCompetitionData,InsertCompetitionRewardPrice};