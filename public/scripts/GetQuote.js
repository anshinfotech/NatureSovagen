const showLoading = () => {
  document.querySelector(".submit-btn").innerHTML = "Loading....";
};

const hideLoading = () => {
  document.querySelector(".submit-btn").innerHTML = "Get Quote";
};

const handleFormController = () => {
  const form = document.querySelector(".quote-form");

  /* Add products logic */
  const checkboxes = document.querySelectorAll(".pdcb");
  const selects = document.querySelectorAll("select.sample");

  // Initialize products array from localStorage or as empty array
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Disable all selects initially
  selects.forEach((select) => (select.disabled = true));

  // Restore state if previously saved
  products.forEach((productObj) => {
    const checkbox = document.querySelector(
      `input.pdcb[value="${productObj.product}"]`
    );
    const row = checkbox.closest("tr");
    const select = row.querySelector("select.sample");

    checkbox.checked = true;
    select.disabled = false;
    select.value = productObj.quantity;
  });

  // Attach checkbox listeners
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const row = checkbox.closest("tr");
      const select = row.querySelector("select.sample");
      const productName = checkbox.value;

      if (checkbox.checked) {
        select.disabled = false;

        // Add product if not already in array
        if (!products.some((p) => p.product === productName)) {
          products.push({
            product: productName,
            quantity: select.value,
          });
        }
      } else {
        select.disabled = true;
        // Remove from products
        products = products.filter((p) => p.product !== productName);
      }

      localStorage.setItem("products", JSON.stringify(products));
      console.log(products);
    });
  });

  // Attach select listeners to update quantity
  selects.forEach((select) => {
    select.addEventListener("change", function () {
      const row = select.closest("tr");
      const checkbox = row.querySelector(".pdcb");
      const productName = checkbox.value;

      if (checkbox.checked) {
        products = products.map((p) =>
          p.product === productName
            ? { product: productName, quantity: select.value }
            : p
        );

        localStorage.setItem("products", JSON.stringify(products));
        console.log(products);
      }
    });
  });
  /* Add products logic */

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
    const response = await fetch(`/api/quotes/new_quote`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message || "Operation Successfull");
      localStorage.removeItem("products")
      window.location.reload();
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
