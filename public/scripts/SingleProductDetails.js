let globalData = null;

const fetchDetailsFromServer = async () => {
  const id = new URLSearchParams(window.location.search).get("query");
  const res = await fetch(`/api/products/${id}`, {
    method: "GET",
  });
  const { Data } = await res.json();

  globalData = Data;

  document.getElementById("productTitle").textContent = Data.title;
  document.getElementById("productCategory").textContent = Data.category;
  document.getElementById("productDescription").textContent = Data.description;
  document.getElementById("productImage").src = Data.image[0];
  document.getElementById("productContent").innerHTML = Data.content;

  const productGrid = document.querySelector(".products-grid");

  Data.image.map((item) => {
    const img = document.createElement("img");
    img.alt = "Failed to Load image";
    img.src = item;
    img.classList.add("grid-image");

    img.onclick = () => {
      window.open(item, "_blank");
    };

    productGrid.append(img);
  });

  try {
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

document.addEventListener("DOMContentLoaded", fetchDetailsFromServer);

/* Place Order */

document.addEventListener("DOMContentLoaded", function () {
  const bookBtn = document.querySelector(".book_now_btn");

  bookBtn.addEventListener("click", function () {
    const sample_Qt = document.getElementById("sp_quantity").value;
    const purchase_Qt = document.getElementById("quantity").value;
    const units = document.getElementById("quantity_unit").value;

    if (!sample_Qt || !purchase_Qt || !units) {
      window.alert("Sample Quantity, Purshase Quantity and Units are required");
    } else if (Number(sample_Qt) > 5 || Number(sample_Qt) <= 0) {
      window.alert("Sample Quantity must be between 1 - 5");
    } else if (Number(purchase_Qt) <= 0) {
      window.alert("Quantity must be greater than Zero");
    } else {
      const products = JSON.parse(sessionStorage.getItem("orderItems")) || [];

      const isPresent = products.find(
        (raw) =>
          raw.ProductName.toLowerCase() === globalData.title.toLowerCase()
      );

      if (isPresent) {
        return window.alert(`Already Booked. Check your Quote Section`);
      }

      products.push({
        id: Date.now(),
        ProductName: globalData.title,
        sample_Qt,
        purchase_Qt,
        units,
        productImage: globalData.image[0],
      });

      sessionStorage.setItem("orderItems", JSON.stringify(products));

      window.alert("Successfull. Booking status true");

      document.getElementById("sp_quantity").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("quantity_unit").value = "";

      window.location.href = "/naturesovagen/v1/get-a-quote";
    }
  });
});

/* Place Order */
