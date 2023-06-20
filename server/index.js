const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Your password",
    database: "crudreact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM blogs";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.put("/api/like", (req, res) => {
    const blogId = req.body.blogId;
    const sqlUpdate = "UPDATE blogs SET `like` = `like` + 1 WHERE id = ?";
    db.query(sqlUpdate, blogId, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating like count");
      } else {
        res.sendStatus(200);
      }
    });
  });
  

app.post("/api/insert/", (req, res) => {

    const title = req.body.title;
    const body = req.body.body;

    const sqlInsert = "INSERT INTO blogs (title, body) VALUES (?,?)";
    db.query(sqlInsert, [title, body], (err, result) => {
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});