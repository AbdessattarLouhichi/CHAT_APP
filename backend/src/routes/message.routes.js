import express from "express";
import passport from "passport";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";


const router = express.Router();

router.get("/users", passport.authenticate('bearer', {session : false}), getUsersForSidebar);
router.get("/messages/:id", passport.authenticate('bearer', {session : false}), getMessages);

router.post("/send/:id", passport.authenticate('bearer', {session : false}), sendMessage);

export default router;