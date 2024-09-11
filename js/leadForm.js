// Contact Form
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("name").value;
    const phoneNumber = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const enquiryType = document.getElementById("enquiry").value;
    const message = document.getElementById("message").value;

    const data = {
      name: fullName,
      email: email,
      mobileCode: "+971",
      contactNumber: phoneNumber,
      message: message,
      typeOfEnquiry: enquiryType,
      from: "Enso Jade",
    };

    // Send data to the API using fetch
    fetch("https://betaapi.enso.inc/api/website/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // On success, hide the form and show the success message
        document.getElementById("contactForm").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
      })
      .catch((error) => {
        // Handle error - maybe show an error message
        console.error("Error:", error);
      });
  });

// Download Brochure ==============================================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".downloadBrochure");
  const submitButton = form.querySelector(".thankYouTrigger");
  const requiredFields = form.querySelectorAll("[required]");

  // Function to check if all required fields are filled
  // function checkFormValidity() {
  //   let allValid = Array.from(requiredFields).every(
  //     (field) => field.value.trim() !== ""
  //   );
  //   submitButton.disabled = !allValid;
  //   submitButton.classList.toggle("invalid", !allValid);
  // }

  // Attach input event listeners to all required fields
  // requiredFields.forEach((field) =>
  //   field.addEventListener("input", checkFormValidity)
  // );
  // checkFormValidity();

  // Function to handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const jsonData = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobileCode: "+971",
      contactNumber: formData.get("phone"),
      message: formData.get("message"),
      typeOfEnquiry: formData.get("enquiry"),
      from: "Ensojade",
    };

    // Send the form data to the API
    fetch("https://betaapi.enso.inc/api/website/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          // Adjust based on your API response
          // Hide form and open thank you modal
          document.getElementById("brochureForm").style.display = "none";

          document.getElementById("popupForm1").style.display = "flex";

          // Open PDF in new tab
          window.open("/image/brochure/Enso_Jade_Brochure.pdf", "_blank");
        } else {
          alert("There was an issue with your submission. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
