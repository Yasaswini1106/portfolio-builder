import React,{useEffect,useState} from "react";
import axios from "axios";

function Portfolios(){

const [data,setData]=useState([]);
const [search,setSearch]=useState("");

useEffect(()=>{

 axios.get("http://localhost:5000/portfolios")
 .then(res=>{
  setData(res.data);
 })
 .catch(err=>{
  console.log(err);
 });

},[]);

const filtered = data.filter(p =>
 p.name.toLowerCase().includes(search.toLowerCase())
);

return(

<div>

<h2>All Portfolios</h2>

<input
placeholder="Search portfolio"
onChange={(e)=>setSearch(e.target.value)}
/>

{filtered.map((p)=>(
<div className="card" key={p._id}>

<img
src={"http://localhost:5000/uploads/"+p.image}
width="80"
alt="profile"
/>

<h3>{p.name}</h3>
<p>{p.skills}</p>
<p>{p.bio}</p>

<button
onClick={()=>{
axios.delete("http://localhost:5000/delete/"+p._id)
.then(()=>{
window.location.reload();
})
}}
>
Delete
</button>

</div>
))}

</div>

)

}

export default Portfolios;