import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewBlog from "./NewBlog";
import Axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Grid, Card, CardContent, Typography, Button, IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { FaBell } from "react-icons/fa";
import ShareIcon from '@mui/icons-material/Share';
import Tooltip from '@mui/material/Tooltip';
import YourBlog from "./YourBlog";
import Notifications from "./Notifications";

export default function Dashboard() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [blogList, setBlogList] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const theme = createTheme({
    palette: {
      mode: "dark", // Apply dark mode
      primary: {
        main: "#2196f3", // Set the primary color
      },
      // Add other color customizations
      // ...
    },
  });

  const logoutButtonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    background: "#f8f9fa",
    border: "none",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  };

  const handleShareClick = (blogId) => {
    const blogLink = `${window.location.origin}/blog/${blogId}`;
    navigator.clipboard.writeText(blogLink)
      .then(() => {
        setShowCopyDialog(true);
        setTimeout(() => {
          setShowCopyDialog(false);
        }, 2000);
      })
      .catch((error) => {
        console.log("Error copying link to clipboard:", error);
      });
  };
  
  function handleLogout() {
    setError("");
    navigate("/login");
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setBlogList(response.data);
    });

  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/comments").then((response) => {
      const counts = {};
      response.data.forEach((comment) => {
        if (!counts[comment.commentId]) {
          counts[comment.commentId] = 1;
        } else {
          counts[comment.commentId]++;
        }
      });
      setCommentCounts(counts);
    });
  }, []);

  const handleLikeClick = (blogId, name) => {
    Axios.put("http://localhost:5000/api/like/", { blogId: blogId }).then((response) => {
      setBlogList(
        blogList.map((val) => {
          return val.id === blogId
            ? {
                ...val,
                like: val.like + 1,
              }
            : val;
        })
      );
  
      Axios.post("http://localhost:5000/api/notif", {
        type: "like",
        user: String(currentUser.email).substring(0, 6),
        host: name,
      }).catch((error) => {
        console.log("Error sending notification:", error);
      });
    });
};
  
  const trending = blogList.sort((a, b) => {
    return b.like - a.like;
  });

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const host = String(currentUser).substring(0,6);
  return (
    <ThemeProvider theme={theme}>
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {showCopyDialog && (
          <Alert variant="success" style={{ top: "0px", display:"flex", justifyContent:"center", alignItems:"center"}}>
            Link copied to clipboard!
          </Alert>
        )}
        <Grid container spacing={2} justifyContent="flex-end" sx={{ marginBottom: "20px", marginRight:"20px" }}>
          <Grid item>
          <Link to="/write-blog" style={{ textDecoration: "none" }}>
              <NewBlog />
          </Link>
          <Button variant="contained" style={{marginRight:"20px"}}  onClick={handleNotificationClick}>
            Notifications <FaBell  />
            </Button>
            {showNotification && (
              <Alert variant="success" style={{ position: "absolute", top: "50px", right: "120px", zIndex: 999 }}>
              <Notifications handleClose={handleNotificationClick} host={host} />
              </Alert>
            )}
            <Button variant="contained" component={Link} to="/update-profile">
              Update Profile
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            {/* Replace the YourBlog component with Material-UI Card */}
            <Card>
              <CardContent>
                <YourBlog />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            {/* Replace the trending blog list with Material-UI Grid */}
            <Card>
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  Trending Blogs
                </Typography>
                <Grid container spacing={2}>
                  {blogList?.map((val) => (
                    <Grid item xs={12} key={val.id}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" component={Link} to={`blog/${val.id}`}>
                            {val.title}
                          </Typography>
                          <Typography variant="body1">
                            <div dangerouslySetInnerHTML={{ __html: val.body.length > 100 ? `${val.body.substring(0, 100)}....` : val.body }}></div>
                            {val.body.length > 100 && <Link to={`blog/${val.id}`}>Read More</Link>}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton aria-label="like" onClick={() => handleLikeClick(val.id, val.user)}>
                          <ThumbUpIcon />
                          </IconButton>
                          {val.like || 0}
                          <IconButton aria-label="comment">
                          <CommentIcon />
                         </IconButton>
                         {commentCounts[val.id] || 0}
                         <IconButton aria-label="share" onClick={() => handleShareClick(val.id)}>
                        <Tooltip title="Share">
                           <ShareIcon />
                        </Tooltip>
                        </IconButton>
                         </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleLogout} sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
          Log Out
        </Button>
      </div>
    </ThemeProvider>
  );
}
