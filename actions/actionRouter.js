const express = require('express');

const Action = require('../data/helpers/actionModel.js');
const Project = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was a problem retrieving actions"
            })
        })
})

router.post('/', validateAction, validateProjectId, (req, res) => {
    let newAction = {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed
    }
    Action.insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error adding action"
            })
        })
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.action);
})

router.put('/:id', validateId, validateAction, (req, res) => {
    let updatedAction = {
        project_id: req.body.project_id,
        description: req.body.description,
        notes: req.body.notes,
        completed: req.body.completed
    }
    Action.update(req.action.id, updatedAction)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error updating the action"
            })
        })
})

router.delete('/:id', validateId, (req, res) => {
    Action.remove(req.action.id)
        .then(count => {
            res.status(200).json({
                message: `${count} record deleted`
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error deleting action"
            })
        })
})

function validateId(req, res, next){
    const { id } = req.params;
    console.log('Validating action id...');
    Action.get(id)
        .then(action => {
            if (action){
                req.action = action;
                next()
            } else {
                res.status(400).json({
                    message: "No action with that message exists"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "There was an error fetching action data"
            })
        })
}

function validateAction(req, res, next){
    console.log('Validating action...');
    if (!req.body){
        res.status(400).json({
            message: "Missing action data"
        })
    } else if (!req.body.project_id){
        res.status(400).json({
            message: "Missing required project_id field"
        })
    } else if (!req.body.description){
        res.status(400).json({
            message: "Missing required description field"
        })
    } else if (req.body.description.length > 128){
        res.status(400).json({
            message: "Description must be 128 characters or less"
        })
    } else if (!req.body.notes){
        res.status(400).json({
            message: "Missing required notes field"
        })
    } else {
        next();
    }
}

function validateProjectId(req, res, next){
    Project.get(req.body.project_id)
        .then(project => {
            if (project){
                next();
            } else {
                res.status(400).json({
                    message: "project_id does not match any project in the database"
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

module.exports = router;