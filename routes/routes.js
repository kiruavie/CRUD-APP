const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, next) => {
    cb(null, "./uploads");
  },
  filename: (req, res, next) => {
    cd(null, file.filename + "_" + Date.now + "_" + file.originalname);
  },
});
router.get("/", (req, res) => {
  res.render("index", { title: "home page" });
});

var upload = multer({
  storage: storage,
}).single("image");

router.get("/add", (req, res) => {
  res.render("add_users", { title: "Add users" });
});

router.post("/add", upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  });

  user.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "User added succesfully!",
      };
      res.redirect("/");
    }
  });
});

module.exports = router;
