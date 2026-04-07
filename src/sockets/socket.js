module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("send_message", (data) => {
      console.log("Message:", data);

      io.emit("receive_message", data);
    });
  });
};