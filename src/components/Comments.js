import { useAuth } from "../contexts/AuthContext";
import { Form, Button } from "react-bootstrap";
import { Card } from "@mui/material";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Axios from "axios";

const Comments = ({ id }) => {
  const [body, setBody] = useState("");
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [host, setHost] = useState("");
  const [edit, setEdit] = useState([]);
  const [editedComment, setEditedComment] = useState({}); // New state to track edited comments
  const user = String(currentUser.email).substring(0, 6);

  const getHostName = async (id) => {
    console.log("id", id);
    const response = await Axios.get("http://localhost:5000/api/get");
    setBlogList(response.data);
    const blog = response.data.filter((val) => val.id === Number(id));
    setHost(blog[0].user);
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/comments").then((response) => {
      setComments(response.data);
      setEdit(Array(response.data.length).fill(false)); // Initialize edit state array
    });
    getHostName(id);
  }, [id]);

  const handleSubmit = async (e, commentId) => {
    e.preventDefault();
    await Axios.post("http://localhost:5000/api/comments", {
      commentId: commentId,
      comment: body,
      user: user,
    });

    Axios.post("http://localhost:5000/api/notif", {
      type: "comment",
      user: String(currentUser.email).substring(0, 6),
      host: host,
    })
      .then(() => {
        setBody("");
        Axios.get("http://localhost:5000/api/get/comments").then((response) => {
          setComments(response.data);
          setEdit(Array(response.data.length).fill(false)); // Reset edit state array
        });
      })
      .catch((error) => {
        console.log("Error sending notification:", error);
      });
  };

  const handleEditSubmit = async (e, commentId) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/api/update/comments", {
      id: commentId,
      comment: editedComment[commentId],
      edited: "Yes",
    })
      .then(() => {
        setBody("");
        Axios.get("http://localhost:5000/api/get/comments").then((response) => {
          setComments(response.data);
          setEdit(Array(response.data.length).fill(false)); // Reset edit state array
        });
      });
  };

  const handleEdit = (index, commentId) => {
    const newEditState = [...edit];
    newEditState[index] = !newEditState[index];
    setEdit(newEditState);
    if (newEditState[index]) {
      const comment = comments.find((c) => c.id === commentId);
      setEditedComment((prevEditedComment) => ({
        ...prevEditedComment,
        [commentId]: comment.comment,
      }));
    }
  };

  const handleEditChange = (value, commentId) => {
    setEditedComment((prevEditedComment) => ({
      ...prevEditedComment,
      [commentId]: value,
    }));
  };

  const deleteComment = (id) => {
    Axios.delete(`http://localhost:5000/api/delete/comments/${id}`).then(
      () => {
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  return (
    <>
      <div className="comments-container">
        <Card className="p-4" style={{ maxWidth: "1000px", border: "none" }}>
          <h2 className="text-center mb-4">Comments</h2>
          <div className="comment-user">
            <i className="fa fa-user-circle" aria-hidden="true"></i>
            {String(currentUser.email).substring(0, 6)}
          </div>
          <Form>
            <Form.Group controlId="body">
              <ReactQuill
                className="comment-input"
                type="textarea"
                onChange={(e) => {
                  setBody(e);
                }}
                placeholder="Enter your comment here..."
              />
            </Form.Group>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e, id)}
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Form>
        </Card>
        <div className="comment-list" style={{ marginTop: "20px" }}>
          {comments
            .filter((val) => val?.commentId === id)
            .map((val, index) => (
              <Card
                className="comment-card"
                key={val.commentId + "-" + index} // Unique key combining comment ID and index
                style={{ padding: "20px" }}
              >
                <div className="comment-user">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  {val.user}
                </div>
                {val.edited  == 'Yes'?
                <p style={{fontSize:"10px"}}>(edited)</p>: null}
                {edit[index] ? (
                  <Form onSubmit={(e) => handleEditSubmit(e, val.id)}>
                    <Form.Group controlId="body">
                      <ReactQuill
                        type="textarea"
                        onChange={(value) => handleEditChange(value, val.id)}
                        value={editedComment[val.id] || ""}
                      />
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                  </Form>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: val.comment }}></div>
                )}
              {val.user == user?
              (<div>
                <Button
                  variant="danger"
                  onClick={() => deleteComment(val.id)}
                  style={{ marginTop: "20px", marginRight: "20px" }}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  style={{ marginTop: "20px" }}
                  onClick={() => handleEdit(index, val.id)}
                >
                  Edit
                </Button> </div>):null
              }
              </Card>
            ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
