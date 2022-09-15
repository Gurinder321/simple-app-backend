const Task = require('../models/taskModel');

// @desc Get tasks
// @route GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
};

// @desc Set tasks
// @route POST /api/tasks
// @access Private
const setTask = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const task = await Task.create({
    text: req.body.text,
  });
  res.status(200).json(task);
};

// @desc Update task
// @route PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
};

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task not found');
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
