require('dotenv').config()
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./passport');
const cors = require('cors');

const app = express();
app.use(
    cors({
      origin: 'http://localhost:5000',
      credentials: true,
    })
  );
const port = 3000

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
  }));

  
app.use(passport.initialize());
app.use(passport.session());
  
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        const userInfo = req.user;
        res.redirect('http://localhost:5000');
    }
);

app.get('/userInfo', isLoggedIn, (req, res) => {
    //console.log(req.user)
    res.json({
      userInfo: req.user._json,
    });
  });

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error while destroying session:', err);
        } else {
            req.logout(() => {
                console.log('You are logged out');
                //res.redirect('http://localhost:5000/login');
            });
        }
    });
});



app.listen(port, () => console.log("server running on port " + port))