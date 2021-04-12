const db = require("../models");

module.exports = {

  getUser: function (req, res) {
    db.Users.find({ _id: req.body.id })
      .then((userData) => {
        userData[0].password = undefined
        res.json(userData)
      })
      .catch((err) => res.status(422).json(err));
  },

  getUsernamesEmails: function (req, res) {
    db.Users.find()
      .select(['uName', 'email'])
      // send only emails/usernames to front end
      .then((userData) => {
        let usernames = {}
        let emails = {}
        userData.forEach(function (item) {
          usernames[item.uName] = true;
          emails[item.email] = true;
        })
        res.json({ usernames, emails })
      })
      .catch((err) => res.status(422).json(err));
  },

  createUser: function (req, res) {
    db.Users.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  loginUser: function (req, res) {
    db.Users.find({ _id: req.body.id })
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  logoutUser: function (req, res) {
    db.Users.find({ _id: req.body.id })
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err));
  },

  postMessage: function (req, res) {
    db.Messages.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => res.status(422).json(err))
  }

};
