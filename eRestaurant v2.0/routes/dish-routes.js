const router = require("express").Router();
const DishController = require("../controller/dish-controller");
const dishController = new DishController();
const priceValidator = require("../services/price-validator");
const { auth, validateAdminUser } = require("../authentication/auth");

router.get("/", auth, async (req, res) => {
  try {
    console.log( "1. DISH route calling controller");
    const dishes = await dishController.getDish();
    res.send(dishes);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const dishData = req.params.id; 
  const dish = await dishController.getDishById(dishData)
  res.send(dish);
  } catch (error) {
    res.status(error.status).send(error.message);
  }	
});

router.post("/add_dish", auth, validateAdminUser, priceValidator, async (req, res)=> {
  try {
    console.log("add_dish calling the controller ;)");
    const dishData = req.body;
    const dishAdded = await dishController.addDish(dishData);
    res.send(dishAdded);
  } catch (error) {
    res.status(400).send(error.message);
  }

});

router.patch("/:id/update", auth, validateAdminUser, priceValidator , async (req, res) => {
  try {
    const dishId = req.params.id;
    const updates = req.body;
    const dishUpdated = await dishController.updateDish(dishId, updates);
    res.send(dishUpdated);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});

router.delete("/:id",auth, validateAdminUser, async (req, res) => {
  try {
    const dishId = req.params.id;
    const dishDelited = await dishController.removeDish(dishId);
    res.send(dishDelited);
  } catch (error) {
    res.status(error.status).send(error.message);
  }
});


module.exports = router;
