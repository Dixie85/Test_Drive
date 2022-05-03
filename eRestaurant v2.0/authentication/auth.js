const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  
  const token = req.header("Authorization")
  console.log(token)
  if(!token){
    return res.status(401).send({message: "Access denied"})
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err){
      return res.status(403).send({message: "You are not allowed to get this data"})
    }
    console.log("this is the user from AUTH",user);
    req.user = user
    next()
  })
 
};

const validateAdminUser = (req, res, next) => {
  const user = req.user.role;
  if (user !== "admin"){
    return res.status(401).send({message:"Access denied, only admin users may access this route"})
  } else {
    next()
  }
};


module.exports = {auth, validateAdminUser}