const router = require("express").Router();
const { postSendMailCtrl } = require("./../../controllers/mail.controller");

router.post("/", postSendMailCtrl);

module.exports = router;
