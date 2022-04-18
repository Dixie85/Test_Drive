const path = require("path");
const USERS_PATH = path.join(__dirname, "..", "db", "users.json");
const { readFile, writeFile } = require("../utils/file-service");


const validateCredentials = (req, res, next) => {
  console.log("att the begining");
  console.log(req.body);
  const credentials = req.body;
  console.log(credentials);
  const allUsers = readFile(USERS_PATH);
  const findUser = allUsers.filter((user)=>{
    if(req.body.username  === user.username && req.body.password === user.password){
      return user
    }
  });
  console.log(findUser);
    
  if (!credentials.username || !credentials.password) {
    res.status(400).send({ message: "Missing credentials" });
    res.redirect("/");
  }; 
  if(findUser){
    next()
  } else {
    res.status(400).send({ message: "Incorrect credentials" });
    res.redirect("/");
  }
};

const validateAdminUser = (req, res, next) => {
  if (req.session.loggedIn && req.session.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Access denied!" });
  }
};


module.exports =  {validateCredentials, validateAdminUser};


