const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");


require('dotenv').config();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
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

app.put("/api/edit", (req, res) => {
    const id = req.body.id;
    const body = req.body.body;
    const sqlUpdate = "UPDATE blogs SET body = ? WHERE id = ?";
    db.query(sqlUpdate, [body, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating blog");
        } else {
            res.sendStatus(200);
        }
    });
});

app.put("/api/bookmark", (req, res) => {
    const blogId = req.body.blogId;
    const sqlUpdate = "UPDATE blogs SET hasbookmark = IF(hasbookmark = 'Yes', 'No', 'Yes') WHERE id = ?";
    db.query(sqlUpdate, blogId, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating bookmark");
        } else {
            res.sendStatus(200);
        }
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

app.delete("/api/delete/notif/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM notifs WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        res.send(result);
    });
});

app.put("/api/update/comments", (req, res) => {
    const id = req.body.id;
    const comment = req.body.comment;
    const edited = req.body.edited;
    const sqlUpdate = "UPDATE comments SET comment = ?, edited = ? WHERE id = ?";
    db.query(sqlUpdate, [comment, edited, id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating comment");
      } else {
        res.sendStatus(200);
      }
    });
  });
  

app.delete("/api/delete/comments/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM comments WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        res.send(result);
    });
});


app.post("/api/insert/", (req, res) => {

    const title = req.body.title;
    const body = req.body.body;
    const like = req.body.like;
    const user = req.body.user;
    const tags = req.body.tags;

    const sqlInsert = "INSERT INTO blogs (title, body, `like`, `user`, tags) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [title, body, like,user, tags], (err, result) => {
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
