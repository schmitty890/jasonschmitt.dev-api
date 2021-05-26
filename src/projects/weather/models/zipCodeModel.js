import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ZipCodeSchema = new Schema({
  zipCode: {
    type: String,
  },
});

ZipCodeSchema.set("timestamps", true);
