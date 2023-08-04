const mssql = require('mssql')
const DB = require('../dbHelpers')
const {sqlConfig} = require('../../config/dbConfig')
const procedureName = 'gdyguedyuwe'
const data = {}
const result = {}

describe('Testing dbhelper', () => {

    it('Tests the class', () => {
        
        jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                   request: jest.fn().mockReturnThis(),
                   input: jest.fn().mockReturnThis(),
                   execute: jest.fn().mockResolvedValueOnce(data)
               })
        
        
        DB.executeProcedure.mockResolvedValueOnce({
            
        })
    });
    
    
});
