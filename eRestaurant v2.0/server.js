const express = require("express");
const routers = require("./router.const");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routers);

app.listen(PORT, HOST, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});
