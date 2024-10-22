const express = require("express");
const bodyParser = require("body-parser");
var multipart = require('connect-multiparty');
// const schedule = require('./schedule');

// schedule.init()

const app = express();
app.use(bodyParser.json());

const multipartMiddleware = multipart();

/******* 新漂青年接口 *******/
const controller = require('./controller/msg')

app.get("/daily", controller.daily)
app.post("/webhook", controller.webhook);
app.post("/daying-webhook", controller.dayingWebhook);
app.post("/receive", multipartMiddleware, controller.receive);
app.get("/danwang.png", controller.danwang);
app.get("/send-danwang", controller.sendDamwang);
app.get("/ad", controller.ad);

const UserController = require('./controller/user')
app.get("/user", UserController.getUser);

/******* 海燕俊平接口 *******/
const hyjpController = require('./controller/personal');
const logger = require("./utils/logger");

app.post("/msg", hyjpController.msg);
app.get("/gold-price", hyjpController.goldPrice);

const SystemController = require('./controller/system')
app.get("/health", SystemController.health);

/**
 * 启动
 */
app.listen(3000, () => {
  console.log("Server is running on port 3000");

  logger.info("Server is running on port 3000");
});
