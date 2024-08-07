import express from 'express'
import AuthMiddleware from '../middelware/Auth.js'
import {Addnotes,Editnotes,Getnotes,Removenotes,IsPinned} from "../Controllers/Addnotes.js"


const AddnotesRoutes = express.Router()


AddnotesRoutes.post("/addnotes",AuthMiddleware,Addnotes)
AddnotesRoutes.put("/editnotes/:noteId",AuthMiddleware,Editnotes)
AddnotesRoutes.get("/getnotes",AuthMiddleware,Getnotes)
AddnotesRoutes.delete("/removenotes/:noteId",AuthMiddleware,Removenotes)
AddnotesRoutes.put("/ispinned/:noteId",AuthMiddleware,IsPinned)

export default AddnotesRoutes;