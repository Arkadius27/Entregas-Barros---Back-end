import { model, Schema } from "mongoose";

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
  },
});

const User = model(collection, schema);
export default User;
