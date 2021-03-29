var spotifyApi = require("spotify-web-api-node");
import {
  loginSpotify,
  callback,
  getMe,
  getCurrentToken,
} from "../controllers/spotifyController";
const routes = (app) => {
  app.route("/loginSpotify").get(loginSpotify);

  app.route("/callback").get(callback);
  app.route("/getMe").get(getMe);

  app.route("/getCurrentToken").get(getCurrentToken);

  // app.route("/getCurrentSongFromClient").get(getCurrentSongFromClient);
};

export default routes;
