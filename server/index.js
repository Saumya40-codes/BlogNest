const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "your password",
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

app.post("/api/comments", (req, res) => {
    const commentId = req.body.commentId;
    const comment = req.body.comment;
    const user = req.body.user;
    
    const sqlInsert = "INSERT INTO comments (commentId, comment, `user`) VALUES (?,?,?)";
    db.query(sqlInsert, [commentId, comment, user], (err, result) => {
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
  
app.post("/api/notif", (req, res) => {
    const type = req.body.type;
    const user = req.body.user;
    const host = req.body.host;
    const sqlInsert = "INSERT INTO notifs (type, `user`, `host`) VALUES (?,?, ?)";
    db.query(sqlInsert, [type, user, host], (err, result) => {
        res.send(result);
    });
});

app.get("/api/get/notif",(req,res)=>{
    const sqlInsert = "SELECT * FROM notifs";
    db.query(sqlInsert,(err,result)=>{
        res.send(result)
    })
})


app.post("/api/insert/", (req, res) => {

    const title = req.body.title;
    const body = req.body.body;
    const like = req.body.like;
    const user = req.body.user;

    const sqlInsert = "INSERT INTO blogs (title, body, `like`, `user`) VALUES (?,?,?,?)";
    db.query(sqlInsert, [title, body, like,user], (err, result) => {
        res.send(result);
    });
});

app.get("/api/get/comments", (req, res) => {
    const sqlSelect = "SELECT * FROM comments";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM blogs WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
