const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: String,
    description: String,
    price: Number,
    status: {
        type: String,
        enum: ["active", "inactive"],
      
    },
    createdOn: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("product", productSchema);
