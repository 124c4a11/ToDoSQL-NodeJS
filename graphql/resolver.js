const TodoModel = require('../models/TodoModel');


module.exports = {
  async getTodos() {
    try {
      return await TodoModel.findAll();
    } catch (err) {
      console.error(err);
    }
  },

  async createTodo({ todo }) {
    try {
      return await TodoModel.create({
        title: todo.title,
        done: false
      });
    } catch (err) {
      console.error(err);
    }
  },

  async completeTodo({ id }) {
    try {
      const todo = await TodoModel.findByPk(id);

      todo.done = true;

      await todo.save();

      return todo;
    } catch (err) {
      console.error(err);
    }
  },

  async removeTodo({ id }) {
    try {
      const todos = await TodoModel.findAll({ where: { id } });

      await todos[0].destroy();

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
};
