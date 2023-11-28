import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Chart from "react-google-charts";

const PieChart = () => {
  const [productQuantities, setProductQuantities] = useState({});

  const getTotalQuantities = async () => {
    try {
      const ordersQuerySnapshot = await getDocs(collection(db, "orders"));

      let quantities = {};
      ordersQuerySnapshot.forEach((orderDoc) => {
        const orderData = orderDoc.data();
        const cartProduct = orderData.cartProduct || [];

        cartProduct.forEach((product) => {
          const productName = product.productName;
          // Increment the quantity for the specific product
          quantities[productName] =
            (quantities[productName] || 0) + (product.quantity || 0);
        });
      });

      setProductQuantities(quantities);
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  };
  useEffect(() => {
    getTotalQuantities();
  }, []);

  const chartData = [["Product", "Quantity"]];
  // Convert productQuantities object into an array for the Pie Chart
  Object.entries(productQuantities).forEach(([productName, quantity]) => {
    chartData.push([productName, quantity]);
  });

  return (
    <div>
      <h1 className="m-3">Product Quantities Order</h1>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          title: "Product Quantities",
        }}
      />
    </div>
  );
};

export default PieChart;
