import React,{useState} from "react";
import axios from "axios";

function Register(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const registerUser = async () => {

await axios.post("http://localhost:5000/register",{
email,
password
});

alert("User Registered");
window.location.href="/login";
};

return(

<div className="container mt-5">

<h2>Register</h2>

<input
type="email"
placeholder="Enter email"
className="form-control mb-3"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Enter password"
className="form-control mb-3"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="btn btn-success"
onClick={registerUser}
>
Register
</button>

</div>

);

}

export default Register;