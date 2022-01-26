var express = require("express");
var router = express.Router();
const listOtp = require("./otp.json");
const fs = require("fs");
const currentOtp = {
    otp: null,
    clientReceive: null,
    setOtp: function (msg) {
        this.otp = msg;
        return;
    },
    getOtp: function () {
        return this.otp;
    },
    setClientReceive: function (state) {
        this.clientReceive = state;
        return;
    },
    getClientReceive: function () {
        return this.clientReceive;
    },
};
router.use(function timeLog(req, res, next) {
    console.log("Time: ", Date.now());
    next();
});

router.get("/", function (req, res) {
    res.send({
        message: "Welcome to the API",
    });
});
router.post("/message", function (req, res) {
    currentOtp.setOtp(req.body);
    currentOtp.setClientReceive(false);
    listOtp.push(req.body);
    fs.writeFileSync("./otp.json", JSON.stringify(listOtp), "utf8");
    // console.log(req.body);
    res.send({
        message: "Message received",
    });
});

router.get("/currentOtp", function (req, res) {
    const result = currentOtp.getOtp();
    if (result) {
        res.send({
            message: "success",
            data: result,
        });
    } else {
        // send with status code 404
        res.status(404).send({
            message: "Server current don't receive any OTP",
        });
    }
    currentOtp.set(null);
    currentOtp.setClientReceive(true);
});

router.get("state", function (req, res) {
    res.send({
        clientReceive: currentOtp.getClientReceive(),
    });
});

router.get("/listotp", function (req, res) {
    res.send({
        listOtp,
    });
});
router.get("/listotp/:id", function (req, res) {
    const id = req.params.id;
    const otp = listOtp[id];
    if (otp) {
        res.send({
            otp,
        });
    } else {
        res.send({
            message: "OTP not found",
        });
    }
});
router.get("/lastopt", function (req, res) {
    const lastOtp = listOtp[listOtp.length - 1];
    if (lastOtp) {
        res.send({
            lastOtp,
        });
    } else {
        res.send({
            message: "OTP not found",
        });
    }
});
router.post("/clearotp", function (req, res) {
    listOtp.length = 0;
    res.send({
        message: "OTP list cleared",
    });
});

module.exports = router;
