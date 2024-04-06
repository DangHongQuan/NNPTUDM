var mongoose = require("mongoose");

var productShema = new mongoose.Schema(
  {
    id: Number,
    name: String,
    price: Number,
    imageUrl: String,
    describe: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", productShema);
