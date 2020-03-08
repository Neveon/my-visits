const db = require('../config/db');
const geocoder = require('../utils/geocoder');

// Constructor function
const Location = function(location) {
  this.userId = location.userId;
  this.address = location.address; // overwritten with geocoder address
  // geocoder gives us latitude and longitude
  this.lat = null;
  this.lng = null;
}

// Create Location
Location.createLocation = (newLocation, result) => {
  // Check if location is already in database with the id given
  db.query("SELECT * FROM neveondb.locations WHERE id = ?", [newLocation.id], async (err,res) => {
    if(err){
      console.error("errors: ", err);
      result(err, null);
      return;
    } else if (res.length) { // res will not be empty if the location with that id exists
      console.log("Failed creating new location - location exists with that id already");
      result('already_exists', null);
      return;
    } else {

      // Geocoder used to determine latitude, longitude and formatted address
      // Wait for geocer to resolve before resuming insert
      await geocoder.geocode(newLocation.address).then(function(geocodedLocation) {
        newLocation.lat = geocodedLocation[0].latitude;
        newLocation.lng = geocodedLocation[0].longitude;
        newLocation.address = geocodedLocation[0].formattedAddress;

        // SET allows us to insert newLocation object
        db.query("INSERT INTO neveondb.locations SET ?", [newLocation], (err, res) => {
          if(err) {
            console.error("errors: ", err);
            result(err, null);
            return;
          }
          result(null, {id: res.insertId, ...newLocation});
        });

      });
    }
  });
}

// Read Location
Location.getLocations = (userId, result) => {
  db.query('SELECT * FROM neveondb.locations WHERE userId = ?', [userId], (err,res) => {
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    result({type: 'no_locations'}, null);
  });
}

// Delete Location
Location.delete = (id, result) => {
  db.query('DELETE FROM neveondb.locations WHERE id = ?', [id], (err, res) =>{
    if(err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if(res.affectedRows === 0) {
      // No location with that id
      result({ type: 'not_in_database' }, null);
      return;
    }

    result(null, res);
  })
}

module.exports = Location;