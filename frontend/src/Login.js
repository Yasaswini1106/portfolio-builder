import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {

    try {

      const res = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password
      });

      alert(res.data.message || "Login successful");

      localStorage.setItem("token", res.data.token);

      window.location.href = "/dashboard";

    } catch (err) {

      alert("Login failed");

    }

  };

  return (

    <div className="container mt-5">

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        className="form-control mb-3"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        className="form-control mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={loginUser}
      >
        Login
      </button>

    </div>

  );

}

export default Login;