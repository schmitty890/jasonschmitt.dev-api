import { postZipCode, getZipCode } from "../controllers/weatherController";
const routes = (app) => {
  app.route("/postZipCode").post(postZipCode);
  app.route("/getZipCode").get(getZipCode);
};

export default routes;
