import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UsersCanEditSchema = new Schema({
  canEdit: {
    type: Boolean,
  },
  canEditPlay: {
    type: Boolean,
  },
  canEditPause: {
    type: Boolean,
  },
  canEditSkip: {
    type: Boolean,
  },
  canEditSearch: {
    type: Boolean,
  },
});

UsersCanEditSchema.set("timestamps", true);
