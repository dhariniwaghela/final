//Dharini Vaghela -200533763 - 23rd Feb , 2023
const express = require('express');

const router = express.Router()

const Model = require('../models/task.js')

const cors = require('cors');

const controller = require('../controller/controller');


// Routes or Endpoints of Api 
router.get('/tasks',cors(), controller.getAllTask);
router.post('/createtask', cors() ,controller.createTask);
router.put('/updatetaskstatus/:id', cors(),controller.updateTaskStatus);
router.put('/updateTaskStatuswithid/:taskId',cors(), controller.updateTaskStatusbyId);
router.put('/assignTasktoUserwithid/:taskId', cors(),controller.assignTasktoUser);

router.get('/users',cors(), controller.getAllUser);
router.get('/status/:status',cors(), controller.getTasksGroupedByStatus);
router.get('/task/:taskId',cors(), controller.getTaskDetailsById);

module.exports = router;