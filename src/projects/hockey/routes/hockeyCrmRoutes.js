import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/hockeyCrmController";

import {
  login,
  register,
  loginRequired,
  getUserWithID,
  updateUserWithID,
} from "../controllers/hockeyController";

const routes = (app) => {
  app
    .route("/hockey/contact")
    // get all contacts
    .get(
      (req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();
      },
      loginRequired,
      getContacts
    )

    // add a new contact
    .post(loginRequired, addNewContact);

  app
    .route("/hockey/contact/:contactID")
    // get a specific contact
    .get(loginRequired, getContactWithID)

    // update a specific contact
    .put(loginRequired, updateContact)

    // delete a specific contact
    .delete(loginRequired, deleteContact);

  app
    .route("/hockey/user/:userID")
    // get user with specific id
    .get(loginRequired, getUserWithID)
    // update a specific contact
    .put(loginRequired, updateUserWithID);

  // register new user route
  app.route("/hockey/auth/register").post(register);

  // login route
  app.route("/hockey/login").post(login);
};

export default routes;
