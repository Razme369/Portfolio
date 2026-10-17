
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completionDate: {
    type: Date,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Project", projectSchema);
