import { TextareaAutosize } from "@mui/material";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { db } from "../../../firebase";
import { toast } from "react-toastify";

const BlogComments = ({ id, ...props }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newComment = e.target.comment.value;
  //   setComments([...comments, newComment]);
  //   e.target.comment.value = "";
  // };

  // Load comments from Firestore on mount
  useEffect(() => {
    const commentsRef = collection(db, "comments");
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const comments = snapshot.docs
        .filter((doc) => doc.data().postId === id) // only show comments for the current post
        .map((doc) => ({ id: doc.id, ...doc.data() }));
      setComments(comments);
    });
    return () => unsubscribe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment = { id, text: newComment };
    try {
      const docRef = await addDoc(collection(db, "comments"), comment);
      setNewComment("");
      console.log("Comment added with ID: ", docRef.id);
      toast.success("Comment added successfully")
    } catch (error) {
      console.error("Error adding comment: ", error.message);
    }
  };

  return (
    <div>
      <h4>Comments</h4>

      <Form onSubmit={handleSubmit}>
        <label>Add a comment:</label>
        <Row>
          <Col xs={9}>
            <TextareaAutosize
              className="form-control"
              id="comment"
              rows="auto"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)} 
            ></TextareaAutosize>
          </Col>
          <Col xs={3}>
            <Button type="submit">
              <i class="fa fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </Form>
      {/* <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul> */}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogComments;
