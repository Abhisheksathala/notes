import express from "express";
import { registerUser, loginUser,getUserProfile} from "../Controllers/UserController.js";
import AuthMiddleware from "../middelware/Auth.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/getprofile",AuthMiddleware, getUserProfile);

export default userRouter;
