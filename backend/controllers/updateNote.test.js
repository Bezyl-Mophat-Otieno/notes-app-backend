const mssql = require('mssql')
const DB = require('../dbHelpers')
const {updateNote} = require ('../controllers/notesControllers')

jest.mock('../dbHelpers')

describe('Updating a Note', () => {
    it(' should update a note successfully when the id is provided  ', async () => {
        const noteId = 'y3refgd78264527'
        const mockNote = {
            title: 'updated title',    
            content: 'test content'
        }
        
        const procedureName = 'updateNote'
        const req = {
            params: {
                id: noteId
            },
            body:mockNote
        }
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

     DB.execProcedure.mockResolvedValueOnce({
            rowsAffected: [1]
     })

    await DB.execProcedure(procedureName, {...mockNote,noteId})
    await updateNote(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message: 'Note updated successfully'})

    
});

it('should return a 400 error when the id is not provided', async () => {
    const req = {
        params: {}
    }

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    DB.execProcedure.mockResolvedValueOnce({
        rowsAffected: [0]
    })
  
    

    await updateNote (req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({message: 'Please provide an id'})
    
})

});
