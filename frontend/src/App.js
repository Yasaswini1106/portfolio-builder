import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {FaUser, FaPlus, FaFolder} from "react-icons/fa";
import Create from "./Create";
import Portfolios from "./Portfolios";
import Login from "./Login";
import Register from "./Register";

const isLoggedIn = () => {
return localStorage.getItem("token") !== null;
};

function Dashboard() {
  return (
    <div className="page">
      <h2>Welcome to Portfolio Builder</h2>
      <p>
        Create your professional portfolio and manage all your work in one
        place.
      </p>
    </div>
  );
}

function Navbar() {
  return (
    <div className="navbar">

      <div className="logo">
        Portfolio Builder
      </div>

      <button
onClick={()=>{
localStorage.removeItem("token");
window.location.href="/login";
}}
>
Logout
</button>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route
path="/dashboard"
element={isLoggedIn() ? <Dashboard/> : <Login/>}
/>

<Route
path="/create"
element={isLoggedIn() ? <Create/> : <Login/>}
/>

<Route
path="/portfolios"
element={isLoggedIn() ? <Portfolios/> : <Login/>}
/>

</Routes>

    </BrowserRouter>
  );
}

export default App;