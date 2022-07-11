import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Артикал мора имати своју шифру (јединствену на нивоу тог предузећа), назив, јединицу мере
// и пореску стопу (општа 20%, посебна 10%, а 0% ако је предузеће одабрано да није у
// систему ПДВ). Код угоститеља уноси се још преко селекционог (radio) дугмета да
// ли је артикал: храна / пиће / сировина. Ово су све обавезни општи подаци. „Допунски
// подаци“ (необавезни) садрже информације о земљи порекла, страни назив артикла,
// баркод  број,  назив  произвођача,  царинску  тарифу  у  %,  информацију  да  ли  се
// примењује  еко такса или акцизе (поља  за  потврду),  жељене  залихе  на нивоу
// предузећа  (минималне  и  максималне),  опис  и  декларација.  „Цене  и  стање  робе“
// приказује  табелу  по  свим  магацинима  и  објектима,  и  то  кроз  следеће  колоне:
// назив_магацина_објекта, набавна_цена_РСД, продајна_цена_РСД,
// текуће_стање_лагера, мин_жељена_кол, макс_жељена_количина (ове жељене
// количине су само на нивоу тог појединачног магацина/објектам а не целог
// предузећа). Сваки артикал може имати и сличицу (ако није одабрана, ставити неку
// подразумевану сличицу)

let Product = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  taxRate: {
    type: Number,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "productDefault.png",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  warehouseInfo: [
    {
      id: Number,
      buyPrice: Number,
      sellPrice: Number,
      stocks: Number,
      min: Number,
      max: Number,
    },
  ],
  additionalData: {
    origin: {
      type: String,
    },
    originalName: {
      type: String,
    },
    barcode: {
      type: String,
    },
    producer: {
      type: String,
    },
    customFee: {
      type: Number,
    },
    ecoTax: {
      type: Boolean,
      default: false,
    },
    excise: {
      type: Boolean,
      default: false,
    },
    minStock: {
      type: Number,
    },
    maxStock: {
      type: Number,
    },
    about: {
      type: String,
    },
    declaration: {
      type: String,
    },
  },
});

Product.index({ code: 1, company: 1 }, { unique: true });

export default mongoose.model("Product", Product, "products");
