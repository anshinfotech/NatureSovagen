const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) {
      console.error("File is missing.");
      return null;
    }

    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataUri = `data:${file.mimetype};base64,${b64}`;
    const response = await cloudinary.uploader.upload(dataUri, {
      resource_type: "image",
    }); 
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};

module.exports = uploadOnCloudinary;