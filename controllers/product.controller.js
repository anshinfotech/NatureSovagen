const Product = require("../models/product.model");
const uploadOnCloudinary = require("../config/cloudinary");

const addProduct = async (req, res) => {
  try {
    const { title, description, category, content } = req.body;
    const files = req.files;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }
    if (!files && files.length === 0) {
      return res.json({ message: "Images are required", success: false });
    }

    const imageUrls = await uploadOnCloudinary(files);

    if (!imageUrls || imageUrls.length === 0) {
      return res
        .status(500)
        .json({ message: "Failed to upload image", success: false });
    }

    const product = await Product.create({
      title,
      description,
      category,
      image: imageUrls,
      content,
    });

    res.status(201).json({
      data: product,
      message: "New Product Added Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const total = await Product.countDocuments();

    res.status(200).json({
      data: {
        products,
        total,
      },
      message: "Products Fetched Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product Not Found", success: false });
    }
    res.status(200).json({
      success: true,
      Data: product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product Not Found", success: false });
    }
    res.status(200).json({
      message: "Product Deleted Successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
};
