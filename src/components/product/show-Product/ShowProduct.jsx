import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { db } from "../../../firebase";
import "../show-Product/ShowProduct.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../../redux/CartReducer";

const ShowProduct = () => {
  const [productList, setProductList] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

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
 const cartProduct = useSelector((state) => state.cart.cartProduct);
  console.log("cartProduct", cartProduct);
  
  const dispatch = useDispatch();
    
  return (
    <div className=" show-Product gap-3">
      {productList.map((product, index) => (
        <Card className="product-item" style={{ width: "15rem" }}>
          <Card.Img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            variant="top"
            src={product.img}
          />
          <Card.Body className="product-item-body">
            <Link
              to={`/productDetail/${product.id}`}
              state={{ product }}
              key={index}
            >
              <h4>{product.productName}</h4>
            </Link>
            <Card.Text> {product.price + "$"}</Card.Text>
            <Button
              onClick={() =>
                dispatch(
                  cartActions.addProduct({
                    id: product.id,
                    productName: product.productName,
                    img: product.img,
                    price: product.price,
                  })
                )
              }
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
export default ShowProduct;
