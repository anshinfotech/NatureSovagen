const fetchSingleQuote = async () => {
  try {
    const id = new URLSearchParams(window.location.search).get("query");

    const res = await fetch(`/api/quotes/get_single_quote/${id}`);
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

      let table = "";

      Data.products.map((item, index) => {
        table += `
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">${index + 1}</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.product
            }</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.quantity
            }</td>
            <td style="border: 1px solid #ccc; padding: 8px;">${
              item.unit
            }</td>
          </tr>
        `;
      });

      const html = `
            ${renderField("Name", Data?.fullName)}
            ${renderField("Email", Data?.email)}
            ${renderField("Mobile", Data?.mobile)}
            ${renderField("Alternate Mobile", Data?.altMobile)}
            ${renderField("Company/Organization Name", Data?.company)}
            ${renderField(
              "Gender",
              Data?.gender === "male" ? "Male" : "Female"
            )}
            ${renderField(
              "Expected Delivery Date",
              new Date(Data?.deliveryDate).toDateString()
            )}
            ${renderField(
              "Location",
              `${Data?.landmark},${Data?.city}, ${Data?.state}, ${Data?.country}/${Data.postalCode}`
            )}
           <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
              <tr style="background-color: #f2f2f2;">
               <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Sr.</td>
               <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Product Name</td>
               <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Quantity</td>
               <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Unit</td>
              </tr>

              ${table}
           </table>
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
