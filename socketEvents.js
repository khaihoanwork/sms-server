module.exports = (io, socket) => {
    socket.on("message", (msg) => {
        console.log("socket io received message: ");
    });
};
