const router = require("express").Router();
const OrderController = require("../controller/order-controller");
const orderController = new OrderController();

router.get("/", (req, res) => {
  try {
    console.log("1. DISH route calling controller");
    const orders = orderController.getOrder();
    res.send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/add_order", (req, res) => {
  try {
    console.log("add_dish calling the controller ;)");
    const orderData = req.body;
    console.log(orderData);
    const addedOrder = orderController.addOrder(orderData);
    res.send(addedOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const orderData = req.params.id;
    const getDish = orderController.getOrderById(orderData);
    res.send(getDish);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id/update", (req, res) => {
  try {
    const orderId = req.params.id;
    const updates = req.body;
    const updatedOrder = orderController.updateOrder(orderId, updates);
    res.send(updatedOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id/:status", (req, res) => {
  try {
    const orderId = req.params.id;
    const orderStatus = req.params.status;
    const status = orderController.changeOrderStatus(orderId, orderStatus);
    res.send(status);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = orderController.removeOrder(orderId);
    res.send(deletedOrder);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
