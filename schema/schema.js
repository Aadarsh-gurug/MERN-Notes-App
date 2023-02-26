import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: String,
    }
    })

const Note = mongoose.model('note', noteSchema)

export default Note;