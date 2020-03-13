const express = require('express');

const Project = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was a problem retrieving projects"
            })
        })
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res) => {
    let newProject = {
        name: req.body.name,
        description: req.body.description
    }
    Project.insert(newProject)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "Could not add project to database"
            })
        })
})

function validateId(req, res, next) {
    const { id } = req.params;
    console.log('Validating id..');
    Project.get(id)
        .then(project => {
            if (project) {
                req.project = project;
                next()
            } else {
                res.status(400).json({
                    message: "No project with that ID exists"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error fetching project data"
            })
        })
}

function validateProject(req, res, next) {
    console.log('Validating project...');
    if (!req.body){
        res.status(400).json({
            message: "Missing project data"
        });
    } else if (!req.body.name){
        res.status(400).json({
            message: "Missing required name field"
        });
    } else if (!req.body.description){
        res.status(400).json({
            message: "Missing required description field"
        });
    } else {
        next();
    }
}

module.exports = router;