import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import Create from "./Create";
import Portfolios from "./Portfolios";
import Login from "./Login";
import Register from "./Register";

/* HOME PAGE */

function Home(){
 return(
  <div className="card">
   <h2>Welcome to Portfolio Builder</h2>
   <p>Create and showcase your professional portfolio easily.</p>
  </div>
 );
}

/* MAIN APP */

function App(){

 return(

  <BrowserRouter>

  <div>

   <h1 className="title">Portfolio Builder</h1>

   <nav>

    <Link to="/">Home</Link>

    <Link to="/create">Create</Link>

    <Link to="/portfolios">Portfolios</Link>

    <Link to="/login">Login</Link>

    <Link to="/register">Register</Link>

   </nav>

   <div className="container">

   <Routes>

    <Route path="/" element={<Home/>}/>

    <Route path="/create" element={<Create/>}/>

    <Route path="/portfolios" element={<Portfolios/>}/>

    <Route path="/login" element={<Login/>}/>

    <Route path="/register" element={<Register/>}/>

   </Routes>

   </div>

  </div>

  </BrowserRouter>

 );

}

export default App;