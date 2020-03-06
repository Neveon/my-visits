module.exports = app => {
  const users = require('../controllers/users');
  const auth = require('../middleware/auth');

  // @route   POST /users
  // @desc    Create new user
  // @access  Public
  app.post('/users', users.create);

  // @route   DELETE /users/:userId
  // @desc    Delete user
  // @access  Private
  app.delete('/users', auth, users.delete);
}