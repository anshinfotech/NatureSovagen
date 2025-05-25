const showLoading = () => {
  document.querySelector(".submit-btn").innerHTML = "Loading....";
};

const hideLoading = () => {
  document.querySelector(".submit-btn").innerHTML = "Get Quote";
};

const handleFormController = () => {
  const form = document.querySelector(".quote-form");

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
    };

    handleFormSubmission(formData);
  });
};

const handleFormSubmission = async (userData) => {
  showLoading();
  try {

    const formData = {
      ...userData,
      products : JSON.parse(sessionStorage.getItem('orderItems'))
    }

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
      sessionStorage.removeItem("orderItems");
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

document.addEventListener("DOMContentLoaded", function () {
  //Show booked Products
  const products = JSON.parse(sessionStorage.getItem("orderItems")) || [];

  if (products.length === 0) {
    document.querySelector(".cart-container").innerHTML = `
    <h1>Products Details</h1>
    <h2>Oops! No Data to Show</h2>
    `;
  }

  const cartItems = document.querySelector(".cart-items");

  products.map((item, index) => {
    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-item");
    cartDiv.setAttribute("data-id", item.id);

    cartDiv.innerHTML = `
      <div class="item-content">
        <div class="item-info">
          <img src="${item.productImage}" alt="Product 1" />
        </div>
        <div class="quantity">
          <div class="item-details">
            <h3>${item.ProductName}</h3>
          </div>
          <div>
            <label>Sample Qt:</label>
            <input type="number" class="sample_input" value="${item.sample_Qt}" min="1" />
          </div>
          <div>
            <label>Purchase Qt:</label>
            <input type="number" class="purchase_input" value="${item.purchase_Qt}" />
          </div>

          <button class='update_btn'>Update</button>
          <button class='remove_btn'>Remove</button>
        </div>
      </div>
    `;

    cartItems.append(cartDiv);

    // Handle Update
    cartDiv.querySelector(".update_btn").addEventListener("click", function () {
      const updatedSample = cartDiv.querySelector(".sample_input").value;
      const updatedPurchase = cartDiv.querySelector(".purchase_input").value;

      // Update values in products array
      products[index].sample_Qt = updatedSample;
      products[index].purchase_Qt = updatedPurchase;

      // Save back to sessionStorage
      sessionStorage.setItem("orderItems", JSON.stringify(products));

      alert("Updated successfully!");
    });

    // Handle Remove
    cartDiv.querySelector(".remove_btn").addEventListener("click", function () {
      products.splice(index, 1);
      sessionStorage.setItem("orderItems", JSON.stringify(products));
      alert("Removed Successfully");
      location.reload(); // Refresh to update UI
    });
  });
});
