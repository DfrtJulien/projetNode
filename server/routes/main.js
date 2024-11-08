const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  const locals = {
    title: "NodeJs blog",
    description: "Un blog simple crée avec NodeJs et MongoDb.",
  };
  res.render("index", locals);
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
