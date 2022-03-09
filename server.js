const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const httpServer = require("http").createServer(app);
var port = process.env.PORT || 3000;
const options = {
  cors: {
    origin: "*",
  },
};
const io = require("socket.io")(httpServer, options);
const socketEvents = require("./socketEvents");

var api = require("./routers");
var mailapi = require("./mailrouters");
app.use(cors());
app.use(express.json());
app.use("/", api);
app.use("/mail", mailapi);

const onConnection = (socket) => {
  console.log("connected");
  const onDisconnected = () => {
    console.log("disconnected");
  };
  socket.on("disconnect", onDisconnected);
  socketEvents(io, socket);
};
io.on("connection", onConnection);

httpServer.listen(port, () => {
  console.log(`listening on ${port}`);
});
