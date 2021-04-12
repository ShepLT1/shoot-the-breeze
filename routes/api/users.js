const router = require("express").Router();
const controller = require("../../controllers");

router.get("/", (req, res) => {
  controller.getUser(req, res);
});

router.get("/register", (req, res) => {
  controller.getUsernamesEmails(req, res);
});

router.post("/register", (req, res) => {
  controller.createUser(req, res);
});

router.post("/login", (req, res) => {
  controller.loginUser(req, res);
});

router.post("/logout", (req, res) => {
  controller.logoutUser(req, res);
});

module.exports = router;