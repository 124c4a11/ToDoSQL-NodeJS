const { Router } = require('express');
const router = Router();

const TodoModel = require('../models/TodoModel');


router.get('/', async (req, res) => {
  try {
    const todos = await TodoModel.findAll();

    res.status(200).json(todos);
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const todo = await TodoModel.create({
      title: req.body.title,
      done: false
    });

    res.status(201).json({ todo });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findByPk(parseInt(req.params.id));

    todo.done = req.body.done;

    await todo.save();

    res.status(200).json({ todo });
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findByPk(parseInt(req.params.id));

    await todo.destroy();

    res.status(204).json({});
  } catch (err) {
    console.error(err);

    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
