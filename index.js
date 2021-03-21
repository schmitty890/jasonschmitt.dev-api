import express from "express";
import bodyParser from "body-parser";
// import routes from "./src/routes/crmRoutes";
// import testRoutes from "./src/routes/testRoutes";
// import budgetRoutes from "./src/routes/budgetRoutes";
// import mongoose from "mongoose";
import cors from "cors";
// import jsonwebtoken from "jsonwebtoken";

const app = express();

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;

// enable cors
app.use(cors());

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes(app);
// budgetRoutes(app);
// testRoutes(app);

// serving static files
app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.send("test route!");
});

app.post("/test", (req, res) => {
  console.log(req.body);
});

app.get("/", (req, res) => {
  console.log(`hi on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
