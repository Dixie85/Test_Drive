const priceValidator = (req, res, next) => {
  console.log(req.body);
  if (req.body.price >= 1 && req.body.price <= 1000) {
    next();
  } else {
    console.log("Invalide price! Min prices 1, max price 1000")
    res.redirect("/dish");
  }
};

module.exports = priceValidator;
