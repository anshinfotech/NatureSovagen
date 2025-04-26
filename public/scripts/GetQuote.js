const URI = "http://localhost:3000";

const showLoading = () => {
  document.querySelector(".submit-btn").innerHTML = "Loading....";
};

const hideLoading = () => {
  document.querySelector(".submit-btn").innerHTML = "Get Quote";
};

const handleFormController = () => {
  const form = document.querySelector(".quote-form");
  const checkboxes = document.querySelectorAll(".pdcb");

  let products = [];

  checkboxes.forEach((item) => {
    item.addEventListener("change", function () {
      if (item.checked) {
        if (!products.includes(item.value)) {
          products.push(item.value);
        }
      } else {
        products = products.filter((val) => val !== item.value);
      }
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Extract values using getElementById
    const fullName = document.getElementById("full-name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const altMobile = document.getElementById("alt-mobile").value.trim();
    const gender = document.getElementById("gender").value;
    const company = document.getElementById("company").value.trim();
    const landmark = document.getElementById("landmark").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const country = document.getElementById("country").value.trim();
    const postalCode = document.getElementById("postal-code").value.trim();
    const deliveryDate = document.getElementById("delivery-date").value;

    const formData = {
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
    };

    handleFormSubmission(formData);
  });
};

const handleFormSubmission = async (formData) => {
  showLoading();
  try {
    const response = await fetch(`${URI}/api/quotes/new_quote`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message || "Operation Successfull");
      window.location.reload()
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert(error.message || "Something went Wrong");
  } finally {
    hideLoading();
  }
};

document.addEventListener("DOMContentLoaded", handleFormController);
