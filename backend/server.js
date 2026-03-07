const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const Portfolio = require("./models/Portfolio");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* Image Upload Setup */

const storage = multer.diskStorage({
 destination: function(req,file,cb){
  cb(null,"uploads/");
 },
 filename: function(req,file,cb){
  cb(null,Date.now()+"-"+file.originalname);
 }
});

const upload = multer({storage:storage});

/* CREATE PORTFOLIO */

app.post("/create", upload.single("image"), async(req,res)=>{

 const portfolio = new Portfolio({
  name:req.body.name,
  skills:req.body.skills,
  bio:req.body.bio,
  image:req.file ? req.file.filename : ""
 });

 await portfolio.save();

 res.send("Portfolio Created");

});

/* DELETE PORTFOLIO */

app.delete("/delete/:id",async(req,res)=>{

 await Portfolio.findByIdAndDelete(req.params.id);

 res.send("Portfolio Deleted");

});

app.listen(5000, ()=>{
 console.log("Server running on port 5000");
});

app.get("/portfolios", async (req,res) => {

 const data = await Portfolio.find();

 res.json(data);

});