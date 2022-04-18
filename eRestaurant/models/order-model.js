const path = require("path");
const { v4: uuid } = require("uuid");
const DishModel = require("./dish-model");
const dishModel = new DishModel();

const { readFile, writeFile } = require("../utils/file-service");

const ORDER_PATH = path.join(__dirname, "..", "db", "order.json");

class OrderModel {
  getOrder() {
    console.log("3 Model, get same Order");
    const orders = readFile(ORDER_PATH);
    return orders;
  }

  addOrder(data) {
    console.log("3 Model, add Order");
    const userData = data;
    const existingDishes = dishModel.getDish();
    const orderJsonData = readFile(ORDER_PATH);
    const verifyingExistingDish = existingDishes.filter((dish) => {
       if (dish.name === userData.dishName) {
        return dish;
      }
    });
    console.log("verifyingExistingDish",verifyingExistingDish);
    if (verifyingExistingDish) {
      const currentTime = new Date().toISOString();
      const newOrder = {
        id: uuid(),
        date: currentTime,
        ...data,
      };
      const addedOrderData = [...orderJsonData, newOrder];
      writeFile(ORDER_PATH, addedOrderData);

      console.log("Order was added!");
    }else {
      console.log("We don't have that dish on the menu");
    }
  }

  getOrderById(orderId) {
    const orderJsonData = readFile(ORDER_PATH);
    const foundOrder = orderJsonData.find((order) => order.id === orderId);
    if (!foundOrder) {
      return { message: "No such order found" };
    } else {
      console.log("Order is found");
      return foundOrder;
    }
  }

  updateOrder(orderId, orderData) {
    const orderJsonData = readFile(ORDER_PATH);
    const orderJsonDataUpdated = orderJsonData.map((order) => {
      if (order.id === orderId) {
        return { ...order, ...orderData };
      } else {
        return order;
      }
    });
    if (orderJsonDataUpdated.length <= 0) {
      return { message: "No such Order found" };
    } else {
      console.log("Order has been updated");
      writeFile(ORDER_PATH, orderJsonDataUpdated);
    }
  }

  removeOrder(orderId) {
    const orderJsonData = readFile(ORDER_PATH);
    const orderJsonDataUpdated = orderJsonData.filter(
      (order) => order.id !== orderId
    );
    if (orderJsonDataUpdated.length === orderJsonData.length) {
      return { message: "No such Order found" };
    } else {
      console.log("Order has been deleted");
      writeFile(ORDER_PATH, orderJsonDataUpdated);
    }
  }

  changeOrderStatus(orderId, orderStatus) {
    const orderJsonData = readFile(ORDER_PATH);
    const orderJsonDataUpdated = orderJsonData.map((order) => {
      if (order.id === orderId) {
        order.status = orderStatus;
        return order;
      } else {
        return order;
      }
    });
    if (orderJsonDataUpdated.length <= 0) {
      return { message: "No such Order found" };
    } else {
      console.log("Order has been updated");
      writeFile(ORDER_PATH, orderJsonDataUpdated);
    }
  }
}

module.exports = OrderModel;
