import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import { db } from '../../firebase';
import "../managerProduct/ManagerProduct.css"

const ManagerProduct = () => {
  const [productList, setProductList] = useState([]);
  
 useEffect(() => {
   const getData = async () => {
     let data = [];
     const querySnapshot = await getDocs(collection(db, "product"));
     querySnapshot.forEach((doc) => {
       data.push({ id: doc.id, ...doc.data() });
       console.log(doc.id, " => ", doc.data());
     });
     setProductList(data);
   };
   getData();
 }, []);

  return (
    <Container>
      <div>
        <p>add Product</p>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((item, index) => (
              <tr key={index}>
                <td></td>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.img} alt="" style={{ width: "100px" }} />
                </td>
                <td>
                  <div className="d-flex gap-5 " style={{ width: "30px" }}>
                    <i class="fa fa-trash fs-5"></i>
                    <i class="fa fa-pencil fs-5"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ManagerProduct