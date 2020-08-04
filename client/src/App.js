import React from 'react';
import { useEffect, useState } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjects(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleGetProjects = e => {
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

  const handleClick = e => {
    e.preventDefault();
    console.log(e.target.className)
  }

  return (
    <div className="App">
      {/* <button onClick={handleGetProjects}>Get Projects</button>s */}
      <Route exact path='/'>
        <ProjectList projects={projects}/>
      </Route>
      <Route path='/projects/:id'>
        <Project />
      </Route>
    </div>
  );
}

function ProjectList (props){
  return (
    <>
    {props.projects.map(project => (
      <div key={project.id}>
        <h3><Link to={`/projects/${project.id}`} >{project.name}</Link></h3>
      </div>
    ))}
    </>
  )
}

function Project(){
  const [project, setProject] = useState({});
  const {id} = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(res => {
        console.log(res)
        setProject(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Completed: {project.completed}</p>
      {project.actions && project.actions.map(action => (
        <h4>{action.description}</h4>
      ))}
    </>
  )
}

export default App;