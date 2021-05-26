import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import mongoose from "mongoose";
import { ZipCodeSchema } from "../models/zipCodeModel";
const ZipCode = mongoose.model("ZipCode", ZipCodeSchema);

export const postZipCode = (req, res) => {
  console.log("postZipCode");
  console.log(req.body);
  const zip = new ZipCode(req.body);
  console.log(zip);
  zip.save((err, newZipCode) => {
    if (err) {
      return res.status(400).send({ message: err });
    } else {
      console.log("zip code saved");
      return res.json(newZipCode);
    }
  });
};

export const getZipCode = (req, res) => {
  console.log("getZipCode");
  ZipCode.find({}, (err, latestZipCode) => {
    if (err) {
      res.send(err);
    }
    console.log("sending latestZipCode");
    res.json(latestZipCode);
  })
    .sort({ $natural: -1 })
    .limit(1);
};
