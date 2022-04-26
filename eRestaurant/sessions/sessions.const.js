const session = require("express-session");

const authSession = session({
  secret: "menu_secret",
  name: "menu_ID_cookie",
  cookie: {
    maxAge:  10 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: true,
});

const dishSession = session({
  secret: "dish_secret",
  name: "dish_cookie",
  cookie: {
    maxAge: 10 * 60 * 1000,
  },
  saveUninitialized: true,
  resave: false,
});

module.exports = { authSession, dishSession };
