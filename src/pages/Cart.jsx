import { MDBBtn, MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBListGroup, MDBListGroupItem, MDBRadio, MDBRipple, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBTooltip, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Ava from "../img/Ava.jpg"


function Cart() {

  // const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <section className="h-100 gradient-custom">
      <Container className="py-5 h-100">
        <Row className="justify-content-center my-4">
          <Col md="8">
            <MDBCard className="mb-4">
              <MDBTable responsive>
                <MDBTableHead>
                  <tr>
                    <th scope="col">
                      <h4>Shopping Bag</h4>
                    </th>
                    {/* <th scope="col">Format</th> */}
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <th scope="row">
                      <div className="d-flex align-items-center">
                        <img
                          src={Ava}
                          fluid
                          className="rounded-3"
                          style={{ width: "120px" }}
                          alt="Book"
                        />
                        <div className="flex-column ms-4">
                          <p className="mb-2">chó shiba</p>
                        </div>
                      </div>
                    </th>
                    {/* <td className="align-middle">
                      <p className="mb-0" style={{ fontWeight: "500" }}>
                        Digital
                      </p>
                    </td> */}
                    <td className="align-middle">
                      <div class="d-flex flex-row align-items-center">
                        <MDBBtn className="px-2" color="link">
                          <MDBIcon fas icon="minus" />
                        </MDBBtn>

                        <MDBInput
                          min={0}
                          type="number"
                          size="sm"
                          style={{ width: "50px" }}
                          defaultValue={1}
                        />
                        <MDBBtn className="px-2" color="link">
                          <MDBIcon fas icon="plus" />
                        </MDBBtn>
                      </div>
                    </td>
                    <td className="align-middle">
                      <p className="mb-0" style={{ fontWeight: "500" }}>
                        $1
                      </p>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCard>
          </Col>

          {/* ======================= Summary =======================*/}
          <Col md="4">
            <MDBCard className="mb-4">
              <MDBCardHeader>
                <h4> Summary </h4>
              </MDBCardHeader>
              {/* ======================= Count =======================*/}
              <MDBCardBody>
                <MDBListGroup flush>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Subtotal
                    <span>$1</span>
                  </MDBListGroupItem>
                  <hr className="my-4" />
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>$1</strong>
                    </span>
                  </MDBListGroupItem>
                </MDBListGroup>
                <MDBBtn block size="lg">
                  Go to checkout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>

          
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Cart;
