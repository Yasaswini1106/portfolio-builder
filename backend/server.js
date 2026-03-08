const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Portfolio = require("./models/Portfolio");
const User = require("./models/User");

const app = express();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* DATABASE CONNECTION */

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* IMAGE UPLOAD SETUP */

const storage = multer.diskStorage({
 destination: function(req,file,cb){
  cb(null,"uploads/");
 },
 filename: function(req,file,cb){
  cb(null,Date.now()+"-"+file.originalname);
 }
});

const upload = multer({storage:storage});

/* REGISTER USER */

app.post("/register", async (req,res)=>{

 try{

 const {email,password} = req.body;

 const existingUser = await User.findOne({email});

 if(existingUser){
  return res.send("User already exists");
 }

 const hashedPassword = await bcrypt.hash(password,10);

 const user = new User({
  email,
  password:hashedPassword
 });

 await user.save();

 res.send("User Registered Successfully");

 }
 catch(err){
  res.status(500).send(err);
 }

});

/* LOGIN USER */

app.post("/login", async (req,res)=>{

 try{

 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user){
  return res.send("User not found");
 }

 const valid = await bcrypt.compare(password,user.password);

 if(!valid){
  return res.send("Wrong password");
 }

 const token = jwt.sign({id:user._id},"secretkey");

 res.json({
  message:"Login successful",
  token:token
 });

 }
 catch(err){
  res.status(500).send(err);
 }

});

/* CREATE PORTFOLIO */

app.post("/create", upload.single("image"), async(req,res)=>{

 try{

 const portfolio = new Portfolio({
  name:req.body.name,
  skills:req.body.skills,
  bio:req.body.bio,
  image:req.file ? req.file.filename : ""
 });

 await portfolio.save();

 res.send("Portfolio Created");

 }
 catch(err){
  res.status(500).send(err);
 }

});

/* GET ALL PORTFOLIOS */

app.get("/portfolios", async (req,res)=>{

 try{

 const data = await Portfolio.find();

 res.json(data);

 }
 catch(err){
  res.status(500).send(err);
 }

});

/* DELETE PORTFOLIO */

app.delete("/delete/:id", async(req,res)=>{

 try{

 await Portfolio.findByIdAndDelete(req.params.id);

 res.send("Portfolio Deleted");

 }
 catch(err){
  res.status(500).send(err);
 }

});

/* START SERVER */

app.listen(5000, ()=>{
 console.log("Server running on port 5000");
});