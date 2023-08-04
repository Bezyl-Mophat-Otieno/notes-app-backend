const DB  = require('../dbHelpers')
const {v4} = require('uuid')

// create a new note


const createNote = async (req, res) => {

    const id = v4()
    const procedureName = 'createNote'

    const {title, content} = req.body

    try{

        if(!title || !content){
            return res.status(400).json({message: 'Please fill all the fields'})
        }
 

        await DB.execProcedure(procedureName, {id, title, content})


        res.status(201).json({message: 'Note created successfully'})

    }catch(err){
            
            res.status(500).json({message: 'Something went wrong with the server!'})

    }

}

// get all notes
const getNotes = async (req, res) => {

    try {

        const notes = await (await DB.execProcedure("getNotes")).recordsets[0]

        res.status(200).json(notes)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong with the server!'})
        
    }

}
  

// get a single note

const getNote = async (req, res) => {
    try {

        const {id} = req.params

        if(!id){
            return res.status(400).json({message: 'Please provide an id'})
        }

        const response = await (await DB.execProcedure('getNoteById', {id})).recordset

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

        if(!id){
            return res.status(400).json({message: 'Please provide an id'})
        }

        const {title, content} = req.body
        const procedureName = 'updateNoteById'

        await DB.execProcedure(procedureName, {id, title, content})
        res.status(200).json({message: 'Note updated successfully'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong with the server!'})
        
    }


}

const deleteNote = async (req, res) => {
    try {
        const {id} = req.params
        if(!id){
            res.status(400).json({message: 'Please provide the id of the note you want to delete'})
        }
        await DB.execProcedure('deleteNoteById', {id})
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