module.exports = {
    getAll(){
        return new Promise((resolve, reject) => {
            connection.query("select * from UsersTable", (err, result) => {
                if(err){
                    // The equivalent of throwing the error
                    reject(err);
                } else {
                    // The equivalent of returning a value for getAll
                    resolve(result);
                }
            })
        });
    }

}