require("dotenv").config();
const express = require("express");
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to CUP'S COFFEE");
});


// const array = [];
// const calculateOrderAmount = (items) => {
//   // items.map((item) => {
//   //   const { price, cartQuantity } = item;
//   //   const cartItemAmount = price * cartQuantity;
//   //   return array.push(cartItemAmount);
//   // });
//   // const totalAmount = array.reduce((a, b) => {
//   //   return a + b;
//   // }, 0);

//   return 1400 * 100;
// };

app.post("/create-payment-intent", async (req, res) => {
  const { items, description, shipping } = req.body;

  // Calculate the total amount on the server-side
  const totalAmount = items.reduce(
    (total, item) => total + item.totalPrice * item.quantity,
    0
  );;

  const orderAmount = totalAmount * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(items),
    amount: orderAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      name: shipping.name,
      phone: shipping.phone,
      address: shipping.address,
    },

    // description,
    // shipping: {
    //   address: {
    //     line1: shipping.line1,
    //     line2: shipping.line2,
    //     city: shipping.city,
    //     state: shipping.state,
    //   },
    //   name: shipping.name,
    //   phone: shipping.phone,
    // },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}`));
