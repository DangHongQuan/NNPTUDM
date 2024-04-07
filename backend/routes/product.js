const express = require("express");
const router = express.Router();
const Product = require("../schemas/product"); // Đảm bảo đường dẫn tới model product là chính xác
const { ObjectId } = require("mongodb");
// Định nghĩa phương thức getAll
router.get("/", async function (req, res, next) {
  try {
    // Sử dụng phương thức find() của model Product để lấy tất cả các sản phẩm
    const products = await Product.find({});

    // Trả về danh sách sản phẩm
    res.json(products);
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Import ObjectId từ thư viện mongodb

router.get("/:id", async function (req, res, next) {
  try {
    const productId = req.params.id;
    if (!ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findOne({ _id: new ObjectId(productId) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
