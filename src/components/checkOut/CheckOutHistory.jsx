import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { AuthUid } from "../../redux/AuthReducer";
import { selectHistoryOrder, storeOrder } from "../../redux/OrderReducer";

const CheckOutHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const historyOrder = useSelector(selectHistoryOrder);
  const userId = useSelector(AuthUid);
  useEffect(() => {
    const fetch = async () => {
      const listOrder = collection(db, "orders");
      const q = query(listOrder, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        orderId: doc.id,
        ...doc.data(),
      }));
      console.log("orderdata:", data);
      dispatch(storeOrder(data));
    };
    fetch();
  }, []);


  const handleClick = (orderId) => {
    navigate(`/checkout-detail/${orderId}`);
  };

  return (
    <section>
      <Container>
        <div className="text-center ">
          <h2>Your Order History</h2>
        </div>
        <br />
        <>
          {historyOrder.length === 0 ? (
            <p>No order found</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order Id</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {historyOrder.map((order, index) => {
                  const { orderId, createDate, createTime, totalAmount, orderStatus } =
                    order;

                  return (
                    <tr key={orderId} onClick={() => handleClick(orderId)}>
                      <td>{index + 1}</td>
                      <td>{orderId}</td>
                      <td>
                        {createDate} at {createTime}
                      </td>
                      <td>${totalAmount}</td>
                      <td>{orderStatus}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </>
      </Container>
    </section>
  );
};

export default CheckOutHistory;
