import express from "express"
import {join} from 'path'
import web from "./routes/web.js"
import connectDB from "./Database/connectdb.js";
import cookieParser from "cookie-parser";

const app = express()
const port = process.env.PORT || '4000'

const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/Candidatedb"


app.use(cookieParser());


// Middleware use in createDoc:
app.use(express.urlencoded({ extended: true }))

// Template Engine:
app.set('view engine', 'ejs')

// Static Files:
app.use('/',express.static(join(process.cwd(), "Public")))
app.use('/edit',express.static(join(process.cwd(), "Public")))

// Router Path:
app.use('/', web)

// Database Connection:
connectDB(DATABASE_URL);

app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})
