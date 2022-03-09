const notifier = require("mail-notifier");
function startEmailSever(mail, pass, host) {
  const imapconfig = {
    user: mail, // ex : "hieuly757r4l@outlook.com"
    password: pass, // ex : ""7E7rOJgs9amz""
    host: host, // ex : "imap.outlook.com"
    port: 993, // imap port
    tls: true, // use secure connection
    tlsOptions: { rejectUnauthorized: false },
  };

  const emailSever = notifier(imapconfig);
  emailSever.on("mail", (mail) => {
    console.log(mail);
  });
  emailSever.start();
  return {
    stop: emailSever.stop,
  };
}

// startEmailSever("huynguyen107vph@outlook.com", "rrvuVDam82#", "imap.outlook.com");
// bỏ comment dòng cuối để test
module.exports = startEmailSever;
