const fetchDetailsFromServer = async () => {
  const id = new URLSearchParams(window.location.search).get("query");
  const res = await fetch(`/api/products/${id}`, {
    method: "GET",
  });
  const { Data } = await res.json();

  document.getElementById("productTitle").textContent = Data.title;
  document.getElementById("productCategory").textContent = Data.category;
  document.getElementById("productDescription").textContent = Data.description;
  document.getElementById("productImage").src = Data.image;
  document.getElementById("productImage").alt = Data.title;
  document.getElementById("productContent").innerHTML = Data.content;
  try {
  } catch (error) {
    alert(error.message || "Something went wrong");
  }
};

document.addEventListener("DOMContentLoaded", fetchDetailsFromServer);
