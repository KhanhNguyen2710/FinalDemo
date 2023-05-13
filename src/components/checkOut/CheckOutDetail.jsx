import { doc, getDoc } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { Button, Container, Table } from 'react-bootstrap';

const CheckOutDetail = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    const getData = async () => {
      const document = await getDoc(doc(db, "orders", id));
      if (document.exists()) {
        setOrder({ id: document.id, ...document.data() });
      } else {
        console.log("No such document!");
      }
    };
    getData();
  }, [id]);


  console.log("order", order);
  return (
    <section>
      <Container>
        <div>
          <h2>Order Details</h2>
          <div>
            <Link to="/checkout-history">
              <i class="ri-arrow-left-line"></i> Back To Orders
            </Link>
          </div>
        </div>

        <br />
        {order === null ? (
          <p>Null</p>
        ) : (
          <>
            <p>
              <b>Order ID</b> {order.id}
            </p>
            <p>
              <b>Order Amount</b> ${order.totalAmount}
            </p>
            <p>
              <b>Order Status</b> {order.orderStatus}
            </p>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order.cartProduct.map((cart, index) => {
                  const { id, productName, totalPrice, img, quantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{productName}</b>
                        </p>
                        <img
                          src={img}
                          alt={productName}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{totalPrice}</td>
                      <td>{quantity}</td>
                      <td>{(totalPrice * quantity).toFixed(2)}</td>
                      <td>
                        <Link to={`/productDetail/${id}`}>
                          <Button>Review Product</Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </section>
  );
}

export default CheckOutDetail