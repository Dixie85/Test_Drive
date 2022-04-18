const router = require("express").Router();
const {validateAdminUser} = require("../services/credentials-validator");
const DishController = require("../controller/dish-controller");
const dishController = new DishController();

router.get("/", (req, res) => {
  console.log( "1. DISH route calling controller");
  const dishes = dishController.getDish();
  res.send(dishes);
});

router.get("/:id", (req, res) => {
	const dishData = req.params.id;  
  res.send(dishController.getDishById(dishData));
});

router.post("/add_dish", validateAdminUser, (req, res)=> {
  console.log("add_dish calling the controller ;)");
  const dishData = req.body;
  dishController.addDish(dishData);
  res.send({message:"Dish was added"});
});

router.patch("/:id/update",validateAdminUser, (req, res) => {
	const dishId = req.params.id;
	const updates = req.body;
  res.send(dishController.updateDish(dishId, updates));
});

router.delete("/:id",validateAdminUser, (req, res) => {
	const dishId = req.params.id;
  res.send(dishController.removeDish(dishId));
});



module.exports = router;
