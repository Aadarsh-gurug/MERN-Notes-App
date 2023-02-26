import jwt from 'jsonwebtoken'

export const loggedInUserOnly = async (request, response, next) => {
    const token = await request.headers.authorization
    if (!token) return response.status(401).json({ message: 'please login' })
    try {
        const id = jwt.verify(token, process.env.SECRET)
        request.user = id
        next()
    } catch (error) {
        response.status(401).json({ message: error.message })
    }
}

