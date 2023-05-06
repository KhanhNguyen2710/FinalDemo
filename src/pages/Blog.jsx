import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import BlogShow from "../components/blog/block-show-img/BlogShow";
import Helmet from "../components/Helmet/Helmet";
import { db, storage } from "../firebase";
import "../styles/Blog.css";
import BlogAdd from "../components/blog/blogAdd/BlogAdd";
import UserOnly from "../components/userOnly/UserOnly";

const Blog = () => {

  return (
    <Helmet title="Blog">
      <UserOnly>
        <div style={{ marginTop: "140px" }}>
          <BlogAdd />
        </div>
      </UserOnly>

      {/* ===== SHOW ===== */}
      <section>
        <BlogShow />
      </section>
    </Helmet>
  );
};

export default Blog;
