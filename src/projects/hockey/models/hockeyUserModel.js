import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export const HockeyUserSchema = new Schema({
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

HockeyUserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

HockeyUserSchema.set("timestamps", true);
