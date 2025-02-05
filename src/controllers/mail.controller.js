const nodeMailer = require("nodemailer");

// Requuest handlers

const postSendMailCtrl = async (req, res) => {
  const { name, email, message } = req.body;

  // Validación básica de los campos requeridos
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // Validación simple del formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Email is not valid",
    });
  }

  try {
    await sendMail(name, email, message);
    res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    console.error("Error while sending email:", error);
    res.status(500).json({
      error: "Error while sending email",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Sendmaail using something other than gmail
// const sendMail = async (name, email, message) => {
// const transporter = nodeMailer.createTransport({
//   host: process.env.MAIL_HOST,       // ejemplo: "smtp.tuproveedor.com"
//   port: process.env.MAIL_PORT,       // ejemplo: 587 o 465
//   secure: process.env.MAIL_SECURE,   // true para 465, false para otros puertos
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });
//   const mailOptions = {
//     from: process.env.MAIL_SENDER,
//     to: process.env.MAIL_RECIPIENT,
//     subject: "Contact Form Submission",
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };
//   await transporter.sendMail(mailOptions);
// };

const sendMail = async (name, email, message) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: process.env.MAIL_RECIPIENT,
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { postSendMailCtrl };
