const DishModel = require("../models/dish-model");
const dishModel = new DishModel();

class DishController {
  getDish() {
    console.log("2. Controller calls Model");
    return  dishModel.getDish();  
  }

  addDish(data){
    console.log("Controller calling the Model");
    return dishModel.addDish(data);
  }

  getDishById(dishId){
    console.log("Controller calling the Model");
    return dishModel.getDishById(dishId);
  }

  updateDish(dishId, dishData){
    console.log("Controller calling the Model");
    return dishModel.updateDish(dishId, dishData);
  }

  removeDish(dishId){
    console.log("Controller calling the Model");
    return dishModel.removeDish(dishId);
  }

}

module.exports = DishController;
