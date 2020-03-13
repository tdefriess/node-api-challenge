import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/projects')
  //     .then(projects => {
  //       console.log('call successful?')
  //       setProjects(projects)
  //       console.log(projects)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }, [])

  const handleClick = e => {
    e.preventDefault();    
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Get Projects</button>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
