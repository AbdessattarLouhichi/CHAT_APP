import mongoose from "mongoose";
import { uri } from "./config.js";


export default {connect(){
    mongoose.set('strictQuery', true);
    mongoose.connect(uri)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
}}