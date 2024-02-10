import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    date: {
      createdAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("products", ProductSchema);
