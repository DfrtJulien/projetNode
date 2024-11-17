const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "admin",
      description: "Un blog simple crée avec NodeJs et MongoDb.",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Nom ou mot de passe non valide" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Nom ou mot de passe non valide" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

// router.post("/admin", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     res.render("admin/index", { locals, layout: adminLayout });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "Utilisateur créer", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "Utilisateur déjà existant" });
      }
      res.status(500).json({ message: "Problème de serveur" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/dashboard", async (req, res) => {
  res.render("admin/dashboard");
});

module.exports = router;
