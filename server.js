const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const socketIO = require("socket.io");

var app = express();

//* import socket server
const socketServer = require("./socketServer");

//* Import Routers
const userRouter = require("./CLIENT/routers/userRouter");
const scenceRouter = require("./CLIENT/routers/scenceRouter");
const scheduleRouter = require("./CLIENT/routers/scheduleRouter");

const modelRouter = require("./HARDWARE/routers/modelRouter");
const boardRouter = require("./HARDWARE/routers/boardRouter");
const interfaceRouter = require("./HARDWARE/routers/interfaceRouter");
const groupRouter = require("./HARDWARE/routers/groupRouter");



// parse application/x-www-form-urlencoded
// { extended: true } : support nested object
// Returns middleware that ONLY parses url-encoded bodies and
// This object will contain key-value pairs, where the value can be a
// string or array(when extended is false), or any type (when extended is true)
app.use(express.urlencoded({ extended: true }));

//This return middleware that only parses json and only looks at requests where the Content-type
//header matched the type option.
//When you use req.body -> this is using body-parser cause it is going to parse
// the request body to the form we want
app.use(express.json());

app.get("/", function (req, res) {
  res.send("WELCOME TO SHCA SERVER");
});

app.use("/api/user", userRouter);
app.use("/api/model", modelRouter);
app.use("/api/board", boardRouter);
app.use("/api/interface", interfaceRouter);
app.use("/api/group", groupRouter);
app.use("/api/scence", scenceRouter);
app.use("/api/schedule", scheduleRouter);

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

//* After listening, it becomes [Http Server]
var server = app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

//* Socket Listen
var io = socketIO.listen(server);
io.use(function (socket, next) {
  //TODO: execute some code like: validate token
  next();
}).on("connection", (socket) => {
  socketServer(socket);
});

//* MongoDB Connection
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB IS CONNECTED .."))
  .catch((error) => {
    console.error("error! " + error);
  });

module.exports = server; //Exporting for test
