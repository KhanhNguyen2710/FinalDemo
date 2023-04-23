import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import CommentSection from "../components/comment-Section/CommentSection";
import GalleryImgSection from "../components/gallery_Section/GalleryImgSection";
import Helmet from "../components/Helmet/Helmet.js";
import contentImg from "../img/coffeeContent.png";
import "../styles/Home.css";

const Home = () => {
  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="coffee_content">
                <h5 className="mb-3">Simply make good coffee </h5>
                <h1 className="mb-4 content_title">
                  <span>RECIPE?</span> just see me <span> do it</span>
                </h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates deleniti, a rem excepturi facilis labore
                  consequatur sequi tempore temporibus tenetur debitis libero,
                  ipsum atque exercitationem ducimus quas at facere nihil!
                </p>
                <div className="content_btn d-flex align-items-center gap-5">
                  <Link to="/Recipe">
                    <button
                      className="start_btn d-flex align-items-center
                  justify-content-between"
                    >
                      See recipe
                      <i class="ri-arrow-right-s-line"></i>
                      {/* Start now <i class="ri-arrow-right-s-line"></i> */}
                    </button>
                  </Link>
                  {/* <button className="all-recipe-btn ">
                    <Link to="/Recipe">
                      See recipe <i class="ri-arrow-right-s-line"></i>
                    </Link>
                  </button> */}
                </div>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="coffee_img">
                <img
                  src={contentImg}
                  alt="contentImg"
                  style={{ height: 550, width: 700 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ===================Gallery=================== */}

      <section>
        <GalleryImgSection />
      </section>
      {/* ===================Comment=================== */}

      <section>
        <CommentSection />
      </section>
    </Helmet>
  );
};

export default Home;
