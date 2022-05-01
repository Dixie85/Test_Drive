const express = require("express");
const path = require("path");
const router = express.Router();


const dishRoutes = require("./routes/dish-routes");
const orderRouter = require("./routes/order-routes");
const authRouter = require("./routes/auth-routers");

router.use(express.static(path.join(__dirname, "views")));

router.use(authRouter);
router.use("/dish", dishRoutes);
router.use("/order", orderRouter);
router.get("*", (req,res)=>{
  console.log("Incorect URL");    
  res.redirect("/");
});  

module.exports = router;
