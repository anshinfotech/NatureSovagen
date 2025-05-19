const router = require("express").Router();
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const uploadImage = require("../middlewares/upload");

router.post("/products", uploadImage, addProduct);
router.get("/products", getAllProducts);
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard");
});
router.get("/products-dashboard", isAuthenticated, (req, res) => {
  res.render("ProductsDashboard");
});
router.get("/products/single-product", (req, res) => {
  res.render("productDetail");
});
router.get("/products/:id", getSingleProduct);
router.delete("/products/:id", isAuthenticated, deleteProduct);

router.get("/update-product", isAuthenticated, (req, res) => {
  res.render("UpdateProduct");
});

router.post("/products/update-product", updateProduct);

module.exports = router;
