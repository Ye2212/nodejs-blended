const nodemailer = require("nodemailer");
const sendEmail = async (req) => {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "goit_teacher@outlook.com", // generated ethereal user
      pass: "Qwe123456goit", // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const mailBody = `<div>
    <p> Hello, you received new email from contact ${req.body.name}</p>
    <p>His email is ${req.body.email}</p>
    <p>His phone number is ${req.body.phone}</p>
    </div>`;

  const options = {
    from: "goit_teacher@outlook.com", // sender address
    to: "ukolova_e@ukr.net", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: mailBody, // html body
  };
  let info = await transporter.sendMail(options);

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// module.exports = async (req) => {
//   let transporter = nodemailer.createTransport({
//     service: "hotmail",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "goit_teacher@outlook.com", // generated ethereal user
//       pass: "Qwe123456goit", // generated ethereal password
//     },
//   });

//   const options = {
//     from: "goit_teacher@outlook.com", // sender address
//     to: "volosgoto@yahoo.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: `<b>Hello from NodeJS ${req.body}</b>`, // html body
//   };
//   let info = await transporter.sendMail(options);

//   console.log("Message sent: %s", info.messageId);

//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// };
