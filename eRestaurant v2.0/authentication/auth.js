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
    console.log(user);
    req.user = user
    next()
  })
 
}

module.exports = {auth}