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

  const user = String(currentUser.email).substring(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:5000/api/comments", {
        commentId: id,
        comment: body,
        user: user,
      });
      const response = await Axios.get("http://localhost:5000/api/get/comments");
      setComments(response.data);
      setBody("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/comments").then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <>
      <div className="comments-container" style={{ position: "fixed", top: "20px", right: "200px", zIndex: "999"}}>
        <Card className="p-4" style={{ maxWidth: "400px" }}>
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
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Card>
        <div className="comment-list">
          {comments
            .filter((val) => val?.commentId === id)
            .map((val) => (
              <Card className="comment-card" key={val.commentId} style={{ padding: "20px" }}>
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
