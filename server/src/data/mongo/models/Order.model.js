import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";

const schema = new Schema({
    pid: {
      type: Types.ObjectId,
      required: true,
      ref: "products",
    },
    uid: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    quantity: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "delivered", "canceled"],
    },
  }, { timestamps: true }
);

schema.plugin(mongoosePaginate);

schema.pre("find", function () {
  this.populate("pid", "_id title price")
      .populate("uid", "-photo -__v -createdAt -updatedAt");
});

const Order = model(collection, schema);
export default Order;
