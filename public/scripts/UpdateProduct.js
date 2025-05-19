let quill;

function showLoading() {
  document.getElementById("update-product").innerText = "Loading...";
}

function hideLoading() {
  document.getElementById("update-product").innerText = "Submit";
}

const productDataMethod = async () => {
  const id = new URLSearchParams(window.location.search).get("query");
  const res = await fetch(`/api/products/${id}`, {
    method: "GET",
  });
  const { Data } = await res.json();

  return Data;
};

const updateFormSubmission = async () => {
  const productData = await productDataMethod();

  console.log(productData);

  const form = document.getElementById("productForm");

  document.getElementById("title").value = productData.title;
  document.getElementById("description").value = productData.description;
  document.getElementById("category").value = productData.category;
  quill.root.innerHTML = productData.content;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value || productData.title;
    const description =
      document.getElementById("description").value || productData.description;
    const category =
      document.getElementById("category").value || productData.category;
    const content = quill.root.innerHTML || productData.content;
    const productId = new URLSearchParams(window.location.search).get("query");

    showLoading();
    try {
      const response = await fetch("/api/products/update-product", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          category,
          productId,
          content,
          description,
          title,
        }),
      });

      const { success, message, Data } = await response.json();

      if (success) {
        alert(message || "Updated Successfully");
        document.getElementById("title").value = Data.title;
        document.getElementById("description").value = Data.description;
        document.getElementById("category").value = Data.category;
        quill.root.innerHTML = Data.content;
      } else {
        throw new Error(message);
      }
    } catch (error) {
      alert("Error updating product: " + error.message);
    } finally {
      hideLoading();
    }
  });
};

document.addEventListener("DOMContentLoaded", updateFormSubmission);

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
