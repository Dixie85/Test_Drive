const path = require("path");
const { v4: uuid } = require("uuid");
const DishModel = require("./dish-model");
const dishModel = new DishModel();

const { readFile, writeFile } = require("../utils/file-service");

const ORDER_PATH = path.join(__dirname, "..", "db", "order.json");

class OrderModel {
  getOrder() {
    return new Promise((resolve, reject) => {
      console.log("3 Model, get same Order");
      const orders = readFile(ORDER_PATH);
      if (orders.length === 0) {
        reject({ message: "No orders found", status: 400 });
      } else {
        resolve(orders);
      }
    });
  }

  addOrder(data) {
    return new Promise((resolve, reject) => {
      console.log("3 Model, add Order");
      const userData = data;
      const existingDishes = dishModel.getDish();
      const orderJsonData = readFile(ORDER_PATH);
      const verifyingExistingDish = existingDishes.filter((dish) => {
        if (dish.name === userData.dishName) {
          return dish;
        }
      });
      console.log("verifyingExistingDish", verifyingExistingDish);
      if (verifyingExistingDish.length >= 1) {
        const currentTime = new Date().toISOString();
        const newOrder = {
          id: uuid(),
          date: currentTime,
          status: "new",
          ...data,
        };
        const addedOrderData = [...orderJsonData, newOrder];
        writeFile(ORDER_PATH, addedOrderData);

        resolve({ message: "Order was added!" });
      } else {
        reject({ message: "We don't have that dish on the menu", status: 400 });
      }
    });
  }

  getOrderById(orderId) {
    return new Promise((resolve, reject) => {
      const orderJsonData = readFile(ORDER_PATH);
      const foundOrder = orderJsonData.find((order) => order.id === orderId);
      if (!foundOrder) {
        reject({ message: "No such order found", status: 400 });
      } else {
        console.log("Order is found");
        resolve(foundOrder);
      }
    });
  }

  updateOrder(orderId, orderData) {
    return new Promise((resolve, reject) => {
      const orderJsonData = readFile(ORDER_PATH);
      const orderJsonDataUpdated = orderJsonData.map((order) => {
        if (order.id === orderId) {
          return { ...order, ...orderData };
        } else {
          return order;
        }
      });
      if (orderJsonDataUpdated.length <= 0) {
        reject({ message: "No such Order found", status: 400 });
      } else {
        writeFile(ORDER_PATH, orderJsonDataUpdated);
        resolve({ message: "Order has been updated" });
      }
    });
  }

  removeOrder(orderId) {
    return new Promise((resolve, reject) => {
      const orderJsonData = readFile(ORDER_PATH);
      const orderJsonDataUpdated = orderJsonData.filter(
        (order) => order.id !== orderId
      );
      if (orderJsonDataUpdated.length === orderJsonData.length) {
        reject({ message: "No such Order found", status: 400 });
      } else {
        writeFile(ORDER_PATH, orderJsonDataUpdated);
        resolve({ message: "Order has been deleted" });
      }
    });
  }

  changeOrderStatus(orderId, orderStatus) {
    return new Promise((resolve, reject) => {
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
        reject({ message: "No such Order found", status: 400 });
      } else {
        writeFile(ORDER_PATH, orderJsonDataUpdated);
        resolve({ message: "Order has been updated" });
      }
    });
  }
}

module.exports = OrderModel;
