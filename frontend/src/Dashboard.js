import React from "react";
import { Link } from "react-router-dom";

function Dashboard(){

return(

<div>

{/* NAVBAR */}

<div className="navbar">

<h2>Portfolio Builder</h2>

<div className="nav-links">

<Link to="/create">Create</Link>
<Link to="/portfolios">My Portfolios</Link>

</div>

</div>

{/* PAGE CONTENT */}

<div className="page">

<h2>Welcome to your Dashboard</h2>

<p>
Use the tabs above to create or manage your portfolios.
</p>

</div>

</div>

);

}

export default Dashboard;