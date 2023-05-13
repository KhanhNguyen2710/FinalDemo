import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

const ManagerOrder = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from Firestore and update the state
      const orderList = collection(db, "orders");
      let u = orderList;

      const querySnapshot = await getDocs(u);
      const data = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...doc.data(),
      }));
      setOrder(data);
    };
    fetchData();
  }, []);

  return (
    <section>
      <div>
        <h3>Manager Order</h3>
      </div>
      <Table striped bordered hover>
        <thead className="thead">
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Order Amount</th>
            <th style={{ width: 200 }}>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="tbody">
          {order.map((order, index) => (
            <tr
              // key={startIndex + index}
              key={order.orderId}
            >
              <td>{index + 1}</td>
              <td>{order.orderId}</td>
              <td>
                {order.createDate} at {order.createTime}
              </td>
              <td>${order.totalAmount}</td>
              <td style={{ cursor: "pointer" }}>{order.orderStatus}</td>
              <td className="action">
                <span>
                  <i className="ri-eye-line"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default ManagerOrder;
