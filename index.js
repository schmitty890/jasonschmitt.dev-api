import express from "express";
import bodyParser from "body-parser";
import emailRoutes from "./routes/emailRoutes";
// import routes from "./src/routes/crmRoutes";
// import testRoutes from "./src/routes/testRoutes";
// import budgetRoutes from "./src/routes/budgetRoutes";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import jsonwebtoken from "jsonwebtoken";

const app = express();

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;

// enable cors
app.use(cors());

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

emailRoutes(app);
// routes(app);
// budgetRoutes(app);
// testRoutes(app);

// serving static files
app.use(express.static("public"));

app.get("/test", (req, res) => {
  res.send("test route!");
});

app.get("/", (req, res) => {
  console.log(`hi on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
