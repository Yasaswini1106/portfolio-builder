import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();

const register = async ()=>{

await axios.post(
"http://localhost:5000/register",
{email,password}
);

navigate("/");

};

return(

<div className="auth-card">

<h2>Register</h2>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={register}>Register</button>

</div>

);

}

export default Register;