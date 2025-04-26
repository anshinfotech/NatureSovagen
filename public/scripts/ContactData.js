async function fetchContacts() {
  try {
    const res = await fetch(`/api/contact/all_messages`);
    if (!res.ok) throw new Error("Failed to fetch");

    const resData = await res.json();

    renderDataDOM(resData);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

const renderDataDOM = (Data) => {
  const tbody = document.getElementById("table-body");

  Data.map((item) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
          <td >${item.name}</td>
          <td >${item.email}</td>
          <td >${item.mobile}</td>
          <td >${item.state}/${item.country}</td>
          <td >${item.subject}</td>
          <td >${item.message}</td>
          <td ><button onclick="navigatePage('${item._id}')" class='table-btn'>View More</button></td>
      `;

    tbody.append(tr);
  });
};

const navigatePage = (id) => {
  window.location.href = `/api/contact/single-contact?query=${id}`;
};

document.addEventListener("DOMContentLoaded", fetchContacts);
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