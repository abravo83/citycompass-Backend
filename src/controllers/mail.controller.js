const nodeMailer = require("nodemailer");

const sendMail = async (name, email, message) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

// Request handlers

const postSendMailCtrl = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // Basic validation for email email
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

// Sendmail using something other than gmail
// const sendMail = async (name, email, message) => {
// const transporter = nodeMailer.createTransport({
//   host: process.env.MAIL_HOST,       // i.e: "smtp.tuproveedor.com"
//   port: process.env.MAIL_PORT,       // i.e: 587 o 465
//   secure: process.env.MAIL_SECURE,   // true for 465, false other ports
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

module.exports = { postSendMailCtrl };
