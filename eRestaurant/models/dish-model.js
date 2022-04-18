const path = require("path");
const { v4: uuid } = require("uuid");

const { readFile, writeFile } = require("../utils/file-service");

const DISH_PATH = path.join(__dirname, "..", "db", "dish.json");

class DishModel {
  getDish() {
    console.log("3 Model, get same Dish");
    const dishes = readFile(DISH_PATH);
    return dishes;
  }

  addDish(data) {
    console.log("3 Model, add Dish");
    const dishJsonData = readFile(DISH_PATH);
    const newDish = {
      id: uuid(),
      ...data,
    };
    const addedDishData = [...dishJsonData, newDish];
    // writeFile(DISH_PATH, addedDishData);
 
    console.log("Dish was added!");
  }

  getDishById(dishId) {
    const dishJsonData = readFile(DISH_PATH);
    const foundDish = dishJsonData.find((dish) => dish.id === dishId);
    if (!foundDish) {
      return { message: "No such dish found" };
    } else {
      console.log("Dish is found");
      return foundDish;
    }
  }

  updateDish(dishId, dishData) {
    const dishJsonData = readFile(DISH_PATH);
    const dishJsonDataUpdated = dishJsonData.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, ...dishData };
      }else {
        return order;
      }
    });
    if (dishJsonDataUpdated.length <= 0) {
      return { message: "No such dish found" };
    } else {
      console.log("Dish has been updated");
      writeFile(DISH_PATH, dishJsonDataUpdated);
    }
  }

  removeDish(dishId) {
    const dishJsonData = readFile(DISH_PATH);
    const dishJsonDataUpdated = dishJsonData.filter(
      (dish) => dish.id !== dishId
    );
    if (dishJsonDataUpdated.length === dishJsonData.length) {
      return { message: "No such dish found" };
    } else {
      console.log("Dish has been deleted");
      writeFile(DISH_PATH, dishJsonDataUpdated);
    }
  }
}

module.exports = DishModel;
