const URI = "http://localhost:3000";

const showLoading = () => {
  document.querySelector(".form-button").innerHTML = "Loading....";
};

const hideLoading = () => {
  document.querySelector(".form-button").innerHTML = "Submit";
};

const handleContactForm = () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    handleFormSubmission({
      name,
      email,
      mobile,
      city,
      state,
      country,
      subject,
      message,
    });
  });
};

const handleFormSubmission = async (formdata) => {
  showLoading();
  try {
    const response = await fetch(`${URI}/api/contact/send_message`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(formdata),
    });
    const data = await response.json();

    console.log(response);

    if (data.success) {
      alert(data.message);
    } else {
      throw new Error(data.message || "Failed to Send Message");
    }
  } catch (error) {
    alert(`Error : ${error.message}`);
  } finally {
    hideLoading();
  }
};

document.addEventListener("DOMContentLoaded", handleContactForm);
