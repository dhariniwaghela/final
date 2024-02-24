//Dharini Vaghela -200533763 - 23rd Feb , 2023
const Task = require('../models/task');

// Controller actions
exports.getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(200).json(newTask);
    } catch (err) {
        console.error(err); // Log any errors
        res.status(400).json({ message: err.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTaskStatusbyId = async (req, res) => {
    const taskId = req.params.taskId;
    const newStatus = req.body.status;

    try {
        // Find the task by ID
        const task = await Task.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task status
        task.status = newStatus;

        // Save the updated task
        await task.save();

        // Send a success response
        res.json({ message: 'Task status updated successfully', task });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.assignTasktoUser = async (req, res) => {
    const taskId = req.params.taskId;
    const newUser = req.body.assignedTo;

    try {
        // Find the task by ID
        const task = await Task.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the task status
        task.assignedTo = newUser;

        // Save the updated task
        await task.save();

        // Send a success response
        res.json({ message: 'Task Assigned to New User successfully', task });
    } catch (error) {
        console.error('Error updating task Assigning:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        // Query all tasks
        const tasks = await Task.find();

        // Extract unique values of "assignedTo"
        const assignedToList = [...new Set(tasks.map(task => task.assignedTo))];

        // Send the unique values in the response
        res.json({ assignedTo: assignedToList });
    } catch (error) {
        console.error('Error fetching assignedTo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTasksGroupedByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        // Query tasks with the specified status
        const tasks = await Task.find({ status });

        // Group tasks by status
        const tasksGroupedByStatus = tasks.reduce((groupedTasks, task) => {
            // Initialize array for status if not exists
            if (!groupedTasks[task.status]) {
                groupedTasks[task.status] = [];
            }
            // Add task to array for corresponding status
            groupedTasks[task.status].push(task);
            return groupedTasks;
        }, {});

        // Send tasks grouped by status in the response
        res.json({ tasksGroupedByStatus });
    } catch (error) {
        console.error('Error fetching tasks grouped by status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getTaskDetailsById = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Query task by taskId
        const task = await Task.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Send task details in the response
        res.json({ task });
    } catch (error) {
        console.error('Error fetching task details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};