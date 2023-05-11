import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/Checkout.css"
import { MDBBtn, MDBInput, MDBListGroupItem, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/CartReducer";
import CheckOutForm from "../components/checkOut/CheckOutForm";


const Checkout = () => {


  const cartProduct = useSelector((state) => state.cart.cartProduct);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();
  
  return (
    <section>
      <Container className="checkOut_page">
      
        <Row>
          <Col className="checkOut_Col" lg="6" md="6" xl="6">
            <div className="check_product">
              <MDBTable responsive>
                <MDBTableHead style={{ color: "white" }}>
                  <tr>
                    <th></th>
                    <th>
                      <h6>Quantity</h6>
                    </th>
                    <th>
                      <h6>Price</h6>
                    </th>
                  </tr>
                </MDBTableHead>

                {cartProduct.map((item) => (
                  <MDBTableBody>
                    <tr key={item.id}>
                      {/* ========================= image=============================== */}
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.img}
                            fluid
                            className="rounded-3"
                            style={{ width: "120px", }}
                            alt="Product"
                          />

                          {/* ======================= product Name ======================= */}
                          <div className="flex-column ms-4">
                            <p className="mb-2 color_text">
                              {item.productName}
                            </p>
                          </div>
                        </div>
                      </th>
                      {/* ======================= quantity ======================= */}
                      <td className="align-middle">
                        <div class="d-flex flex-row align-items-center">
                          <p className="mb-2 color_text">{item.quantity}</p>
                        </div>
                      </td>
                      {/* ======================= total Price ======================= */}
                      <td className="align-middle">
                        <p className="mb-0 color_text">
                          {item.totalPrice * item.quantity} $
                        </p>
                      </td>
                    </tr>
                    <tr></tr>
                  </MDBTableBody>
                ))}
              </MDBTable>
              <div className="d-flex justify-content-between align-items-center border-0 p-3 mb-3">
                <div>
                  <h4>Total :</h4>
                </div>
                <span>
                  <h5>{totalAmount} $ </h5>
                </span>
              </div>
            </div>
          </Col>

          <Col className="" lg="6" md="6" xl="6">
            <CheckOutForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
