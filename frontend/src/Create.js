import React, { useState } from "react";
import axios from "axios";

function Create(){

const [name,setName] = useState("");
const [skills,setSkills] = useState("");
const [bio,setBio] = useState("");
const [image,setImage] = useState(null);

const createPortfolio = async () => {

try{

const formData = new FormData();

formData.append("name",name);
formData.append("skills",skills);
formData.append("bio",bio);
formData.append("image",image);

await axios.post(
"http://localhost:5000/create",
formData
);

alert("Portfolio Created Successfully");

}
catch(err){

console.log(err);
alert("Error creating portfolio");

}

};

return(

<div className="page">

<h2>Create Portfolio</h2>

<div className="form">

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Skills"
value={skills}
onChange={(e)=>setSkills(e.target.value)}
/>

<textarea
placeholder="Bio"
value={bio}
onChange={(e)=>setBio(e.target.value)}
/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
/>

<button onClick={createPortfolio}>
Create Portfolio
</button>

</div>

</div>

)

}

export default Create;