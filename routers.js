var express = require("express");
var router = express.Router();
const listOtp = require("./otp.json");

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
    // console.log(req.body);
    res.send({
        message: "Message received",
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
