const { sendNotification } = require("../config/transport");
const QuoteModel = require("../models/quote.model");
const asyncHandler = require("../utils/asyncHandler");
require("dotenv").config();

const newQuoteController = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    mobile,
    altMobile,
    gender,
    company,
    landmark,
    city,
    state,
    country,
    postalCode,
    deliveryDate,
    products,
  } = req.body;

  if (
    !fullName ||
    !email ||
    !mobile ||
    !altMobile ||
    !gender ||
    !company ||
    !landmark ||
    !city ||
    !state ||
    !country ||
    !postalCode ||
    !deliveryDate ||
    !products
  ) {
    return res.status(422).json({
      success: false,
      message: "Missing Data. Fill all fields",
    });
  }

  const dDate = new Date(deliveryDate);
  const cdate = new Date(Date.now());

  if (dDate < cdate) {
    return res.status(422).json({
      success: false,
      message: "Invalid Date. Select a future Date",
    });
  }

  const newQuote = new QuoteModel({
    fullName,
    email,
    mobile,
    altMobile,
    gender,
    company,
    landmark,
    city,
    state,
    country,
    postalCode,
    deliveryDate,
    products,
  });

  if (!newQuote) {
    return res.status(400).json({
      success: false,
      message: "Failed to place your request",
    });
  }

  await newQuote.save();

  const mailMessage = {
    from: process.env.USER,
    to: email,
    subject: "Your Request Was Successfully Sent",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #0B6623;">Hello ${fullName},</h2>
        <p>Thank you for reaching out to us at <strong>NatureSovagen</strong>!</p>
        <p>We’re thrilled to inform you that your quote request has been successfully received. Our team is reviewing the details and will get back to you shortly with a personalized quotation.</p>
        
        <h3 style="color: #0B6623;">Here’s what we’ve received from you:</h3>
        <ul style="line-height: 1.8;">
          <li><strong>Full Name:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Mobile:</strong> ${mobile}</li>
          <li><strong>Alternate Mobile:</strong> ${altMobile}</li>
          <li><strong>Gender:</strong> ${gender}</li>
          <li><strong>Company/Organization:</strong> ${company}</li>
          <li><strong>Address:</strong> ${landmark}, ${city}, ${state}, ${country}, ${postalCode}</li>
          <li><strong>Preferred Delivery Date:</strong> ${deliveryDate}</li>
          <li><strong>Selected Products:</strong> ${products.join(", ")}</li>
        </ul>
  
        <p>If any of the above information needs to be updated, simply reply to this email.</p>
  
        <p>We truly appreciate your interest in <strong>NatureSovagen</strong> and look forward to serving you with our best offerings.</p>
  
        <p style="margin-top: 30px;">Warm regards,<br/>
        <strong>The NatureSovagen Team</strong><br/>
        <a href="https://www.naturesovagen.com" target="_blank" style="color: #0B6623;">www.naturesovagen.com</a><br/>
        <a href="mailto:support@naturesovagen.com" style="color: #0B6623;">support@naturesovagen.com</a>
        </p>
      </div>
    </div>
    `,
  };

  await sendNotification(mailMessage);

  res.status(200).json({
    success: true,
    message: "Order Booked Successfully",
  });
});

const getAllQuotes = asyncHandler(async (req, res) => {
  const data = await QuoteModel.find();

  res.status(200).json({
    success: true,
    Data: data,
  });
});

const getSingleQuote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(422).json({
      success: false,
      message: "Invalid Id",
    });
  }

  const data = await QuoteModel.findById(id);

  res.status(200).json({
    success: true,
    message: "Data Fetched successfully",
    Data: data,
  });
});

module.exports = {
  newQuoteController,
  getAllQuotes,
  getSingleQuote,
};
