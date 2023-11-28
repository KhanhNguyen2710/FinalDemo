import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { db } from "../../firebase";
import "../chart/BoxChart.css";
import PieChart from "./PieChart";
import useFirestoreCollection from "./useFirestoreCollection";

const Dashboard = () => {
  // const [productList, setProductList] = useState([]);
  // const [ordersList, setOrdersList] = useState([]);
  // const [contentList, setContentList] = useState([]);

  // const getData = async () => {
  //   try {
  //     const productQuerySnapshot = await getDocs(collection(db, "product"));
  //     const productData = [];
  //     productQuerySnapshot.forEach((doc) => {
  //       productData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setProductList(productData);

  //     const ordersQuerySnapshot = await getDocs(collection(db, "orders"));
  //     const ordersData = [];
  //     ordersQuerySnapshot.forEach((doc) => {
  //       ordersData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setOrdersList(ordersData);

  //     const contentQuerySnapshot = await getDocs(collection(db, "content"));
  //     const contentData = [];
  //     contentQuerySnapshot.forEach((doc) => {
  //       contentData.push({ id: doc.id, ...doc.data() });
  //     });
  //     setContentList(contentData);
  //   } catch (error) {
  //     console.error("Error getting data: ", error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // }, []);


  const productList = useFirestoreCollection("product");
  const ordersList = useFirestoreCollection("orders");
  const contentList = useFirestoreCollection("content");
  const recipesList = useFirestoreCollection("recipes");

  //
  const numberOfProduct = productList.length;
  const numberOfOrders = ordersList.length;
  const numberOfContent = contentList.length;
  const numberOfRecipes = recipesList.length;

  const dataQuantity = [
    { label: "Quantity of orders", value: numberOfOrders },
    { label: "Quantity of products", value: numberOfProduct },
    { label: "Quantity of blogs", value: numberOfContent },
    { label: "Quantity of Recipes", value: numberOfRecipes },
  ];

  //
  const barChartData = [
    ["Product", "Price", { role: "style" }],
    ...productList.map((product) => [
      product.productName,
      Number(product.price),
      "color: #b87333",
    ]),
    // Adjust the color or add more styling based on your requirements
  ];

  return (
    <div>
      <Container className="box-container mb-4 gap-2">
        {dataQuantity.map((item, index) => (
          <div className="box-item">
            <p style={{ color: "#B87333", fontSize: "20px" }}>
              {item.label}:<h3>{item.value}</h3>
            </p>
          </div>
        ))}
      </Container>

      {/* /////////// */}

      <h1>Chart</h1>
      <Chart
        chartType="BarChart"
        width="100%"
        height="400px"
        data={barChartData}
        options={{
          bar: {
            groupWidth: "80%",
          },
        }}
      />
      <div>
        <PieChart />
      </div>
    </div>
  );
};

export default Dashboard;
