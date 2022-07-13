import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Receipt = new Schema({
  productsInfo: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      price: Number,
      quantity: Number,
      name: String,
      unit: String,
      taxRate: Number,
    },
  ],
  paymentInfo: {
    paymentType: String,
    firstName: String,
    lastName: String,
    slip: String,
    idCard: String,
    company: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  date: Date,
  company: {
    type: Schema.Types.ObjectId,
    ref: "USer",
  },
});

export default mongoose.model("Receipt", Receipt, "receipts");
