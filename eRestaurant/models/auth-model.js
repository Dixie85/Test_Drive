const path = require("path");
const { v4: uuid } = require("uuid");
const USERS_PATH = path.join(__dirname, "..", "db", "users.json");
const { readFile, writeFile } = require("../utils/file-service");

class AuthModel {
  authUser(credentialsData) {
    console.log("auth model: ",credentialsData);
    console.log("3 Model, authUser");
    const users = readFile(USERS_PATH);
    const user = users.find( user => {
      if(credentialsData.username  === user.username && credentialsData.password === user.password){
        return user
      }
    });
    console.log("auth model:", user)
    return user;   
  }

  // addUser(data) {
  //   console.log("3 Model, add Dish");
  //   const dishJsonData = readFile(DISH_PATH);
  //   const newDish = {
  //     id: uuid(),
  //     ...data,
  //   };
  //   const addedDishData = [...dishJsonData, newDish];
  //   writeFile(DISH_PATH, addedDishData);

  //   console.log("Dish was added!");
  // }

 
}

module.exports = AuthModel;
