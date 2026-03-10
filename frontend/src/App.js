import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {FaUser, FaPlus, FaFolder} from "react-icons/fa";
import Create from "./Create";
import Portfolios from "./Portfolios";
import Login from "./Login";
import Register from "./Register";

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

      <div className="nav-links">

<Link to="/">Dashboard</Link>
<Link to="/create">Create</Link>
<Link to="/portfolios">Portfolios</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>

</div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

<Route path="/" element={<Dashboard/>}/>
<Route path="/create" element={<Create/>}/>
<Route path="/portfolios" element={<Portfolios/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

</Routes>

    </BrowserRouter>
  );
}

export default App;