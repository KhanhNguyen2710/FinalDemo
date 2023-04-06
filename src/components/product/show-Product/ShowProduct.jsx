import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { db } from "../../../firebase";
import "../show-Product/ShowProduct.css";




import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/CartReducer";
import InfoProduct from "../../productDetail/InfoProduct";
import { Link } from "react-router-dom";


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

// const getDocument = async (docId) => {
//   const document = await getDoc(doc(db, "product", docId));
//   if (document.exists()) {
//     setProductDetail({ id: document.id, ...document.data() });
//     console.log("Document data:", document.data());
//   } else {
//     console.log("No such document!");
//   }
// };

  const dispatch = useDispatch();



  return (
    <div className=" show-Product">
      {productList.map((product, index) => (
        <div
          className="product-item "
          product={product}
          key={index}
          onClick={() => {
            // getDocument(product.id);
          }}

          // onClick={() => showProductDetails(product)}
        >
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

          <div className="product-content p-2">
            <Link
              to={`/productDetail/${product.id}`}
              state={{ product }}
              key={index}
            >
              <h5>{product.productName}</h5>
            </Link>
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

      {/* {productDetail && (
        <InfoProduct
          id={productDetail.id}
          describe={productDetail.describe}
          title={productDetail.price}
          img={productDetail.img}
          name={productDetail.productName}
        />
      )} */}
    </div>

    // {/* {selectedProduct && <ProductDetails product={selectedProduct} />} */}
  );
 
};
export default ShowProduct;
