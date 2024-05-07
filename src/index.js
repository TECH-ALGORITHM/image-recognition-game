const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/logout", (req, res) => {
  res.render("login");
});
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };
  const existinguser = await collection.findOne({ name: data.name });
  if (existinguser) {
    res.send("please try different username");
  } else {
    const saltround = 10;
    const hashedpassword = await bcrypt.hash(data.password, saltround);
    data.password = hashedpassword;
    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.render("login");
  }
});
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    // if (!check) {
    //   res.send("username not found");
    //   res.render("login");
    // }
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("app");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.render("login");
  }
});
const port = 7000;

app.listen(port,'image-recognition-game-ambuj.onrender.com', () => {
  console.log(`Server running on port ${port}`);
});
