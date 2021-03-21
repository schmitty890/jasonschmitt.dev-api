import express from "express";
import bodyParser from "body-parser";
// import routes from "./src/routes/crmRoutes";
// import testRoutes from "./src/routes/testRoutes";
// import budgetRoutes from "./src/routes/budgetRoutes";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

const app = express();

dotenv.config({ path: ".env" });

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
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAILEMAIL,
        pass: process.env.GMAILPASS,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `${req.body.yourEmail}`, // sender address
      to: process.env.GMAILEMAIL, // list of receivers
      subject: "Portfolio email", // Subject line
      text: `A message from ${req.body.yourName} at ${req.body.yourEmail}!  ${req.body.yourMessage}`, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
});

app.get("/", (req, res) => {
  console.log(`hi on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
