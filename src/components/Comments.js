import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
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

  const user = String(currentUser.email).substring(0, 6);

  const getHostName = async (id) => {
      console.log("id", id);
      const response = await Axios.get("http://localhost:5000/api/get");
      setBlogList(response.data);
      const blog = response.data.filter((val) => val.id === Number(id))
      setHost(blog[0].user);
  };
  
  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/comments").then((response) => {
      setComments(response.data);
    });
    getHostName(id);
  }, [], [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:5000/api/comments", {
      commentId: id,
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
        });
      })
      .catch((error) => {
        console.log("Error sending notification:", error);
      });
  };
  

  return (
    <>
      <div className="comments-container">
        <Card className="p-4" style={{ maxWidth: "1000px" }}>
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
                value={body}
              />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit} style={{marginTop:"20px"}}>
              Submit
            </Button>
          </Form>
        </Card>
        <div className="comment-list" style={{marginTop:"20px"}}>
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
      <div dangerouslySetInnerHTML={{ __html: val.comment }}></div>
    </Card>
  ))}

        </div>
      </div>
    </>
  );
};

export default Comments;