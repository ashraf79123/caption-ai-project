const express=require("express");
const userModel=require("../models/user.model")
const router= express.Router();
const authmiddleware=require("../middleware/auth.middleware")
const moulter=require("multer");
const multer = require("multer")
const {createPostController}=require("../controller/post.controller");

const upload=multer({storage:multer.memoryStorage()})
router.post("/",
  authmiddleware,
  upload.single("image"),
  createPostController)

module.exports=router;
