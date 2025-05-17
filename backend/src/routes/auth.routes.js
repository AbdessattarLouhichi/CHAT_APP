import express from "express";
import passport from "passport";
import {signup,login,logout,forgotPassword,resetPassword} from "../controllers/auth.Controller.js";


const router = express.Router();
router.post('/signup', signup);
router.post('/login',login);
router.get('/logout',passport.authenticate('bearer', {session : false}),logout);
router.post('/forgotPassword',forgotPassword);
router.post('/resetPassword/:token',resetPassword);

export default router
