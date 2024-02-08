import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    photo: {
      type: String,
      default:
        "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = model(collection, schema);
export default Product;
