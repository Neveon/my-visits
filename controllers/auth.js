const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('config');


exports.authenticate = (req, res) => {
  const { username, password } = req.body;

  // Check database for username
  User.findByName(username, async (err, data) => {
    if(err) {
      if(err.type === 'not_found'){
        res.status(404).send({
          msg: `No user with username '${username} found'`
        });
      } else {
        res.status(500).send({
          msg: 'Server Error'
        });
      }
    } else {
      // Compare passwords - (pw, hashed pw)
      // .compare() is a promise
      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        return res.status(400).send({
          msg: 'Invalid Credentials'
        });
      }

      // used to obtain locations
      const payload = {
        id: {
          id: data.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );
    }
  });
}