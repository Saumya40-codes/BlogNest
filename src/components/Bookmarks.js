import React from 'react';
import { Card, CardContent } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
import { Tooltip } from '@mui/material';
import { BookmarkAddRounded } from '@mui/icons-material';
import { BookmarkAdded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const Bookmarks = () => {
  const { currentUser } = useAuth();
  const [blogList, setBlogList] = useState([]);
  const [commentCounts, setCommentCounts] = useState({});
  const [showCopyDialog, setShowCopyDialog] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get").then((response) => {
      setBlogList(response.data);
    });
  }, []);

  useEffect(() => {
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

  const handleBookmarkClick = (blogId) => {
    Axios.put("http://localhost:5000/api/bookmark/", { blogId: blogId }).then((response) => {
      setBlogList((prevBlogList) => {
        return prevBlogList.map((val) => {
          if (val.id === blogId) {
            const updatedVal = {
              ...val,
              hasbookmark: val.hasbookmark === "Yes" ? "No" : "Yes",
            };
            return updatedVal;
          }
          return val;
        });
      });
    });
  };

  const handleShareClick = (blogId) => {
    const blogLink = `${window.location.origin}/blog/${blogId}`;
    navigator.clipboard
      .writeText(blogLink)
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

  return (
    <div>
      {showCopyDialog && (
        <Alert variant="success" style={{ top: "0px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          Link copied to clipboard!
        </Alert>
      )}
      <div className="text-center mb-4">
        <h1>Bookmarks</h1>
      </div>
      <div>
        <Card>
          <CardContent>
          <Grid container spacing={2}>
  {blogList.length ? (
    blogList.map((val) => (
      val.hasbookmark === "Yes" && (
        <Grid item xs={12} key={val.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component={Link} to={`blog/${val.id}`} style={{ textDecoration: "none", color: "blueviolet" }}>
                {val.title}
              </Typography>
              <Typography variant="body1">
                <div dangerouslySetInnerHTML={{ __html: val.body.length > 200 ? `${val.body.substring(0, 200)}....` : val.body }}></div>
                {val.body.length > 200 && <Link to={`blog/${val.id}`}>Read More</Link>}
              </Typography>
              {val.tags &&
                val.tags.split(",").map((tag) => (
                  <Chip label={tag} style={{ marginRight: "5px", marginTop: "5px" }} />
                ))}
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
                <IconButton aria-label="bookmark">
                  <Tooltip title="Bookmark">
                    {val.hasbookmark === "Yes" ? (
                      <BookmarkAdded onClick={() => handleBookmarkClick(val.id)} />
                    ) : (
                      <BookmarkAddRounded onClick={() => handleBookmarkClick(val.id)} />
                    )}
                  </Tooltip>
                </IconButton>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    ))
  ) : (
    <div>
      <h1>No Bookmarks</h1>
    </div>
  )}
</Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bookmarks;
