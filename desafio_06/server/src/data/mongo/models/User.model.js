import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const User = model(collection, schema);
export default User;
