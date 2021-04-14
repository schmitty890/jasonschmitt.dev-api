import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const TrackMeUserSchema = new Schema({
  firstName: {
    type: String,
  },
  email: {
    type: String,
  },
  hashPassword: {
    type: String,
  },
});

TrackMeUserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

TrackMeUserSchema.set("timestamps", true);
