import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const CheckOutSuccess = () => {
  return (
    <section>
      <Container>
        <div className="text-center ">
          <h2>Thank you for your order!</h2>
          <p>
            We appreciate your business and look forward to serving you again in
            the future.
          </p>
          <Link to="/checkout-history">
            <Button>
              Go To Order History
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default CheckOutSuccess