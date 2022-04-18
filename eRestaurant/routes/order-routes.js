const router = require("express").Router();
const {validateAdminUser} = require("../services/credentials-validator");
const OrderController = require("../controller/order-controller");
const orderController = new OrderController();

router.get("/", validateAdminUser, (req, res) => {
  console.log( "1. DISH route calling controller");
  const orders = orderController.getOrder();
  res.send(orders);
});

router.post("/add_order", (req, res)=> {
  console.log("add_dish calling the controller ;)");
  const orderData = req.body;
  console.log(orderData);
  orderController.addOrder(orderData);
  res.send({message:"Order was added"});
});

router.get("/:id", validateAdminUser, (req, res) => {
	const orderData = req.params.id;
  const getDish = orderController.getOrderById(orderData);
  res.send(getDish);
});

router.patch("/:id/update", validateAdminUser, (req, res) => {
	const orderId = req.params.id;
	const updates = req.body;
  res.send(orderController.updateOrder(orderId, updates));
});

router.patch("/:id/:status", validateAdminUser, (req, res) => {
	const orderId = req.params.id;
  const orderStatus = req.params.status;
  res.send(orderController.changeOrderStatus(orderId, orderStatus));
});

router.delete("/:id", validateAdminUser, (req, res) => {
	const orderId = req.params.id;
  res.send(orderController.removeOrder(orderId));
});



module.exports = router;
