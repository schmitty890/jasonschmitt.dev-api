var spotifyApi = require("spotify-web-api-node");
import {
  postCanUsersEdit,
  getCanUsersEdit,
} from "../controllers/playlistController";
const routes = (app) => {
  app.route("/postCanUsersEdit").post(postCanUsersEdit);
  app.route("/getCanUsersEdit").get(getCanUsersEdit);
};

export default routes;
