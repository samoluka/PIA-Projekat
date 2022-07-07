import mongoose, { trusted } from "mongoose";
import { Types } from "mongoose";
const Schema = mongoose.Schema;

// Регистрација предузећа треба да захтева унос следећих података:
// - име и презиме одговорног лица,
// - корисничко име (које је јединствено, на нивоу свих корисника у систему),
// - лозинка1
//  (и потврда лозинке),
// - контакт телефон,
// - и-мејл адреса (јединствено, највише један кориснички налог по и-мејл адреси),
// - назив предузећа,
// - адреса седишта предузећа (држава, град, поштански број, улица и број),
// - порески идентификациони број (ПИБ2
// ),
// - матични број предузећа.

let User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
  },
  pib: {
    type: String,
    required: true,
    unique: true,
  },
  matBroj: {
    type: String,
    unique: true,
    sparse: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
    required: true,
  },
  photo: {
    type: String,
    default: "default.png",
  },
  additionInfo: {
    category: String,
    code: String,
    pdv: Boolean,
  },
  partners: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
  categories: [
    {
      type: Types.ObjectId,
      ref: "Category",
    },
  ],
});

User.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", User, "users");
