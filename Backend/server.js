require('dotenv').config();
const app=require("./src/app");
const connectDB=require("./src/db/db")



connectDB()
// server.js



app.listen(3000,(req,res)=>{
  console.log("server is running 3000")
})