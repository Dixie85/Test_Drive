const AuthModel = require("../models/auth-model");
const authModel = new AuthModel();

class AuthController {
  authUser(credentialsData) {
    console.log("2. Controller calls Model");
    return  authModel.authUser(credentialsData);  
  }

  // addUser(data){
  //   console.log("Controller calling the Model");
  //   return authModel.addDish(data);
  // }
}

module.exports = AuthController;
