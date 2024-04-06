const express = require("express");
const router = express.Router();
const Product = require("../schemas/product"); // Đảm bảo đường dẫn tới model product là chính xác

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

module.exports = router;
