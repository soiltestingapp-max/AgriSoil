import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fullName: String,
  mobile: String,
  addressLine: String,
  village: String,
  district: String,
  state: String,
  pincode: String
});

export default mongoose.model("Address", addressSchema);
