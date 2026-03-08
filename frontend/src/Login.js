import React,{useState} from "react";
import axios from "axios";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const submit=async(e)=>{

 e.preventDefault();

 const res = await axios.post("http://localhost:5000/login",{
  email,
  password
 });

 alert(res.data.message);

}

return(

<div className="form">

<h2>Login</h2>

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

<button>Login</button>

</form>

</div>

)

}

export default Login;