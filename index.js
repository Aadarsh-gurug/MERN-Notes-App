import express from "express";
import cors from 'cors'
import route from "./routes/routes.js";
import Connection from "./database/db.js";
import path from 'path'
const __dirname = path.resolve()
const app = express()
const port = process.env.PORT || 80;
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use('/',route)
Connection()

app.use(express.static("client/build"))

app.get('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(port,()=>{console.log(`server is running on port ${port}`);})