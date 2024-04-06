const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");
var protect = require("../middlewares/protect");
router.get("/", protect, async function (req, res, next) {
  console.log(req.headers.authorization);
  let users = await userModel.find({}).exec();
  responseHandle.renderResponse(res, true, users);
});
// Đăng ký người dùng
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Tạo người dùng mới
    const user = new User({ username, email, password });
    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/", protect, async function (req, res, next) {
  console.log(req.headers.authorization);
  let users = await userModel.find({}).exec();
  responseHandle.renderResponse(res, true, users);
});
// Đăng nhập người dùng
// Đăng nhập người dùng
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Tìm người dùng trong cơ sở dữ liệu bằng email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Kiểm tra mật khẩu
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "your_secret_key",
      {
        expiresIn: "1h",
      }
    );
    // Bao gồm token trong tiêu đề "Authorization" của phản hồi
    res.header("Authorization", `Bearer ${token}`).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
