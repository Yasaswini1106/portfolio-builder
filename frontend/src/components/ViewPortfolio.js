import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewPortfolio() {

  const [portfolio, setPortfolio] = useState([]);

  useEffect(()=>{

    axios.get("http://localhost:5000/portfolios")
    .then(res => setPortfolio(res.data))

  },[]);

  return (

    <div>

      <h2>All Portfolios</h2>

      {portfolio.map((p,i)=>(
        <div className="card" key={i}>

          <h3>{p.name}</h3>

          <p><b>About:</b> {p.about}</p>

          <p><b>Skills:</b> {p.skills.join(", ")}</p>

          <p><b>Projects:</b> {p.projects.join(", ")}</p>

          <p><b>Contact:</b> {p.contact}</p>

        </div>
      ))}

    </div>
  );
}

export default ViewPortfolio;