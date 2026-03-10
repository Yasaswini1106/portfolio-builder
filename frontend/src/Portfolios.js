import React, { useEffect, useState } from "react";
import axios from "axios";

function Portfolios(){

const [portfolios,setPortfolios] = useState([]);

useEffect(()=>{

fetchPortfolios();

},[]);

const fetchPortfolios = async () => {

const res = await axios.get("http://localhost:5000/portfolios");

setPortfolios(res.data);

};

const deletePortfolio = async(id)=>{

await axios.delete(`http://localhost:5000/delete/${id}`);

fetchPortfolios();

};

return(

<div className="container mt-4">

<h2 className="text-center mb-4">My Portfolios</h2>

<div className="row">

{portfolios.map((portfolio)=> (

<div className="col-md-4 mb-4" key={portfolio._id}>

<div className="card shadow p-3">

<img
src={`http://localhost:5000/uploads/${portfolio.image}`}
className="card-img-top"
alt="portfolio"
/>

<div className="card-body">

<h3 className="card-title">
{portfolio.name}
</h3>

<p className="card-text">
<strong>Skills:</strong> {portfolio.skills}
</p>

<p className="card-text">
{portfolio.bio}
</p>

<button
className="btn btn-danger"
onClick={()=>deletePortfolio(portfolio._id)}
>

Delete

</button>

</div>

</div>

</div>

))}

</div>

</div>

);

}

export default Portfolios;