const fetchDetailsFromServer = async () => {
  const id = new URLSearchParams(window.location.search).get("query");
  const res = await fetch(`/api/products/${id}`, {
    method: "GET",
  });
  const { Data } = await res.json();

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
      window.open(item , "_blank")
    };

    productGrid.append(img);
  });

  try {
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

document.addEventListener("DOMContentLoaded", fetchDetailsFromServer);
