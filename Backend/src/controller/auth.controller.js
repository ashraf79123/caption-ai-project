// ye file batati hai api ke andar kya hogi aur kaise hoga uske kaam me ayengi

const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const cookieParser=require("cookie-parser");
const userModel = require("../models/user.model");
async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie('token', token, {
  httpOnly: true,
  secure: true,           // ✅ Important on HTTPS
  sameSite: 'None'        // ✅ Allow cross-site cookies
});

    return res.status(200).json({
      message: "User created successfully",
      user
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      message: "Something went wrong during registration"
    });
  }
}

async function logincontroller(req,res){
    const {username,password}=req.body;
   
     const user= await userModel.findOne({
       username
     })
     if(!user){
       return res.status(404).json({
         message:"user is not not"
       })
     }
     const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
     return res.status(401).json({
       message:"password is  wrong"
     })
    }
    const token=jwt.sign({
     id:user._id
    },process.env.JWT_SECRET);
   
    res.cookie("token",token)
    res.status(200).json({
     message:"login successful",
     user
    })
}
 function usercontroler(req,res){
  const {token}=req.cookies.token;

  if(!token){
    return res.status(401).json({
      message:"unauthorized user"
    })
  }
  try{

    const decode=jwt.verify(token.process.env.JWT_SECRET);
  }catch(err){
 console.log(err)
  }

}

module.exports={
  registerController,
  logincontroller,
  usercontroler
}