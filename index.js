// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
// const SSLCommerzPayment = require("sslcommerz-lts");

// require("dotenv").config();
// const port = process.env.PORT || 5000;

// const app = express();

// //middleware
// app.use(cors());

// app.use(express.json());
// app.use(bodyParser.urlencoded({
//   extended:false
// }));
// app.use(bodyParser.json());

// // database user and password
// // fragrance-user

// const api = new WooCommerceRestApi({
//   url: "https://woo-swiftly-observant-dinosaur.wpcomstaging.com/",
//   consumerKey: "ck_980fae877dc97ac935d1524a823f79c23f1f45d9",
//   consumerSecret: "cs_48a876db1fa425ffaefcda1064039f2aeb16cb02",
//   version: "wc/v3",
// });
// const store_id = "fragr64711a401981e";
// const store_passwd = "fragr64711a401981e@ssl";
// const is_live = false; //true for live, false for sandbox

// async function run() {
//   try {
//     //get products
//     app.get("/getProducts", async (req, res) => {
//       let allProducts = [];
//       let page = 1;
//       let totalPages=1;

//       while (page <= totalPages){
//         await api.get(`products?per_page=100&page=${page}`)
//         .then(response=>{
//           allProducts=[...allProducts,...response.data]
//           totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
//           console.log(totalPages)
//           page++;
//         })
//       }
//       res.send(allProducts);
//       console.log(allProducts.length)
//     });

//     //ger order list
//     app.get("/getOrder", async (req, res) => {
//       api
//         .get("orders")
//         .then((response) => {
//           res.send(response.data);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     //post order
//     app.post("/postOrder", async (req, res) => {
//       const data = req.body;
//       await api
//         .post("orders", data)
//         .then((response) => {
//           res.send(response.data);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     //get all customer
//     app.get("/getCustomer", async (req, res) => {
//       api
//         .get("customers")
//         .then((response) => {
//           res.send(response.data);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });

//     //post customer
//     app.post("/postCustomer", async (req, res) => {
//       const data = req.body;
//       await api
//         .post("customers", data)
//         .then((response) => {
//           res.send(response.data);
//         })
//         .catch((error) => {
//           console.log(error.response.data);
//         });
//     });
//     //sslCommerz payment gateway
//     app.get("/ssl-request", async (req, res, next) => {

//       const data = {
//         total_amount: 100,
//         currency: "BDT",
//         tran_id: Date.now().toString(), // use unique tran_id for each api call
//         success_url: "http://localhost:5000/ssl-payment-success",
//         fail_url: "http://localhost:5000/ssl-payment-failure",
//         cancel_url: "http://localhost:5000/ssl-payment-cancel",
//         ipn_url: "http://localhost:5000/ssl-payment-ipn",
//         shipping_method: "Courier",
//         product_name: "Computer.",
//         product_category: "Electronic",
//         product_profile: "general",
//         cus_name: "Customer Name",
//         cus_email: "customer@example.com",
//         cus_add1: "Dhaka",
//         cus_add2: "Dhaka",
//         cus_city: "Dhaka",
//         cus_state: "Dhaka",
//         cus_postcode: "1000",
//         cus_country: "Bangladesh",
//         cus_phone: "01711111111",
//         cus_fax: "01711111111",
//         ship_name: "Customer Name",
//         ship_add1: "Dhaka",
//         ship_add2: "Dhaka",
//         ship_city: "Dhaka",
//         ship_state: "Dhaka",
//         ship_postcode: 1000,
//         ship_country: "Bangladesh",
//       };
//       const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
//       sslcz.init(data).then((apiResponse) => {
//         // Redirect the user to payment gateway
//         let GatewayPageURL = apiResponse.GatewayPageURL;
//         res.redirect(GatewayPageURL);
//         console.log("Redirecting to: ", GatewayPageURL);
//       });
//     });

//     app.post("/ssl-payment-success", async (req, res, next) => {
//       return res.status(200).json({
//         data: req.body
//       });
//     });
//     app.post("/ssl-payment-failure", async (req, res, next) => {
//       return res.status(400).json({
//         data: req.body
//       });
//     });
//     app.post("/ssl-payment-cancel", async (req, res, next) => {
//       return res.status(200).json({
//         data: req.body
//       });
//     });
//     app.post("/ssl-payment-ipn", async (req, res, next) => {
//       return res.status(200).json({
//         data: req.body
//       });
//     });
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// app.get("/", async (req, res) => {
//   res.send("Server is runing");
// });

// app.listen(port, () => {
//   console.log("Listening at port", port);
// });
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// database user and password
// fragrance-user

const uri =
  "mongodb+srv://fragrance-user:fragrance-user@cluster0.iwylkpa.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(client.db("admin").command);
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );

    const productCollection = client.db("fragrance").collection("products");
    const cartCollection = client.db("fragrance").collection("cart");
    const orderCollection = client.db("fragrance").collection("order-list");

    //get products
    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // post order list
    app.post("/order", async (req, res) => {
      const orderList = req.body;
      const result = await orderCollection.insertOne(orderList);
      res.send(result);
    });

    // get order list
    app.get("/order", async (req, res) => {
      const query = {};
      const cursor = orderCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("Server is runing");
});

app.listen(port, () => {
  console.log("Listening at port", port);
});