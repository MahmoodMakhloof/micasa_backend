const Interfaces = require("./HARDWARE/models/interfaceModel");

const socketServer = (socket) => {
  //The moment one of your client connected to socket.io server it will obtain socket id
  //Let's print this out.
  console.log(`Connection : SocketId = ${socket.id}`);

  socket.on("interfaceValueChanged", async function (data) {
    var value = data.value;
    var interfaceId = data.interface;

    await Interfaces.updateOne({ _id: interfaceId }, { value: value });

    console.log(`value : ${value} for interface : ${interfaceId}`);

    socket.broadcast.emit("interfaceValueChanged", data);
  });

  socket.on("disconnect", function () {
    console.log("One of sockets disconnected from our server.");
  });
};

module.exports = socketServer;
