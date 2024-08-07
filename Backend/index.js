
import express from 'express'
import cors from 'cors'
import connectDB from './src/DB/indexDB.js'
import { config } from 'dotenv';
import userRouter from './src/Routes/UserRoute.js';
import AddnotesRoutes from './src/Routes/AddnoteRoutes.js';



config();



const app = express();
const PORT = 4000;

app.use(cors({
    origin:"*"
}))
app.use(express.json());

// routes


app.use("/api/user",userRouter)
app.use('/api/notes',AddnotesRoutes)







connectDB().then(()=>{
    app.get('/', (req, res) => {
        res.send('helllo world')
    });
    app.listen(PORT,(req,res)=>{
        console.log(`server is running on port ${PORT}`)
    });
}).catch((error)=>{
    console.log(error)
    process.exit(1)
})



