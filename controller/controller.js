import Note from "../schema/schema.js";


export const getNotes = async (request, response) => {
    try {
        const data = await Note.find({ createdBy: request.user.id })
        response.status(200).json(data)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const saveNote = async (request, response) => {
    try {
        const data = await Note({
            title: request.body.title,
            description: request.body.description,
            createdBy: request.user.id
        })
        await data.save()
        response.status(201).json(data)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const getNote = async (request, response) => {
    try {
        const data = await Note.findById(request.params.id)
        response.status(200).json(data)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const editNote = async (request, response) => {
    try {
        const data = await Note(request.body)
        await Note.findByIdAndUpdate(request.params.id, data)
        response.status(201).json(data)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

export const deleteNote = async (request, response) => {
    try {
        await Note.findByIdAndDelete(request.params.id)
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}