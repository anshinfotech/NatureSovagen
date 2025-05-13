async function fetchProducts() {
  try {
    const pTag = document.getElementById("products");
    const res = await fetch(`/api/products`);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    const { products } = data.data;

    pTag.innerText = products.length ? products.length : "0";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function fetchContacts() {
  try {
    const cTag = document.getElementById("contacts");
    const res = await fetch(`/api/contact/all_messages`);
    if (!res.ok) throw new Error("Failed to fetch");

    const resData = await res.json();

    cTag.innerText = resData.length > 0 ? resData.length : "0";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

async function fetchOrderBookings() {
  try {
    const oTag = document.getElementById("orders");
    const res = await fetch(`/api/quotes/all_quotes`);

    if (!res.ok) throw new Error("Failed to fetch");

    const resData = await res.json();
    const { Data } = resData;


    oTag.innerText = Data.length > 0 ? Data.length : "0";
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProducts);
document.addEventListener("DOMContentLoaded", fetchContacts);
document.addEventListener("DOMContentLoaded", fetchOrderBookings);
document.addEventListener("DOMContentLoaded", function () {
  // Logout button
  const logoutBtn = document.getElementById("logout");
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
});