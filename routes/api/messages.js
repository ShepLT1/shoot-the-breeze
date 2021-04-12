const router = require("express").Router();
const controller = require("../../controllers");

router.get("/", (req, res) => {
  controller.getMessages(req, res);
});

router.post("/", (req, res) => {
  controller.postMessage(req, res);
});

module.exports = router;