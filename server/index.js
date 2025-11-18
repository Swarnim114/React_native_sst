import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/dbConfig.js'
import authRoutes from './routes/auth.routes.js'


dotenv.config()
connectDB()




const app = express()

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth/' , authRoutes)



app.listen(3000 , ()=>{
    console.log("server Started")
})