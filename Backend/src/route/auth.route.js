// api kon-kon sie hai
const express=require("express");
const router=express.Router();
const usermodel = require("../models/user.model");

const {registerController,logincontroller,usercontroler}=require("../controller/auth.controller")

router.post("/register",registerController)


router.post("/login",logincontroller)
/*
  post /register
  post /login
  get /user[protected]
  */

//  [protected]/user

router.get("/user",usercontroler)

module.exports=router;