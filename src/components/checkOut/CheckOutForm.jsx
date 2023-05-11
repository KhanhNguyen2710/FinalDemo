import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import "../checkOut/CheckOutForm.css";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../../redux/CheckoutReducer";


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

  const dispatch = useDispatch();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(shippingAddress);
    dispatch(saveShippingAddress(shippingAddress))
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
