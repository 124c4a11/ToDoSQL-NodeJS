const TodoModel = require('../models/TodoModel');


module.exports = {
  async getTodos() {
    try {
      return await TodoModel.findAll();
    } catch (err) {
      console.error(err);
    }
  }
};
