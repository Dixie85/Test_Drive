const AuthModel = require("../models/auth-model");
const authModel = new AuthModel();

class AuthController {
  authUser(credentialsData) {
    console.log("2. Controller calls Model");
    return  authModel.authUser(credentialsData);  
  }

  addUser(credentialsData){
    console.log("Controller calling the Model");
    return authModel.addUser(credentialsData);
  }

  refreshToken(refreshTokenData){
    console.log("Controller calling the Model");
    return authModel.refreshToken(refreshTokenData);
  }
  
}

module.exports = AuthController;
