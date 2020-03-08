const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Create and Save a new User
exports.create = async (req, res) => {
  // Validating request
  if (!req.body || !req.body.username || !req.body.password) {
    res.status(400).send({
      msg: "Content cannot be empty!"
    });
  }

  // req.body
  const { username, password } = req.body;

  // Create a User
  const user = new User({
    username: username,
    password: password
  });

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Save User to Database
  User.create(user, (err, data) => {
    if(err){
      res.status(500).send({
        msg: err.message || "Some error occured while creating the User"
      });
    } else {
      // JWT
      const payload = {
        id: {
          id: data.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if(err) throw err;
          res.json({ token }); //respond with the token
        }
      )
    }
  })
};

// Find one User with username
exports.findOne = (req, res) => {
  User.findByName(req.params.username, (err, data) => {
    if (err) {
      if (err.type === 'not_found'){
        res.status(404).send({
          msg: `No user with username '${req.params.username}' found`
        });
      } else {
        res.status(500).send({
          msg: `Error retrieving User '${req.params.username}'`
        })
      }
    } else {
      res.send(data);
    }
  })
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  // req.user from auth middleware
  User.delete(req.user.id, (err, data) => {
    if(err){
      if(err.type === 'not_found'){
        res.status(404).send({
          msg: `No user found with username`
        });
      } else {
        res.status(500).send({
          msg: `Could not delete user`
        });
      }
    } else res.send({ msg: `User was deleted successfully`});
  })
};