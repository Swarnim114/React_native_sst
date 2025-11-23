import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/dbConfig.js';
import authRoutes from './routes/auth.routes.js';


dotenv.config()
connectDB()
const app = express()

app.use(cors())
app.use(express.json())





app.use('/api/auth/', authRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(3000, () => {
  console.log("server Started")
})