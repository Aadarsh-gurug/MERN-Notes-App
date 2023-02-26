import NoteUser from "../schema/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userSignup = async (request, response) => {
    try {
        const { name, email, password } = request.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await NoteUser({ name, email, password: hashedPassword })
        await data.save()
        response.status(200).json({ message: 'user registered successfully' })
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}

export const userLogin = async (request, response) => {
    try {
        const { email, password } = request.body
        const user = await NoteUser.findOne({ email })
        if (!user) {
            return response.status(401).json({ message: 'invalid user details' })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return response.status(401).json({ message: 'invalid user details' })
        }
        const id = user._id
        const token = jwt.sign({ id }, process.env.SECRET)

        response.status(201).json({ message: 'user loged in successfully', token, user })
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error.message })
    }
}