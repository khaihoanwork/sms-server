const listotp = require("./otp.json");
const fs = require("fs");

module.exports = (io, socket) => {
    socket.on("message", (msg) => {
        let clearIntervaled = false;
        console.log("Server received message: ");
        console.log(msg);
        listotp.push(msg);
        fs.writeFile("./otp.json", JSON.stringify(listotp), (err) => {
            if (err) {
                console.log(err);
            }
        });
        // emit every 1s and clear interval
        let interval = setInterval(() => {
            io.emit("PC message", msg);
        }, 1000);
        // clear interval when receiving event
        socket.on("client message", (msgC) => {
            clearInterval(interval);
            clearIntervaled = true;
            console.log(msgC);
        });
        // if client didn't receive event, clear interval
        setTimeout(() => {
            if (!clearIntervaled) {
                clearInterval(interval);
            }
        }, 10000);
    });
};
