const app = require('./app.js');

const sequelize = require('./utils/database');

const PORT = process.env.PORT || 3000;


async function start() {
  try {
    await sequelize.sync();

    app.listen(PORT, () => 'Server running!');
  } catch (err) {
    console.error(err);
  }
}
start();
