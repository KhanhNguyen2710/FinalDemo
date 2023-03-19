import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import "../show-Product/ShowProduct.css"
import  Ava  from "../../../img/Ava.jpg";
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ShowProduct = () => {

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
    <div className=" show-Product">
      <div>
        {productList.map((product, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.img} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.price}</Card.Text>
              <div className="d-flex gap-3 justify-content-end">
                <Button variant="primary">details</Button>
                <Button variant="primary">Buy</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ShowProduct