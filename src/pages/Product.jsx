import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import ShowProduct from "../components/product/show-Product/ShowProduct";
import SidebarProduct from "../components/product/sideBar-Product/SidebarProduct";

const Product = () => {
  return (
    <Helmet title="product">
      <section>
        <div className="mx-5">
          <Row >
            <Col md="3" lg="3"  >
              <div >
                <SidebarProduct />
              </div>
            </Col>
            {/* ================================================ */}

            <Col md="9" lg="9">
              <div>
                <ShowProduct />
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Helmet>
  );
};

export default Product;
