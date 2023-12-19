const { json } = require("body-parser");
const mysql = require("mysql");
const { resolvePath } = require("react-router-dom");
const pool =  mysql.createPool({
    host:   'localhost',
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
const Login = (un,pw) => new Promise((resolve,reject) => {
    const sql = "SELECT * FROM UsersTable WHERE UserUN=?";
    pool.query(sql,[un,pw],(err,results,Fields) => {
        if(err){
            return reject(error)
        }
        if(results.length <= 0){
            return JSON.stringify({status:"error",message:"dont have this username"})
        }
    })
})
module.exports = {TestDBConn,InsertData,SelectData};