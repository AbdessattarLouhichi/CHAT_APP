import express from "express";
import passport from "passport";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.Controller.js";

const router = express.Router();

router.get('/users',passport.authenticate('bearer', {session : false}), getAllUsers);
router.get('/user/:id',passport.authenticate('bearer', {session : false}), getUser);
router.put('/update-user/:id',passport.authenticate('bearer', {session : false}), updateUser);
router.delete('/delete-user/:id',passport.authenticate('bearer', {session : false}), deleteUser)

export default router