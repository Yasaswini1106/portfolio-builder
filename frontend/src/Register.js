import React,{useState} from "react";
import axios from "axios";

function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const submit=async(e)=>{
 e.preventDefault();

 await axios.post("http://localhost:5000/register",{
  email,
  password
 });

 alert("Registered successfully");
}

return(

<div className="form">

<h2>Register</h2>

<form onSubmit={submit}>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button>Register</button>

</form>

</div>

)

}

export default Register;