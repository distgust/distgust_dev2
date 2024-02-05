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
       })
    })
 }

const SelectData = (TableName) => new Promise((resolve,reject) => {
    const sql = 'SELECT * FROM '+TableName;

    pool.query(sql,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
        }
    })
})

const SelectCompetitionData = (TableName,CompetitionID) => new Promise((resolve,reject) => {
    const sql = 'SELECT * FROM '+TableName+' WHERE CompetitionID='+CompetitionID;
    try{
        pool.query(sql,(error,result)=>{
            if(!error){
                //console.log(result)
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
        }else{
            return resolve(results)
        }
    })
})

const SelectCompetitionID =(dates) => new Promise((resolve,reject) => {
    console.log("<----    THIS IS ON DB MODULES    ---->\n<---- START SELECT COMPETITION ID ---->")
    let sql = 'SELECT CompetitionID FROM CompetitionTable ORDER BY CompetitionID DESC LIMIT 1 ';
    console.log('DATE INPUT : '+dates)
    pool.query(sql,[dates],(err,result) => {
        if(err){
            return reject(err)
        }else{
            console.log(result)
            console.log('<---- SUCCESS ---->');
            return resolve(result)
        }
    })
})

const InsertData = (TableName,Datas) => new Promise((resolve,reject) => {
    const SqlInsert = 'INSERT INTO '+TableName+' SET ?';
    pool.query(SqlInsert,Datas,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
        }
    })
})

const InsertCompetitionData = ( CompetitionID, CompetitionType,CompetitionTypeName, CompetitionTotalReward) => new Promise((resolve,reject) => {
    const Datas = {
        CompetitionID : CompetitionID,
        CompetitionType: CompetitionType,
        CompetitionTypeKey: CompetitionType+'_'+CompetitionID,
        CompetitionTypeName:CompetitionTypeName,
        CompetitionTotalReward:CompetitionTotalReward
    }
    const SqlInsert = 'INSERT INTO CompetitionDetailTable SET ?';
    pool.query(SqlInsert,Datas,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
       }
    })
})

const InsertCompetitionRewardPrice = (CompetitionID,RewardType,RewardPrice) => new Promise((resolve,reject) => {
    const Datas = {
        CompetitionID : CompetitionID,
        CompetitionRewardType: RewardType,
        CompetitionRewardTypeKey: RewardType+'_'+CompetitionID,
        CompetitionRewardPrice: RewardPrice
    }
    const SqlInsert = 'INSERT INTO CompetitionReward SET ?';
    pool.query(SqlInsert,Datas,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
        }
    })
})

 const UpdateCompetition = (TableName,Datas,Cid) => new Promise((resolve,reject) => {
    const SqlUpdate = 'UPDATE '+TableName+' SET ? WHERE CompetitionID='+Cid
    pool.query(SqlUpdate,Datas,(error,result) => {
       if(error){
            console.log(error)
            return reject(error)

        }else{
            return resolve(result)
        }
            
    })
})

const UpdateCompetitionData = ( CompetitionID, CompetitionType, CompetitionTypeName,CompetitionTotalReward) => new Promise((resolve,reject) => {
    const Datas = {
        CompetitionID : CompetitionID,
        CompetitionType: CompetitionType,
        CompetitionTypeName: CompetitionTypeName,
        CompetitionTypeKey: CompetitionType+'_'+CompetitionID,
        CompetitionTotalReward: CompetitionTotalReward
    }
    const SqlUpdate = 'INSERT INTO CompetitionDetailTable (CompetitionID,CompetitionType,CompetitionTypeKey,CompetitionTypeName,CompetitionTotalReward) VALUE ('+Datas.CompetitionID+',"'+Datas.CompetitionType+'","'+Datas.CompetitionTypeKey+'","'+Datas.CompetitionTypeName+'",'+Datas.CompetitionTotalReward+') ON DUPLICATE KEY UPDATE CompetitionTypeName="'+CompetitionTypeName+'", CompetitionTotalReward='+parseInt(CompetitionTotalReward)
    pool.query(SqlUpdate,Datas,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
        }
    })
})

const UpdateCompetitionRewardPrice = (CompetitionID,RewardType,RewardPrice) => new Promise((resolve,reject) => {
    const Datas = {
        CompetitionID : CompetitionID,
        CompetitionRewardType: RewardType,
        CompetitionRewardTypeKey: RewardType+'_'+CompetitionID,
        CompetitionRewardPrice: RewardPrice
    }
    const SqlInsert = 'INSERT INTO CompetitionReward (CompetitionID,CompetitionRewardType,CompetitionRewardTypeKey,CompetitionRewardPrice) VALUE ('+Datas.CompetitionID+',"'+Datas.CompetitionRewardType+'","'+Datas.CompetitionRewardTypeKey+'","'+Datas.CompetitionRewardPrice+'") ON DUPLICATE KEY UPDATE CompetitionRewardPrice='+Datas.CompetitionRewardPrice
    pool.query(SqlInsert,Datas,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
        }
    })
})

const DeleteCompetition = (CompetitionID) => new Promise((resolve,reject) => {
    const Sql = 'DELETE FROM `competitiontable`,`competitiondetailtable`,`competitionreward` WHERE (`CompetitionID`='+CompetitionID+');'
    pool.query(SqlInsert,Datas,(error,result) => {
        if(error){
            return reject(error)
        }else{
            return resolve(result)
        }
    })
})

const TruncateTable = () => new Promise((resolve,reject) => {
    const column = []

    let sql = ""
    return resolve
}) 
module.exports = {TestDBConn,InsertData,SelectData,SelectCompetitionData,
                    Login,SelectCompetitionID,InsertCompetitionData, 
                    InsertCompetitionRewardPrice, UpdateCompetition,
                    UpdateCompetitionData, UpdateCompetitionRewardPrice,
                    DeleteCompetition};