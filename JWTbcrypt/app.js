const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");

const app = express();
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      // Store hash in your password DB.
      let newUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      res.send(newUser);
    });
  });
});
app.listen(3000);
