var express = require("express");
var router = express.Router();
const listOtp = require("./mail.json");
const fs = require("fs");
const listtenMailServer = require("./mailserver");
const currnetMail = {
  mail: null,
  clientReceive: null,
  setMail: function (msg) {
    this.mail = msg;
    return;
  },
  getMail: function () {
    return this.mail;
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
  const d = new Date();
  const time = d.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  console.log("Request Time : " + time);
  next();
});

router.get("/", function (req, res) {
  res.send({
    message: "Welcome to the mail API",
  });
});

router.post("/message", function (req, res) {
  currnetMail.setMail(req.body);
  currnetMail.setClientReceive(false);
  listOtp.push(req.body);
  fs.writeFileSync("./mail.json", JSON.stringify(listOtp), "utf8");
  // console.log(req.body);
  res.send({
    message: "Message received",
  });
});

router.get("/currnetmail", function (req, res) {
  const result = currnetMail.getMail();
  if (result) {
    res.send({
      message: "success",
      data: result,
    });
  } else {
    // send with status code 404
    res.status(404).send({
      message:
        "Server current don't receive any mail or Client already receive mail switch to /lastmail to get last mail",
    });
  }
  currnetMail.setMail(null);
  currnetMail.setClientReceive(true);
});

router.get("/state", function (req, res) {
  res.send({
    clientReceive: currnetMail.getClientReceive(),
  });
});

router.get("/listmail", function (req, res) {
  res.send({
    listOtp,
  });
});
router.get("/listmail/:id", function (req, res) {
  const id = req.params.id;
  const mail = listOtp[id];
  if (mail) {
    res.send({
      mail,
    });
  } else {
    res.send({
      message: "mail not found",
    });
  }
});
router.get("/lastmail", function (req, res) {
  const lastOtp = listOtp[listOtp.length - 1];
  if (lastOtp) {
    res.send({
      lastOtp,
    });
  } else {
    res.send({
      message: "mail not found",
    });
  }
});
router.post("/clearmail", function (req, res) {
  listOtp.length = 0;
  res.send({
    message: "mail list cleared",
  });
});

router.post("/startlistenmailserver", function (req, res) {
  const { mail, pass, host } = req.body;
  listtenMailServer.start(mail, pass, host);
  res.send({
    message: "Start listen mail server",
    success: true,
  });
});

router.post("/stoplistenmailserver", function (req, res) {
  listtenMailServer.stop();
  res.send({
    message: "Stop listen mail server",
    success: true,
  });
});

module.exports = router;
