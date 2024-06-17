const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/users");
const { create } = require("domain");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/users", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("users", { users: allUsers });
});
app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;
  let createdUser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/users");
});
app.get("/delete/:id", async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/users");
});
app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user: user });
});
app.post("/update/:id", async (req, res) => {
  let { image, name, email } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { image, name, email },
    { new: true }
  );
  res.redirect("/users");
});
app.listen(3000);
