import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UsersCanEditSchema = new Schema({
  canEdit: {
    type: Boolean,
  },
});

UsersCanEditSchema.set("timestamps", true);
