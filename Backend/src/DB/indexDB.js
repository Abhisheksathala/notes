import mongoose from "mongoose";



const connectDB = async (req,res)=>{
    try {

        const ConnectInstance = mongoose.connect(process.env.DB)
        console.log('connected to mongodb')

        if(!ConnectInstance){
            console.log('failed to connect to mongodb')
            process.exit(1)
        }
        
    } catch (error) {

        console.log('failed to connect to mongodb',error)
        process.exit(1)
        
    }
}

export default connectDB;


