//Dharini Vaghela -200533763 - 23rd Feb , 2023
const mongoose = require('mongoose');
//schema is like table in Mongodb
const Schema = mongoose.Schema;

const  TaskSchema = new Schema({

    //columns Declaration
    taskId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    }
});

const Task = mongoose.model('Tasks',TaskSchema)
module.exports = Task