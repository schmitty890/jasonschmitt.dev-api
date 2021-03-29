import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const CurrentSongSchema = new Schema({
  songName: {
    type: String,
  },
});

CurrentSongSchema.set("timestamps", true);
