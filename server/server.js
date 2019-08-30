const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const helmet = require ('helmet');
const morgan = require ('morgan');
const passport = require ('@passport-next/passport');
const {Strategy, ExtractJwt} = require ('passport-jwt');
let jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

const userService = require ('./user.service');

const saltRounds = 10;
const jwtSecret = '123456';

const app = express ();
app.use (helmet ());
app.use (bodyParser.json ());
app.use (cors ());
app.use (morgan ('combined'));

app.use (passport.initialize ());

app.post ('/api/auth/login', async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await userService.authenticate (username, password);
    if (user) {
      const token = jwt.sign (user, jwtSecret, {
        expiresIn: '1h', // expires in 24 hours
      });
      res.json ({
        token: token,
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } else {
      res.sendStatus (401);
    }
  } catch (e) {
    res.sendStatus (401);
  }
});

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken (),
  secretOrKey: jwtSecret,
};

passport.use (
  new Strategy (opts, (payload, done) => {
    try {
      const user = userService.get (payload.username);
      if (user) {
        done (null, user);
      } else {
        done (null, false);
      }
    } catch (e) {
      console.log (e);
      done (null, false);
    }
  })
);

app.post ('/api/register', async (req, res, next) => {
  console.log (req.body);
  const user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  try {
    const hashedPassword = await bcrypt.hash (req.body.password, saltRounds);
    if (hashedPassword) {
      user.password = hashedPassword;
    } else {
      res.sendStatus (400);
    }
  } catch (e) {
    console.log (e);
    res.sendStatus (400);
  }
  
  try {
    userService.register (user);
    res.sendStatus (200);
  } catch (e) {
    console.log (e);
    res.sendStatus (400);
  }
});

app.get (
  '/api/users',
  passport.authenticate ('jwt', {session: false}),
  (req, res, next) => {
    res.json (userService.getAll ());
  }
);

app.listen (3001, () => {
  console.log ('listening on port 3001');
});
