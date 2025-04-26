const URI = "http://localhost:3000";

const fetchSingleContactData = async () => {
  try {
    const id = new URLSearchParams(window.location.search).get("query");

    const res = await fetch(`${URI}/api/contact/single_message/${id}`);
    if (!res.ok) throw new Error("Failed to fetch");

    const resData = await res.json();

    const detailsDiv = document.getElementById("details");

    const renderField = (label, value) => {
      return `
        <div class="detail">
          <span class="label">${label}:</span>
          <span class="value"> ${value}</span>
        </div>
      `;
    };

    const html = `
      ${renderField("Name", resData.name)}
      ${renderField("Email", resData.email)}
      ${renderField("Mobile", resData.mobile)}
      ${renderField("Subject", resData.subject)}
      ${renderField("Message", resData.message)}
      ${renderField(
        "Location",
        `${resData.city}, ${resData.state}, ${resData.country}`
      )}
    `;

    detailsDiv.innerHTML = html;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchSingleContactData);
document.addEventListener("DOMContentLoaded", function () {
  // Logout button
  const logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", () => {
    fetch("http://localhost:3000/api/auth/logout", {
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