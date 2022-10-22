const expresss = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authRouter = expresss.Router();
 authRouter.post("/api/singup", async (req, res) =>{
    // get the data form client
    try{
   const {name, email, password} = req.body;
    //post that data in database
    const existingUser = await User.findOne({
      email});
      if(existingUser){
         return res.status(400).json({msg: "User already exists"});

      };

     const hashedPassword = await bcryptjs.hash(password,8);

      let user = new User({
         email, password: hashedPassword, name
      });
      user = await user.save();
      res.json(user);
    //return that data to the user
    }catch(e){
      res.status(500).json({error: e.message});
    }
 });

 //signin route
 //Exercise
 authRouter.post("/api/signin", async (req,res)=>{
   try{
      const {name, email, password} = req.body;
      const user = await User.findOne({email});
      if(!user){
         return res.status(400).json({msg: "user with this email  does not exists!"});
      }
      const isMatch = await bcryptjs.compare(password,user.password);
      if(!isMatch){
         return res.status(400).json({msg: "Incorrect Password.!"});
      }
      const token = jwt.sign({id:user._id}, "passwordKey");
      res.json({token, ...user._doc});
   }catch(e){
      res.status(500).json({error: e.message}); 
     }
 });

 module.exports = authRouter;