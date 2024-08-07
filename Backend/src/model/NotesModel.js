import mongoose from "mongoose";


const NotesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    tags: [String],
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type:String,
       
        required: true
    }
},{
    timestamps: true
})


const NotesModel = mongoose.model("note",NotesSchema)

export default NotesModel