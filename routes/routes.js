import express from "express";
import { getNote, getNotes, saveNote, editNote, deleteNote } from "../controller/controller.js";
import { userSignup, userLogin } from "../controller/userController.js";
import { loggedInUserOnly } from "../middleware/auth.js";

const route = express.Router()

route.get('/all', loggedInUserOnly,  getNotes)
route.post('/add', loggedInUserOnly, saveNote)
route.get('/:id', loggedInUserOnly, getNote)
route.put('/:id', loggedInUserOnly, editNote)
route.delete('/delete/:id', loggedInUserOnly, deleteNote)


route.post('/login', userLogin)
route.post('/signup', userSignup)

export default route;