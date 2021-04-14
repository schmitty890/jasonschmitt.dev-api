import mongoose from "mongoose";
import { TrackMeUserSchema } from "../models/trackMeUserModel";

const TrackMeUser = mongoose.model("TrackMeUser", TrackMeUserSchema);

export const addNewContact = (req, res) => {
  let newContact = new TrackMeUser(req.body);

  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const getContacts = (req, res) => {
  TrackMeUser.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const getContactWithID = (req, res) => {
  TrackMeUser.findById(req.params.contactID, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const updateContact = (req, res) => {
  TrackMeUser.findOneAndUpdate(
    { _id: req.params.contactID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    }
  );
};

export const deleteContact = (req, res) => {
  TrackMeUser.remove({ _id: req.params.contactID }, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "successfully deleted contact" });
  });
};
