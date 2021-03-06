const path = require("path");
const { v4: uuid } = require("uuid");
const USERS_PATH = path.join(__dirname, "..", "db", "users.json");
const { readFile, writeFile } = require("../utils/file-service");
const joi = require("joi");
const bcrypt = require("bcrypt");
const { createAccessToken, createRefreshToken } = require("../services/token_service");
const { getTokens, addToken}  = require("../utils/token_services");
const jwt = require("jsonwebtoken");


class AuthModel {
  authUser(credentialsData) {
    return new Promise( async (resolve, reject) => {
      console.log("auth model: ", credentialsData);
      console.log("3 Model, authUser");
      const users = readFile(USERS_PATH);
      const user = users.find((user) => credentialsData.username === user.username);
      console.log("auth model:", user);

      if (!user) {
        return reject( {message: `User with the username ${credentialsData.username} does not exist`, status: 400})
        };

      //Compare the passwords
      const validPassword = await bcrypt.compare( credentialsData.password, user.password);

      //Check if password is valid
      if (!validPassword) {
        return reject({ message: "Invalid credentials", status: 400 });
      }

     const accessToken = createAccessToken(user);
     const refreshToken = createRefreshToken(user);
     addToken(refreshToken);


      resolve ({ message: "User is logged in.",
       status:201,
       accessToken,
       refreshToken
       });
    });
  }

  refreshToken(refreshTokenData){
    return new Promise( async (resolve, reject) => {
      console.log("3 Model, refreshToken");
      
      if (!refreshTokenData) {
        return reject({message: "No token sent!", status: 401 });
      }

      const refreshTokens = getTokens();

      if (!refreshTokens.includes(refreshTokenData)) {
        return reject({ message: "You are unauthorized please log in", status: 403 });
      }

      jwt.verify(
        refreshTokenData,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            return reject({ message: "You are unauthorized please log in", status: 403 })
          }

          const accessToken = createAccessToken(user);

          resolve({message: "Refreshed token successfully generated new access token",
            status: 200, 
           accessToken
         })
        }
      );
    });
  }


  addUser(credentialsData) {
    return new Promise( async (resolve, reject) => {
      console.log("3 Model, add user");
      const users = readFile(USERS_PATH);

      const schema = joi.object({
        username: joi.string().min(4),
        password: joi.string().min(4),
        role: joi.string().exist()
      });
    
      const validation = schema.validate(credentialsData);
      
      if (validation.error) {
       return reject({ message: validation.error.details[0].message, status: 400 })
      }
      const exists = users.some((u) => u.username === credentialsData.username);

      if (exists) {
        return reject({message: `User with the username ${credentialsData.username} already exists`, status: 400}) 
        };
          
      //Createing Hashed Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(credentialsData.password, salt);

       //Create new user
      const user = {
        id: uuid(),
        username: credentialsData.username,
        password: hashedPassword,
        role: credentialsData.role
      };
       
      const usersToBeSaved = [...users, user]; 
      writeFile(USERS_PATH, usersToBeSaved);

      resolve({ message: "User is registered successfully.", status: 201 },);

    }); 
  }
}

module.exports = AuthModel;
