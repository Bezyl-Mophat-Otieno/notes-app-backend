const {Router} = require('express');
const {createNote , getNotes ,getNote , deleteNote , updateNote} = require('../controllers/notesControllers');

const notesRouter = Router();

notesRouter.post('/',createNote)
notesRouter.get('/',getNotes)
notesRouter.get('/:id',getNote)
notesRouter.put('/:id',updateNote)
notesRouter.delete('/:id',deleteNote)



module.exports = {notesRouter};