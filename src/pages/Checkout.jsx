import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckOutForm from "../components/checkOut/CheckOutForm";
import "../styles/Checkout.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { saveShippingAddress } from "../redux/CheckoutReducer";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Proceed to checkout...");
  const cartProduct = useSelector((state) => state.cart.cartProduct);
  console.log("cartProduct", cartProduct);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const userEmail = useSelector((state) => state.auth.email);
  const shippingAddress = useSelector(saveShippingAddress);

  const description = `CUP'S COFFFE payment: ${userEmail}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartProduct,
        userEmail: userEmail,
        shipping: shippingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
        console.log(error.message);
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const dispatch = useDispatch();

  return (
    <>
      <div style={{marginTop:"80px", paddingTop:"0px"}}>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </div>

      <section>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
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
                                  style={{ width: "120px" }}
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
                                <p className="mb-2 color_text">
                                  {item.quantity}
                                </p>
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
          </Elements>
        )}
      </section>
    </>
  );
};

export default Checkout;
