const mssql = require('mssql')
const DB = require ('../dbHelpers')
const {createNote} = require ('./notesControllers')


jest.mock('../dbHelpers')

describe ('Create Note Test' , ()=>{
    it('should create a new note successfully when all the required fields are provided', async ()=>{

        const req = {
            body:{
                title: 'test title',
                content: 'test content'
            } 
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        DB.execProcedure.mockResolvedValueOnce({rowsAffected: [1]})
        await createNote (req , res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({message: 'Note created successfully'})
    })

    it('should return a 400 error when the title or content is not provided', async ()=>{
        req = {
            body:{}
        }

        res= {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await createNote (req , res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({message: 'Please fill all the fields'})





    })

})