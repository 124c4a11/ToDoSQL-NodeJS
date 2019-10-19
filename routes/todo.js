const { Router } = require('express');
const router = Router();

const TodoModel = require('../models/TodoModel');


router.get('/', (req, res) => {});


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


router.put('/:id', (req, res) => {});


router.delete('/:id', (req, res) => {});


module.exports = router;
