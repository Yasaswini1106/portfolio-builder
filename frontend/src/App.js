import React from "react";
import "./App.css";
import {Routes,Route,Link} from "react-router-dom";
import Create from "./Create";
import Portfolios from "./Portfolios";


function Home(){
 return <h2>Welcome to Portfolio Builder</h2>;
}

function App(){

 return(

 <div className="container">

 <h1>Portfolio Builder</h1>

 <nav>
 <Link to="/">Home</Link>
 <Link to="/create">Create</Link>
 <Link to="/portfolios">Portfolios</Link>
 </nav>

 <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/create" element={<Create/>}/>
 <Route path="/portfolios" element={<Portfolios/>}/>
 </Routes>

 </div>

 );

}

export default App;