module.exports = app => {
  const auth = require('../middleware/auth');
  const location = require('../controllers/locations');

  // @route   POST /location
  // @desc    Create a new location
  // @access  Privates
  app.post('/locations', auth, location.createLocation);

  // @route   GET /location
  // @desc    Get user's locations visited
  // @access  Private
  app.get('/locations', auth, location.getLocations);

  // @route   DELETE /locations/:id
  // @desc    Delete a location
  // @access  Private
  app.delete('/locations/:id', auth, location.delete);
}