import React,{useState} from "react";
import axios from "axios";

function Create(){

const [name,setName]=useState("");
const [skills,setSkills]=useState("");
const [bio,setBio]=useState("");
const [image,setImage]=useState(null);

const submit=async(e)=>{

e.preventDefault();

const formData = new FormData();

formData.append("name",name);
formData.append("skills",skills);
formData.append("bio",bio);
formData.append("image",image);

await axios.post("http://localhost:5000/create",formData);

alert("Portfolio Created");

}

return(

<form onSubmit={submit}>

<h2>Create Portfolio</h2>

<input placeholder="Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/>

<input placeholder="Skills"
onChange={(e)=>setSkills(e.target.value)}
/>

<br/>

<input placeholder="Bio"
onChange={(e)=>setBio(e.target.value)}
/>

<br/>

<input type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<br/>

<button>Create</button>

</form>

)

}

export default Create;