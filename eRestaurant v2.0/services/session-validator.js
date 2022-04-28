const validateSession = (req, res, next) => {
  console.log("validateSession",req.session);
  if (req.session.loggedIn) {
    next();
  } else {
    console.log("validator redirekting!")
    res.redirect("/");
  }
};

module.exports = validateSession;
