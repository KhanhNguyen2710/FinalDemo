import { doc, getDoc } from "firebase/firestore";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Input } from "reactstrap";
import { db } from "../../firebase";
import "../productDetail/InfoProduct.css";

const InfoProduct = () => {
  // const [product, setProduct] = useState(null)
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const document = await getDoc(doc(db, "product", id));
      if (document.exists()) {
        setProduct({ id: document.id, ...document.data() });
      } else {
        console.log("No such document!");
      }
    };
    getProduct();
  }, [id]);

  return (
    <div>
      {product && (
        <section style={{ margin: "0px 200px" }}>
          <Container>
            <Row>
              <Col className="md-6">
                {" "}
                <img
                  className="imgInfo"
                  src={product.img}
                  alt="contentImg"
                  style={{
                    maxHeight: "500px",
                    width: "500px",
                    borderRadius: "15px",
                    border: "5px solid #BC6C25B5",
                  }}
                />
              </Col>

              <Col className="md-6">
                <h1 className=" mb-4">{product.productName}</h1>
                <h5 className="mb-4">${product.price}</h5>
                {/* <p className="mb-4">
              hihihihi
            </p> */}
                <div className="mb-5 d-flex gap-3 ">
                  <label className="">Quantity:</label>
                  <div className="d-flex gap-1">
                    <button className="btn-quantity px-3">
                      <MDBIcon fas icon="minus" />
                    </button>
                    <Input
                      min={0}
                      type="number"
                      size="sm"
                      style={{ width: "50px" }}
                      defaultValue={1}
                    />
                    <button className="btn-quantity px-3" color="link">
                      <MDBIcon fas icon="plus" />
                    </button>
                  </div>
                </div>
                <Button>Add to Cart</Button>
              </Col>
            </Row>
          </Container>
          {/* ======== Tag INFO ======== */}
          <Container className="mt-5">
            <Tabs
              defaultActiveKey="description"
              className="product-tabs"
              // variant="dark"
            >
              <Tab
                className="tab "
                eventKey="product-details"
                title="Product details"
              >
                <p>{product.describe}</p>
              </Tab>
              <Tab className="tab" eventKey="reviews" title="Reviews">
                <p>No reviews yet.</p>
              </Tab>
              <Tab
                className="tab"
                eventKey="specifications"
                title="Specifications"
              >
                <ul>
                  <li>Weight: 2 lbs</li>
                  <li>Dimensions: 10 x 6 x 4 in</li>
                  <li>Material: Plastic</li>
                </ul>
              </Tab>
            </Tabs>
          </Container>
        </section>
      )}
    </div>
  );
};

export default InfoProduct;
