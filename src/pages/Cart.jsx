import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Authenticated } from "../redux/AuthReducer";
import { cartActions } from "../redux/CartReducer";

function Cart() {
  // const cartProduct = useSelector((state) => state.cart.CartReducer);
  const cartProduct = useSelector((state) => state.cart.cartProduct);
  console.log("show", cartProduct);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const isLoggin = useSelector(Authenticated);

  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(cartActions.removeProduct(productId));
  };
  return (
    <div className="h-100 gradient-custom">
      <Container className="py-5 h-100">
        {cartProduct.length === 0 ? (
          <div className="text-center ">
            <h2>Cart is Empty!</h2>
          </div>
        ) : (
          <Row className="justify-content-center my-4">
            <Col md="8">
              <MDBCard className="mb-4">
                <MDBTable responsive>
                  <MDBTableHead>
                    <tr>
                      <th>
                        <h4>Shopping Bag</h4>
                      </th>
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
                              style={{ width: "120px" }}
                              alt="Product"
                            />

                            {/* ======================= product Name ======================= */}
                            <div className="flex-column ms-4">
                              <p className="mb-2">{item.productName}</p>
                            </div>
                          </div>
                        </th>
                        {/* ======================= quantity ======================= */}
                        <td className="align-middle">
                          <div class="d-flex flex-row align-items-center">
                            <MDBBtn
                              className="px-2"
                              color="link"
                              onClick={() =>
                                dispatch(cartActions.decreaseQuantity(item.id))
                              }
                            >
                              <MDBIcon fas icon="minus" />
                            </MDBBtn>

                            <MDBInput
                              min={0}
                              type="number"
                              size="sm"
                              style={{ width: "50px" }}
                              value={item.quantity}
                            />
                            <MDBBtn
                              className="px-2"
                              color="link"
                              onClick={() =>
                                dispatch(cartActions.increaseQuantity(item.id))
                              }
                            >
                              <MDBIcon fas icon="plus" />
                            </MDBBtn>
                          </div>
                        </td>
                        {/* ======================= total Price ======================= */}
                        <td className="align-middle">
                          <p className="mb-0" style={{ fontWeight: "500" }}>
                            {item.totalPrice * item.quantity} $
                          </p>
                        </td>

                        <td className="align-middle">
                          <i
                            class="ri-delete-bin-line fs-5"
                            onClick={() => handleDelete(item.id)}
                          ></i>
                        </td>
                      </tr>
                    </MDBTableBody>
                  ))}
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
                      <span>{totalAmount} $ </span>
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
                        <strong>{totalAmount} $ </strong>
                      </span>
                    </MDBListGroupItem>
                  </MDBListGroup>

                  <Link to="/checkout">
                    <MDBBtn block size="lg">
                      Go to checkout
                    </MDBBtn>
                  </Link>
                </MDBCardBody>
              </MDBCard>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Cart;
