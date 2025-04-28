const cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (files) => {
  try {
    if (!files) {
      console.error("File is missing.");
      return null;
    }

    console.log(files);

    const mappedData = files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataUri = `data:${file.mimetype};base64,${b64}`;
      const response = await cloudinary.uploader.upload(dataUri, {
        resource_type: "image",
      });
      console.log(response.secure_url);
      return response.secure_url;
    });

    const promisedData = await Promise.all(mappedData);

    console.log(promisedData);

    return promisedData;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};

module.exports = uploadOnCloudinary;
