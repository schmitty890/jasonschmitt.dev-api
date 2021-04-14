import {
  addNewContact,
  getContacts,
  getContactWithID,
  updateContact,
  deleteContact,
} from "../controllers/trackMeCrmController";

import {
  login,
  register,
  loginRequired,
  getUserWithID,
  updateUserWithID,
} from "../controllers/trackMeController";

const routes = (app) => {
  app
    .route("/trackMe/contact")
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
    .route("/trackMe/contact/:contactID")
    // get a specific contact
    .get(loginRequired, getContactWithID)

    // update a specific contact
    .put(loginRequired, updateContact)

    // delete a specific contact
    .delete(loginRequired, deleteContact);

  app
    .route("/trackMe/user/:userID")
    // get user with specific id
    .get(loginRequired, getUserWithID)
    // update a specific contact
    .put(loginRequired, updateUserWithID);

  // register new user route
  app.route("/trackMe/auth/register").post(register);

  // login route
  app.route("/trackMe/login").post(login);
};

export default routes;
