const router = require("express").Router();
const path = require("path");
const AuthController = require("../controller/auth-controller");
const authController = new AuthController();


router.get("/", (req,res)=>{
    console.log("Main rout ");
    const logInHTML = path.join(__dirname, "..", "views", "logIn.html");
    res.sendFile(logInHTML);
    // res.send({message:"main page"})
});

router.post("/register",  async (req,res) => {
    try {
        console.log("The register router");
        const credentials = req.body;
        // const regiteredUser = await authController.addUser(credentials);
        const {status, message} = await authController.addUser(credentials);
        res.status(status).send({message})
    } catch (error) {
        res.status(error.status).send(error.message)
    }
});

router.post("/loging_In", async (req,res) => {
    try {
        console.log("Im hiting loging_In router");    
        const credentials = req.body;
        const {status, message, accessToken, refreshToken} = await authController.authUser(credentials);
        console.log("User from logIN");
        // res.redirect("/logged_In");
        res.status(status).header("Authorization", accessToken).send({message, accessToken, refreshToken});
    } catch (error) {
        res.status(error.status).send(error.message);
    }
    
});

router.get("/logged_In", (req,res) => {
    console.log("from the /logged_In ",req.session)
    console.log("logged_In router");
    res.status(200).send({ message: "User is logged in" });
});

router.post("/refresh_token", async (req, res) => {
    try {
        const refreshTokenData = req.body.refreshToken;
        const {status, message, accessToken} = await authController.refreshToken(refreshTokenData);
        res.status(status).header("Authorization", accessToken).send({message, accessToken });        
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: "Logout successful" });
});


module.exports = router;