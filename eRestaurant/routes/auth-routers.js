const router = require("express").Router();
const path = require("path");
const {validateCredentials} = require("../services/credentials-validator");
const { authSession } = require("../sessions/sessions.const");
const validateSession = require("../services/session-validator");
const AuthController = require("../controller/auth-controller");
const authController = new AuthController();


router.get("/", (req,res)=>{
    console.log("Main rout ");
    const logInHTML = path.join(__dirname, "..", "views", "logIn.html");
    res.sendFile(logInHTML);
    // res.send({message:"main page"})
});

router.post("/loging_In", authSession, validateCredentials, async (req,res) => {
    try {
        console.log("Im hiting loging_In router");    
        const credentials = req.body;
        const user = await authController.authUser(credentials);
        console.log("User from logIN");
        req.session.loggedIn = true;
        req.session.role = user.role;
        console.log(req.session)
        // res.redirect("/logged_In");
        res.status(200).send({ message: "User is logged in" });
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

router.get("/logged_In", authSession, validateSession,  (req,res) => {
    console.log("from the /logged_In ",req.session)
    console.log("logged_In router");
    res.status(200).send({ message: "User is logged in" });
});

router.post("/logout", validateSession, (req, res) => {
    req.session.destroy();
    res.send({ message: "Logout successful" });
});


module.exports = router;