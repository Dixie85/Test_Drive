const express = require("express");
const path = require("path");
const router = express.Router();
const validateSession = require("./services/session-validator");
const { authSession } = require("./sessions/sessions.const");

const dishRoutes = require("./routes/dish-routes");
const orderRouter = require("./routes/order-routes");
const authRouter = require("./routes/auth-routers");

router.use(express.static(path.join(__dirname, "views")));

router.use(authRouter);
router.use("/dish", authSession, validateSession, dishRoutes);
router.use("/order", authSession, validateSession, orderRouter);
router.get("*", (req,res)=>{
  console.log("Incorect URL");    
  res.redirect("/");
});  

module.exports = router;
