module.exports = app => {
  const authorization = require('../controllers/auth');

  // @route   POST /auth
  // @desc    Auth user & get token
  // @access  Public (authenticate to access private routes)
  app.post('/auth', authorization.authenticate);
}