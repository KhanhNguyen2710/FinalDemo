import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import "../show-Product/ShowProduct.css"
import  Ava  from "../../../img/Ava.jpg";
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';

import { useDispatch } from "react-redux";
import { cartActions } from '../../../redux/CartReducer';




const ShowProduct = () => {

  const [productList, setProductList] = useState([]);
  // const [cartItems, setCartItems] = useState([]);

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



  // const handleAddToCart = () => {
  //   addToCart(product);
  // };

  const dispatch = useDispatch();

//   const addToCart = () => {
//     dispatch(cartActions.addItem({
//       id: product.id,
//       productName: product.productName,
//       price: product.price,
//       image: product.img,
//     }))
//   }
// };



  return (
    <div className=" show-Product">
      {productList.map((product, index) => (
        <div className="product-item " product={product} key={index}>
          {/* ====================img product==================== */}
          <div className="product-img d-flex justify-content-center mb-2">
            <img
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "15px 15px 0px 0px",
              }}
              src={product.img}
              alt=""
            />
          </div>
          {/* ====================img text==================== */}

          <div className="product-content">
            <h5>{product.title}</h5>
            <div>
              <span className="d-flex justify-content-end mb-2">
                {product.price + "$"}
              </span>
            </div>
            <Button
              className="addToCart-btn mb-2"
              style={{ width: "100%" }}
              //  onClick={handleAddToCart}
              onClick={() =>
                dispatch(
                  cartActions.addProduct({
                    id: product.id,
                    productName: product.productName,
                    price: product.price,
                    image: product.img,
                  })
                )
              }
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ShowProduct;
