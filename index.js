const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});
app.get("/confirm", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "confirm.html"));
});
app.get("/recommend", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "recommend.html"));
});
app.post("/recommend", (req, res) => {
  const { name, address, cuisine, website, description } = req.body;
  const filePath = path.join(__dirname, "data.json");
  const data = JSON.parse(fs.readFileSync(filePath));
  data.push({
    name: name,
    address: address,
    cuisine: cuisine,
    website: website,
    description: description,
  });
  fs.writeFileSync(filePath, JSON.stringify(data));
  res.redirect("/confirm");
});
app.get("/restaurants", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "restaurants.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
