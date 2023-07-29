const mssql = require('mssql')
const {sqlConfig} = require('../../config/dbConfig')

// a sigleton class to handle a connection and the execution of queries 
class DB {
   static async execProcedure(procedureName , data={}){

       const pool = await mssql.connect(sqlConfig)
       const request = await pool.request()

       for (let key in data){
           request.input(key, data[key])
       }
       const result = await request.execute(procedureName)

        return result
   }
}

module.exports = DB