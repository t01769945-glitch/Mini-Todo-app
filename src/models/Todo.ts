import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  isCompleted: boolean;
}

const todoSchema = new mongoose.Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Todo =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);
