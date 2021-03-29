import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CurrentTokenSchema = new Schema({
  token: {
    type: String,
  },
});

CurrentTokenSchema.set("timestamps", true);
