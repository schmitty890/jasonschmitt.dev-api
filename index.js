import express from "express";
import bodyParser from "body-parser";
import emailRoutes from "./src/routes/emailRoutes";
import spotifyRoutes from "./src/routes/spotifyRoutes";
import playlistRoutes from "./src/projects/playlist/routes/playlistRoutes";
import hockeyRoutes from "./src/projects/hockey/routes/hockeyRoutes";
import trackMeRoutes from "./src/projects/trackMe/routes/trackMeRoutes";
import weatherRoutes from "./src/projects/weather/routes/weatherRoutes";
import routes from "./src/routes/crmRoutes";
// import testRoutes from "./src/routes/testRoutes";
// import budgetRoutes from "./src/routes/budgetRoutes";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";
var cron = require("node-cron");
// import { getCurrentSong } from "./src/routes/spotifyRoutes";
import { getCurrentSong } from "./src/controllers/spotifyController";

const app = express();

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081;

// enable cors
app.use(cors());

// mongoose connection
mongoose.Promise = global.Promise;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/jasonsProjectsDB";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      (err, decode) => {
        if (err) {
          req.user = undefined;
        }
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);
emailRoutes(app);
spotifyRoutes(app);

playlistRoutes(app);
hockeyRoutes(app);
trackMeRoutes(app);
weatherRoutes(app);

// cron.schedule("* * * * *", () => {
//   console.log("running a task every minute");
//   // console.log(getCurrentSong());
//   const one = 1;
//   const two = 2;
//   console.log(one + two);
//   // console.log(getCurrentSong());
//   getCurrentSong();
// });

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
