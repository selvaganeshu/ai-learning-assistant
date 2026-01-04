console.log("CWD:", process.cwd());

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

console.log("JWT_SECRET:", process.env.JWT_SECRET);

import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})