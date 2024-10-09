const express = require('express')
const router = express.Router()

// Import controllers here
const taskController = require('../controllers/taskController') 

// Routes here
router.post('/tasks', taskController.createTask)
router.get('/tasks', taskController.showManyTasks)
router.get('/tasks/:name', taskController.showOneTask)
router.put('/tasks/:name', taskController.updateTask)
router.delete('/tasks/:name', taskController.deleteTask)

module.exports = router