module.exports = (io, socket) => {
    socket.on("message", (msg) => {
        console.log("Server received message: ");
        console.log(msg);
        io.emit("PC message", msg);
    });
};
