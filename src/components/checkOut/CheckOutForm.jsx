import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { clearCart } from "../../redux/CartReducer";
import { saveShippingAddress } from "../../redux/CheckoutReducer";
import "../checkOut/CheckOutForm.css";

const initialShippingAddress = {
  name: "",
  address: "",
  phone: "",
  shipping: "",
};

const CheckOutForm = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialShippingAddress,
  });

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const userId = useSelector((state) => state.auth.uid);
  const userEmail = useSelector((state) => state.auth.email);
  const cartProduct = useSelector((state) => state.cart.cartProduct);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const selectShipping = useSelector((state) => state.checkout.shippingAddress);
  // console.log("checkout", selectShipping);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const paymentElementOptions = {
    layout: "tabs",
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    console.log(shippingAddress);
    dispatch(saveShippingAddress(shippingAddress));

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            // saveOrder();
            saveOderHistory();
            // navigate("/checkout-success");
          }
        }
      });
    setIsLoading(false);
  };

  // save history
  const saveOderHistory = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      cartProduct,
      createDate: date,
      createTime: time,
      totalAmount: totalAmount,
      orderStatus: "order placed. . . ",
      selectShipping,
      createAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(clearCart());
      toast.success(" Save successfully");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="pay_form">
      {/* ============= Input ============= */}
      <div className="divider d-flex align-items-center my-4">
        <h5 className="text-center fw-bold mx-3 mb-0">Shipping Information</h5>
      </div>
      <Form onSubmit={handleSubmit}>
        <MDBInput
          className="Input mb-4"
          label="User name"
          type="text"
          size="lg"
          name="name"
          value={shippingAddress.name}
          onChange={(e) => handleShipping(e)}
          required
        />

        <MDBInput
          className="Input mb-4"
          label="Phone"
          type="number" //
          size="lg"
          min="0"
          name="phone"
          value={shippingAddress.phone}
          onChange={(e) => handleShipping(e)}
          required
        />

        <MDBInput
          className="Input mb-4"
          label="Address"
          type="text" //
          size="lg"
          name="address"
          value={shippingAddress.address}
          onChange={(e) => handleShipping(e)}
          required
        />

        <div className="mb-4 pb-2">
          <Form.Label>Shipping Method</Form.Label>
          <select
            className="select p-2 rounded bg-grey"
            style={{ width: "100%" }}
            name="shipping"
            value={shippingAddress.shipping}
            onChange={(e) => handleShipping(e)}
          >
            <option disabled value="">
              Select shipping method
            </option>
            <option value="free">Free ship- 0.00$ </option>
            <option value="standard">Standard- 5.00$</option>
          </select>
        </div>
        <hr />
        <PaymentElement options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <img alt="Loading..." style={{ width: "20px" }} />
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div>{message}</div>}

        <div className="submit text-md-start mt-4 pt-2  ">
          <MDBBtn type="submit" className="submit-btn mb-0 px-5" size="lg">
            Pay
          </MDBBtn>
        </div>
      </Form>
    </Container>
  );
};

export default CheckOutForm;
