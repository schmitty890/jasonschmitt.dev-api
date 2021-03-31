import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mongoose from "mongoose";
import { UsersCanEditSchema } from "../models/usersCanEditModel";
var SpotifyWebApi = require("spotify-web-api-node");
const UsersCanEdit = mongoose.model("UsersCanEdit", UsersCanEditSchema);

export const postCanUsersEdit = (req, res) => {
  console.log(req.body);
  const usersCanEditBoolean = new UsersCanEdit(req.body);
  console.log(usersCanEditBoolean);
  console.log("saving if users can edit");
  usersCanEditBoolean.save((err, userCanEdit) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      console.log("users can edit boolean saved");
      return res.json(userCanEdit);
    }
  });
};

export const getCanUsersEdit = (req, res) => {
  console.log("getCanUsersEdit");
  UsersCanEdit.find({}, (err, userCanEditBoolean) => {
    if (err) {
      res.send(err);
    }
    console.log("sending getCanUsersEdit");
    res.json(userCanEditBoolean);
  })
    .sort({ $natural: -1 })
    .limit(1);
};
