const Location = require('../models/locations');

// Create and save a new location
exports.createLocation = (req, res) => {
  // Validating request
  if (!req.body.address) {
    res.status(400).send({
      msg: "Content cannot be empty!"
    });
  }

  // req.body
  const { address } = req.body;

  // Create a Location
  let location = new Location({
    userId: req.user.id,
    address: address
  });

  // Save Location to database
  Location.createLocation(location, (err, data) => {
    if(err) {
      if(err.type === 'already_exists'){
        res.status(400).send({
          msg: 'Location already exists'
        });
      } else {
        res.status(500).send(err);
      }
    } else {
      res.status(200).send({
        data
      });
    }
  })
}

// Get locations
exports.getLocations = (req, res) => {
  const { id } = req.user; // req.user.id given in auth middleware

  // Send all location data or send error
  Location.getLocations(id, (err, data) => {
    if(err) {
      if(err.type === 'no_locations') {
        res.status(200).send({
          msg: "Add some locations"
        })
      } else {
        res.status(500).send(err);
      }
    } else {
      res.status(200).send({
        data
      });
    }
  });
}

exports.delete = (req, res) => {
  const { id } = req.params // req.params.id is the primary key of the location

  Location.delete(id, (err, data) => {
    if(err) {
      if(err.type === 'not_in_database'){
        res.status(400).send({
          msg: "Location already deleted or not in database"
        });
      } else {
        res.status(500).send({
          msg: "Error deleting location"
        });
      }
    } else {
      res.status(200).send({
        msg: "Deleted location successfully"
      });
    }
  });
}