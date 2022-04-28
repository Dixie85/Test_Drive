const OrderModel = require("../models/order-model");
const orderModel = new OrderModel();

class OrderController {
  getOrder() {
    console.log("2. Controller calls Model");
    return  orderModel.getOrder();  
  }

  addOrder(data){
    console.log("Controller calling the Model");
    return orderModel.addOrder(data);
  }

  getOrderById(orderId){
    console.log("Controller calling the Model");
    return orderModel.getOrderById(orderId);
  }

  updateOrder(orderId, orderData){
    console.log("Controller calling the Model");
    return orderModel.updateOrder(orderId, orderData);
  }

  changeOrderStatus(orderId, orderStatus){
    console.log("Controller calling the Model");
    return orderModel.changeOrderStatus(orderId, orderStatus);
  }

  removeOrder(orderId){
    console.log("Controller calling the Model");
    return orderModel.removeOrder(orderId);
  }




}

module.exports = OrderController;
