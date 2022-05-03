const { rejects } = require("assert");
const { resolve } = require("path");
const path = require("path");
const { v4: uuid } = require("uuid");

const { readFile, writeFile } = require("../utils/file-service");

const DISH_PATH = path.join(__dirname, "..", "db", "dish.json");

class DishModel {
  getDish() {
    return new Promise((resolve, reject) => {
      console.log("3 Model, get same Dish");
      const dishes = readFile(DISH_PATH);
      if (dishes.length === 0) {
        reject({ message: "No dishes found", status: 400 });
      } else {
        resolve(dishes);
      }
    });   
  }
 
  addDish(data) {
    return new Promise ((resolve, reject) => {
      console.log("3 Model, add Dish");
    const dishJsonData = readFile(DISH_PATH);
    const newDish = {
      id: uuid(),
      ...data,
    };
    const addedDishData = [...dishJsonData, newDish];
    // writeFile(DISH_PATH, addedDishData);
    resolve({message: "Dish was added!"});
  });
  }
    

  getDishById(dishId) {
    return new Promise ((resolve, reject) => {
    const dishJsonData = readFile(DISH_PATH);
    const foundDish = dishJsonData.find((dish) => dish.id === dishId);
    if (!foundDish) {
      console.log("No such dish found");
      reject({message:"No such dish found", status: 400 });
    } else {
      console.log("Dish is found");
      resolve(foundDish);
    }
  });
  }

  updateDish(dishId, dishData) {
    return new Promise ((resolve, reject) => {
    const dishJsonData = readFile(DISH_PATH);
    const dishJsonDataUpdated = dishJsonData.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, ...dishData };
      } else {
        return order;
      }
    });
    if (dishJsonDataUpdated.length <= 0) {
      reject({ message: "No such dish found", status: 400 });
    } else {
      writeFile(DISH_PATH, dishJsonDataUpdated);
      resolve({message:"Dish has been updated"});
    }
  });
  }

  removeDish(dishId) {
    return new Promise ((resolve, reject) => {
    const dishJsonData = readFile(DISH_PATH);
    const dishJsonDataUpdated = dishJsonData.filter(
      (dish) => dish.id !== dishId
    );
    if (dishJsonDataUpdated.length === dishJsonData.length) {
      reject({ message: "No such dish found", status: 400 });
    } else {
      writeFile(DISH_PATH, dishJsonDataUpdated);
      resolve({message:"Dish has been deleted"});
    }
  });
  }
}

module.exports = DishModel;
