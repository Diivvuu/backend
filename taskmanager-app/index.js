const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  fs.readdir("./files", function (err, files) {
    res.render("index", { files: files });
  });
});
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body["task-title"].split(" ").join("")}.txt`,
    req.body["task-text"],
    function (err) {
      res.redirect("/");
    }
  );
  // console.log(req.body["task-title"]);
});
app.get("/file/:filename", function (req, res) {
  const name = req.params.filename;
  fs.readFile(`./files/${name}`, "utf-8", function (err, filedata) {
    res.render("show", { filename: name, filedata: filedata });
  });
  // console.log(req.params.filename);
});
app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});
app.post("/edit", function (req, res) {
  // console.log(req.body);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      res.redirect("/");
    }
  );
});
app.listen(3000, function () {
  console.log("its working");
});
