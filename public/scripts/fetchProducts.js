async function fetchProducts() {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    const { products } = data.data;

    const container = document.querySelector(".product-grid");
    container.innerHTML = ""; // Clear existing products if needed

    if (products.length === 0) {
      const h1 = document.createElement("h1");
      h1.style.color = "red";
      h1.style.fontSize = "24px";
      h1.textContent = "No products found";
      container.appendChild(h1);
    } else {
      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.setAttribute("data-aos-duration", "1500");
        card.setAttribute("data-aos", "fade-up");

        card.innerHTML = `
        <img src="${product.image[0]}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.description || "No description available."}</p>
        <button class="book_btn" onclick="navigate('${product._id}')">Place Order</button>
      `;

        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

const navigate = (id) => {
  window.location.href = `/api/products/single-product/?query=${id}`;
};

window.addEventListener("DOMContentLoaded", fetchProducts);
