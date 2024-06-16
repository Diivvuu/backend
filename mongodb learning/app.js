const express = require("express");
const app = express();

const usermodel = require("./usermodel");
app.get("/", (req, res) => {
  res.send("hey");
});
// CRUD concep (create, read, update, delete)
app.get("/create", async (req, res) => {
  let newuser = await usermodel.create({
    name: "noob khushi",
    email: "khushi9@gmail.com",
    username: "khxxy",
    age: 22,
  });
  res.send(newuser);
});

app.get("/update", async (req, res) => {
  let updatedUser = await usermodel.findOneAndUpdate(
    { username: "d1vu" },
    { username: "divu" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/read", async (req, res) => {
  let users = await usermodel.find();
  res.send(users);
});

app.get("/delete", async (req, res) => {
  let users = await usermodel.findOneAndDelete({ name: "noob khushi" });
  res.send(users);
});

app.listen(3000);
