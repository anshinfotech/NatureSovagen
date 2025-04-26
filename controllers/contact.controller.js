const { sendNotification } = require("../config/transport");
const ContactModel = require("../models/contact.model");
const asyncHandler = require("../utils/asyncHandler");

const contactMessage = asyncHandler(async (req, res) => {
  const { name, email, mobile, subject, city, country, state, message } =
    req.body;

  if ((!name, !email, !mobile, !subject, !city, !country, !state, !message)) {
    return res.status(422).json({
      success: false,
      message:
        "Missing Data : name, email, mobile, subject, city, country,state,message are required",
    });
  }

  const newMsg = await ContactModel.create({
    name,
    email,
    mobile,
    subject,
    city,
    country,
    state,
    message,
  });

  if (!newMsg) {
    return res.status(400).json({
      success: false,
      message: "Failed to Send Message",
    });
  }

  const mailMessage = {
    from: email,
    to: process.env.USER,
    subject: "Request Message from Client",
    html: `
    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 20px; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="text-align: center; padding-bottom: 20px;">
              <h2 style="margin: 0; color: #333;">📬 New Contact Message from Client</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Mobile:</strong> ${mobile}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>City:</strong> ${city}</p>
              <p><strong>State:</strong> ${state}</p>
              <p><strong>Country:</strong> ${country}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #007BFF; margin-top: 5px;">${message}</p>
            </td>
          </tr>
        </table>
    `,
  };

  await sendNotification(mailMessage);

  res.status(201).json({
    success: true,
    message: "Notification Send Successfully",
  });
});

const viewAllContacts = asyncHandler(async (req, res) => {
  const data = await ContactModel.find();

  res.status(200).json(data);
});

const viewSingleContacts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = await ContactModel.findById(id);

  res.status(200).json(data);
});

module.exports = {
  contactMessage,
  viewAllContacts,
  viewSingleContacts
};
