// const routes = (app) => {
//   app
//     .route("/contact")
//     // get all contacts
//     .get(
//       (req, res, next) => {
//         // middleware
//         console.log(`Request from: ${req.originalUrl}`);
//         console.log(`Request type: ${req.method}`);
//         next();
//       },
//       loginRequired,
//       getContacts
//     )

//     // add a new contact
//     .post(loginRequired, addNewContact);
// };

// export default routes;
