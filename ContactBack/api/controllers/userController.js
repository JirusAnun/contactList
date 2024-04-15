"use strict";
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = mongoose.model("Users");

const hashPassword = (password) => {
  return crypto.createHash("md5").update(password).digest("hex");
}

exports.createAUser = async function (req, res) {
  try {
    const user = await User.findOne({ Username: req.body.Username });
    if (user) {
      return res.json({ message: "Already register." });
    }
    const hashedPassword = hashPassword(req.body.Password);
    const newUser = new User({
      Username: req.body.Username,
      Password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.loginUser = async function (req, res) {
  try {
    const user = await User.findOne({ Username: req.body.Username });
    if (!user) {
      return res.json({ message: "User not found.", login: false });
    }
    const hashedPassword = hashPassword(req.body.Password);
    if (hashedPassword !== user.Password) {
      return res.json({ message: "Invalid password.", login: false });
    }
    res.json({ message: "Login success", login: true });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteAContact = async function (req, res) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    const response = {
      message: "This user has been deleted",
      id: user.Username,
    };
    res.json(response);
  } catch (err) {
    res.status(500).send(err);
  }
};