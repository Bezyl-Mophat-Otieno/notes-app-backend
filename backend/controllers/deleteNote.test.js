const {deleteNote} = require("./notesControllers"); 
const mssql = require('mssql')
const DB = require('../dbHelpers')

jest.mock('../dbHelpers')
describe('Deleting a Note', () => {
it('should delete a note successfully when the id is provided', async () => {
const noteId = 'y3refgd78264527'
const req = {
    params: {
        id: noteId  
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

DB.execProcedure.mockResolvedValueOnce({rowsAffected: [1]})

await deleteNote (req, res)

expect(res.status).toHaveBeenCalledWith(200)
expect(res.json).toHaveBeenCalledWith({message: 'Note deleted successfully'})

})

it('should return a 400 error when the id is not provided', async () => {
const req = {
    params: {}
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
    request: jest.fn().mockReturnThis(),
    input: jest.fn().mockReturnThis(),
    execute: jest.fn().mockResolvedValueOnce({
        rowsAffected:[0]
    })
})

await deleteNote (req, res)

expect(res.status).toHaveBeenCalledWith(400)
expect(res.json).toHaveBeenCalledWith({message: 'Please provide the id of the note you want to delete'})


})


})