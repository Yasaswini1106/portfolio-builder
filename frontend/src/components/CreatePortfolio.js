import React, { useState } from "react";
import axios from "axios";

function CreatePortfolio() {

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [contact, setContact] = useState("");

  const createPortfolio = async () => {

    const data = {
      name,
      about,
      skills: skills.split(","),
      projects: projects.split(","),
      contact
    };

    const res = await axios.post("http://localhost:5000/create", data);

    alert(res.data);
  };

  return (

    <div className="form">

      <h2>Create Your Portfolio</h2>

      <input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      />

      <textarea
        placeholder="About Me"
        onChange={(e)=>setAbout(e.target.value)}
      />

      <input
        placeholder="Skills (comma separated)"
        onChange={(e)=>setSkills(e.target.value)}
      />

      <input
        placeholder="Projects"
        onChange={(e)=>setProjects(e.target.value)}
      />

      <input
        placeholder="Contact Email"
        onChange={(e)=>setContact(e.target.value)}
      />

      <button onClick={createPortfolio}>
        Create Portfolio
      </button>

    </div>
  );
}

export default CreatePortfolio;