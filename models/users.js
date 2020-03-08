const db = require('../config/db');

// Constructor function
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
}

// Create User
User.create = (newUser, result) => {
  // Check if username is already taken
  db.query("SELECT * FROM neveondb.users WHERE username = ?", [newUser.username],(err,res) => {
    if(err){
      console.error("errors: ", err);
      result(err, null);
      return;
    } else if (res.length) { // res will not be empty if the username exists
      console.log("Failed creating user - username taken");
      result({ type: "username_taken"}, null);
      return;
    } else {

      // SET allows us to insert the newUser object
      db.query("INSERT INTO neveondb.users SET ?", [newUser], (err, res) => {
        if (err) {
          console.error("errors:", err);
          result(err, null);
          return;
        }

        result(null, {id: res.insertId, ...newUser});
      });
    }

  });
}

// Find user using username, obtaining info
User.findByName = (username, result) => {
  db.query('SELECT * FROM neveondb.users WHERE username = ?', [username], (err, res) => {
    if(err) {
      console.log("error: ", err);
      result(err,null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // No user found with the username
    result({type: 'not_found'}, null);
  });
}

// Delete User
User.delete = (id, result) => {
  db.query('DELETE FROM neveondb.users WHERE id = ?', [id], (err, res) => {
    if(err) {
      console.error("error: ", err);
      result({ type: 'general_error' }, err);
      return;
    }

    if(res.affectedRows == 0) {
      // No user with that id found
      result({ type: "not_found" }, null);
      return;
    }

    result(null, res);
  });
}

module.exports = User;