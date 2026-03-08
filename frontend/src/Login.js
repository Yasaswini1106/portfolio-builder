import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(){

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();

const login = async()=>{

const res = await axios.post(
"http://localhost:5000/login",
{email,password}
);

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

};

return(

<div className="auth-container">

<div className="auth-card">

<h2>Login</h2>

<input placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>Login</button>

</div>

</div>

);

}

export default Login;