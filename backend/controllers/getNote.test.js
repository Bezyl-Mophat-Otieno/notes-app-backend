const mssql = require('mssql');
const {getNote} = require ('./notesControllers')
const DB = require('../dbHelpers')

jest.mock('../dbHelpers')
describe('Getting A single Note ', () => {
    it('should return a single note when the id is provided', async () => {
        const noteId = '  y3refgd78264527'
        const mockNote = {
            id: noteId,
            title: 'test title',
            content: 'test content'
            
        }
        const req = {
            params:{
                id: noteId
            }
        }


        const res = {
            status: jest.fn().mockReturnThis(), 
            json: jest.fn()
        }

      
        DB.execProcedure.mockResolvedValueOnce({
            recordset: [mockNote]
        })
        await getNote (req , res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({response: [mockNote]})

    }) 
    
    it('should return a 400 error when the id is not provided', async () => {
        const req = {
            params:{}
        }

        const res = {
            status: jest.fn().mockReturnThis(), 
            json: jest.fn()
        }
   
        DB.execProcedure.mockResolvedValueOnce({
            recordset: []
        })
      

        await getNote (req , res)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({message: 'Please provide an id'})

    })
});
