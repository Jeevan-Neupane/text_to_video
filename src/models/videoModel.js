import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    mcqs: {
      type: Array,
    },
    category: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.models.videos || mongoose.model("videos", videoSchema);

export default Video;
