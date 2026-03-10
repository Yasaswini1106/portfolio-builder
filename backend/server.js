const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
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
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* IMAGE UPLOAD SETUP */

const storage = multer.diskStorage({
 destination: function(req,file,cb){
  cb(null,"uploads/");
 },
 filename: function(req,file,cb){
  cb(null,Date.now() + "-" + file.originalname);
 }
});

const upload = multer({ storage });

/* REGISTER USER */

app.post("/register", async (req,res)=>{

 try{

 const {email,password} = req.body;

 if(!email || !password){
  return res.status(400).json({message:"Email and password required"});
 }

 const existingUser = await User.findOne({email});

 if(existingUser){
  return res.status(400).json({message:"User already exists"});
 }

 const hashedPassword = await bcrypt.hash(password,10);

 const user = new User({
  email,
  password:hashedPassword
 });

 await user.save();

 res.json({message:"User Registered Successfully"});

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

});

/* LOGIN USER */

app.post("/login", async (req,res)=>{

 try{

 const {email,password} = req.body;

 const user = await User.findOne({email});

 if(!user){
  return res.status(404).json({message:"User not found"});
 }

 const validPassword = await bcrypt.compare(password,user.password);

 if(!validPassword){
  return res.status(401).json({message:"Wrong password"});
 }

 const token = jwt.sign(
  {id:user._id},
  "secretkey",
  {expiresIn:"1d"}
 );

 res.json({
  message:"Login successful",
  token
 });

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

});

/* CREATE PORTFOLIO */

app.post("/create", upload.single("image"), async(req,res)=>{

 try{

 const {name,skills,bio} = req.body;

 const portfolio = new Portfolio({
  name,
  skills,
  bio,
  image: req.file ? req.file.filename : ""
 });

 await portfolio.save();

 res.json({
  message:"Portfolio Created Successfully",
  portfolio
 });

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

});

/* GET ALL PORTFOLIOS */

app.get("/portfolios", async (req,res)=>{

 try{

 const portfolios = await Portfolio.find();

 res.json(portfolios);

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

});

/* DELETE PORTFOLIO */

app.delete("/delete/:id", async(req,res)=>{

 try{

 await Portfolio.findByIdAndDelete(req.params.id);

 res.json({message:"Portfolio Deleted"});

 }
 catch(err){
  res.status(500).json({error:err.message});
 }

});

/* SERVER START */

const PORT = 5000;

app.listen(PORT, ()=>{
 console.log(`Server running on port ${PORT}`);
});

const {OAuth2Client} = require("google-auth-library");

const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

app.post("/google-login", async (req,res)=>{

const {token} = req.body;

const ticket = await client.verifyIdToken({
idToken:token,
audience:"YOUR_GOOGLE_CLIENT_ID"
});

const payload = ticket.getPayload();

const email = payload.email;

let user = await User.findOne({email});

if(!user){
 user = new User({email});
 await user.save();
}

const jwtToken = jwt.sign({id:user._id},"secretkey");

res.json({token:jwtToken});

});

const PDFDocument = require("pdfkit");

app.get("/download/:id", async(req,res)=>{

const portfolio = await Portfolio.findById(req.params.id);

const doc = new PDFDocument();

res.setHeader("Content-Type","application/pdf");

doc.pipe(res);

doc.fontSize(25).text(portfolio.name);

doc.moveDown();
doc.fontSize(18).text("Skills: "+portfolio.skills);

doc.moveDown();
doc.text("Bio: "+portfolio.bio);

doc.end();

});

app.get("/search", async (req,res)=>{

const query = req.query.q;

const results = await Portfolio.find({
name:{$regex:query,$options:"i"}
});

res.json(results);

});