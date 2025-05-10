async function fetchOrderBookings() {
  try {
    const res = await fetch(`/api/quotes/all_quotes`);

    if (!res.ok) throw new Error("Failed to fetch");

    const resData = await res.json();
    const { Data } = resData;

    renderDataDOM(Data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

const renderDataDOM = (Data) => {
  const tbody = document.getElementById("table-body");

  Data.map((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td >${item.fullName}</td>
        <td >${item.email}</td>
        <td >${item.mobile}</td>
        <td >${new Date(item.deliveryDate).toDateString()}</td>
        <td >${item.state}/${item.country}</td>
        <td ><button onclick="navigate('${
          item._id
        }')" class='table-btn'>View More</button></td>
    `;

    tbody.append(tr);
  });
};

const navigate = (id) => {
  window.location.href = `/api/quotes/single-quote?query=${id}`;
};

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
