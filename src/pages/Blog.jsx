import React from "react";
import Helmet from "../components/Helmet/Helmet";
import BlogShow from "../components/blog/block-show-img/BlogShow";
import BlogAdd from "../components/blog/blogAdd/BlogAdd";
import "../styles/Blog.css";
import UserOnly from "../User/userOnly/UserOnly";

const Blog = () => {
  return (
    <Helmet title="Blog">
      <div style={{ marginTop: "140px" }}>
      <UserOnly>
          <BlogAdd />
      </UserOnly>
        </div>

      {/* ===== SHOW ===== */}
      <section>
        <BlogShow />
      </section>
    </Helmet>
  );
};

export default Blog;
