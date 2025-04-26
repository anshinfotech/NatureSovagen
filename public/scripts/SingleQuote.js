const URI = "http://localhost:3000";

const fetchSingleQuote = async () => {
  try {
    const id = new URLSearchParams(window.location.search).get("query");

    const res = await fetch(`${URI}/api/quotes/get_single_quote/${id}`);
    if (!res.ok) throw new Error("Failed to fetch");

    const { Data, success, message } = await res.json();

    if (success) {
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
            ${renderField("Name", Data?.fullName)}
            ${renderField("Email", Data?.email)}
            ${renderField("Mobile", Data?.mobile)}
            ${renderField("Alternate Mobile", Data?.altMobile)}
            ${renderField("Company/Organization Name", Data?.company)}
            ${renderField("Gender", Data?.gender === "male" ? "Male" : "Female")}
            ${renderField(
              "Expected Delivery Date",
              new Date(Data?.deliveryDate).toDateString()
            )}
            ${renderField(
              "Location",
              `${Data?.landmark},${Data?.city}, ${Data?.state}, ${Data?.country}/${Data.postalCode}`
            )}
            ${renderField("Ordered Products Details", Data?.products.join(", "))}
          `;

      detailsDiv.innerHTML = html;
    } else {
      throw new Error(message);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

document.addEventListener("DOMContentLoaded", fetchSingleQuote);
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