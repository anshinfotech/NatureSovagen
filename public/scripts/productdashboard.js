let quill;

function showLoading() {
  document.getElementById("add-product").innerText = "Loading...";
}

function hideLoading() {
  document.getElementById("add-product").innerText = "Submit";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const tableBody = document.getElementById("productTableBody");
  const loadingSpinner = document.querySelector(".loading-spinner");
  const errorMessage = document.querySelector(".error-message");
  const logoutBtn = document.getElementById("logout");
  const menuButton = document.getElementById("menuBtn");
  let isOpen = false;
  menuButton.addEventListener("click", () => {
    if (isOpen) {
      logoutBtn.style.top = "-3rem";
      isOpen = false;
    } else {
      logoutBtn.style.top = "4rem";
      isOpen = true;
    }
  });

  // Fetch products on page load
  async function fetchProducts() {
    try {
      loadingSpinner.style.display = "block";
      errorMessage.style.display = "none";

      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const { products } = data.data;
      renderProducts(products);
    } catch (error) {
      errorMessage.style.display = "block";
      console.error("Fetch error:", error);
    } finally {
      loadingSpinner.style.display = "none";
    }
  }

  // Render products in table body
  function renderProducts(products) {
    tableBody.innerHTML = "";
    products.forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
          <td>
          ${
            product.image
              ? `<img class="product-image" src="${product.image[0]}" alt="${product.title}">`
              : "No Image"
          }
        </td>
        <td>${product.title}</td>
        <td class='hide'>${product.description}</td>
        <td class='hide'>${product.category}</td>
        <td><button class='delete-btn' data-id="${
          product._id
        }"> <i class="fa fa-trash-o" style="font-size:24px;color:red"></i></button></td>
      
      `;
      tableBody.appendChild(row);
    });
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.currentTarget.getAttribute("data-id");
        handleDelete(productId);
      });
    });
  }
  // Handle Delete
  const handleDelete = (id) => {
    const isDelete = confirm("Are you sure want to delete ?");
    if (!isDelete) {
      alert("Not deleted");
      return;
    }
    fetch(`/api/products/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };
  // Form to add new product
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").files;
    const category = document.getElementById("category").value;
    const content = quill.root.innerHTML;

    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("description", description);

    showLoading();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      console.log(response);

      if (!response.ok) throw new Error("Submission failed");
      alert("New product added");

      form.reset();
      quill.root.innerHTML = "";
      await fetchProducts();
    } catch (error) {
      alert("Error adding product: " + error.message);
    } finally {
      hideLoading();
    }
  });

  // Logout button
  logoutBtn.addEventListener("click", () => {
    fetch("/api/auth/logout", {
      method: "POST",
    })
      .then(() => {
        window.location.href = "/";
        alert("Logged out");
      })
      .catch((err) => {
        alert("Error logging out : " + err);
      });
  });
  // Initial load
  fetchProducts();
});

document.addEventListener("DOMContentLoaded", function () {
  quill = new Quill("#content", {
    theme: "snow",
    placeholder: "Write the information of each product here.....",
    modules: {
      toolbar: [
        [{ color: [] }],
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["link", "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["clean"],
      ],
    },
  });
});
