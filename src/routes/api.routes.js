const router = require("express").Router();

router.use("/mail", require("./api-routes/mail.routes"));

module.exports = router;
