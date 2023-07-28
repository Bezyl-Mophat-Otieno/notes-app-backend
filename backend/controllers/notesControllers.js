const DB  = require('../dbHelpers')
const {v4} = require('uuid')

// create a new note


const createNote = async (req, res) => {

    const id = v4()

    const {title, content} = req.body

    try{

        await DB.execProcedure('newNote', {id, title, content})

        res.status(201).json({message: 'Note created successfully'})

    }catch(err){
            
            res.status(500).json({message: 'Something went wrong with the server!'})

    }

}

// get all notes
const getNotes = async (req, res) => {

    try {

        const notes = await DB.execProcedure("getNotes").recordset

        res.status(200).json({notes})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong with the server!'})
        
    }

}
  

// get a single note

const getNote = async (req, res) => {
    try {

        const {id} = req.params

        const response = await DB.execProcedure('getNoteById', {id}).recordset[0]

        res.status(200).json({response})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong with the server!'})

        
    }
}

// update a note
const updateNote = async (req, res) => {
    try {
        const {id} = req.params

        const {title, content} = req.body

        await DB.execProcedure('updateNote', {id, title, content})
        res,status(200).json({message: 'Note updated successfully'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong with the server!'})
        
    }


}

const deleteNote = async (req, res) => {
    try {
        const {id} = req.params
        await DB.execProcedure('deleteNote', {id})
        res.status(200).json({message: 'Note deleted successfully'})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
}





module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote

}