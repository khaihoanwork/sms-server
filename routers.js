var express = require("express");
var router = express.Router();

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

module.exports = router;
