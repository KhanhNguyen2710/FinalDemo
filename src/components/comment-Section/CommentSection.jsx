import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../../styles/Home.css";
import CommentSectionDetail from "./CommentSectionDetail";

const CommentSection = () => {
  return (
    <Container>
      <Row>
        <Col lg="12">
          <h2 className="">Lorem ipsum dolor sit amet....</h2>
        </Col>
        <Col lg="12">
          <CommentSectionDetail />
        </Col>
      </Row>
    </Container>
  );
};

export default CommentSection;
