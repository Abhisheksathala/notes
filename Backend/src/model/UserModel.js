import mongoose from "mongoose";

const User = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const UserModel = mongoose.model('user',User)



export default UserModel