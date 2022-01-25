const listotp = require("./otp.json");
const fs = require("fs");
// retry

module.exports = (io, socket) => {
    var clearIntervaled = false;
    var interval;
    socket.on("message", (msg) => {
        console.log("Server received message: ");
        console.log(msg);
        listotp.push(msg);
        fs.writeFile("./otp.json", JSON.stringify(listotp), (err) => {
            if (err) {
                console.log(err);
            }
        });
        //emit every 1s and clear interval
        interval = setInterval(() => {
            io.emit("PC message", msg);
        }, 2000);

        // if client didn't receive event, clear interval
        setTimeout(() => {
            if (!clearIntervaled) {
                clearInterval(interval);
                console.log({
                    success: false,
                    message: "Client didn't receive event, interval cleared by setTimeout",
                });
            } else {
                console.log("Client received event, interval cleared by client");
            }
        }, 40000);
    });
    // clear interval when receiving event
    socket.on("client message", (msgC) => {
        clearInterval(interval);
        clearIntervaled = true;
        console.log(msgC);
    });
};
