import React from 'react'
import { Button, Container } from 'react-bootstrap'

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
          <Button>
            Go To <span>Order History</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CheckOutSuccess