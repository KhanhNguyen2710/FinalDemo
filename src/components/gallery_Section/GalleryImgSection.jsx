import React from "react";
import { Col, Container, Row } from "reactstrap";
import "../../styles/Home.css";
import MasonryImages from "./MasonryImages";

const GalleryImgSection = () => {
  return (
    <Container>
      <Row>
        <Col lg="12" className="content-Masonry">
          <h5>Image</h5>
          <h2>Lorem ipsum dolor sit amet</h2>
        </Col>
        <Col lg="12">
          <MasonryImages />
        </Col>
      </Row>
    </Container>
  );
};

export default GalleryImgSection;
