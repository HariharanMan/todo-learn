const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST new todo
router.post('/', async (req, res) => {
  try {
    console.log("Raw Request Body:", req.body); // 👈 debug log

    if (!req.body || !req.body.text) {
      return res.status(400).json({ error: 'Missing `text` field in request body' });
    }

    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("POST /api/todos failed:", err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;
