// Contact Form
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(this);

    // Prepare data according to the API schema
    const jsonData = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobileCode: "+971",
      contactNumber: formData.get("phone"),
      message: formData.get("message"),
      typeOfEnquiry: formData.get("enquiry"),
      from: "Enso Jade",
    };

    // Send data to the API using fetch
    fetch("https://betaapi.enso.inc/api/website/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          document.querySelector(".w-form-done").style.display = "block";
          document.querySelector(".w-form-fail").style.display = "none";
          document.getElementById("contactForm").reset();
        } else {
          document.querySelector(".w-form-fail").style.display = "block";
          document.querySelector(".w-form-done").style.display = "none";
          document.getElementById("responseMessage").textContent =
            data.message || "Submission failed.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.querySelector(".w-form-fail").style.display = "block";
        document.querySelector(".w-form-done").style.display = "none";
        document.getElementById("responseMessage").textContent =
          "Oops! Something went wrong while submitting the form.";
      });
  });

// Download Brochure ==============================================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".downloadBrochure");
  const submitButton = form.querySelector(".thankYouTrigger");
  const requiredFields = form.querySelectorAll("[required]");

  // Function to check if all required fields are filled
  function checkFormValidity() {
    let allValid = Array.from(requiredFields).every(
      (field) => field.value.trim() !== ""
    );
    submitButton.disabled = !allValid;
    submitButton.classList.toggle("invalid", !allValid);
  }

  // Attach input event listeners to all required fields
  requiredFields.forEach((field) =>
    field.addEventListener("input", checkFormValidity)
  );
  checkFormValidity(); // Initial validity check

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
      from: "Contact Us",
    };

    // Send the form data to the API
    fetch("https://betaapi.enso.inc/api/website/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          openModal();
          triggerPDFDownload();
          form.reset();
          submitButton.classList.remove("active-class");
          checkFormValidity(); // Reset button state after form reset
        } else {
          handleFormError(data.message || "Submission failed.");
        }
      })
      .catch(() =>
        handleFormError("Oops! Something went wrong while submitting the form.")
      );
  });

  // Function to handle form submission errors
  function handleFormError(message) {
    console.error("Error:", message);
    alert(message); // Use your custom modal or message handling here
  }

  // Function to trigger PDF download
  function triggerPDFDownload() {
    const pdfUrl = "https://ensojade.com/image/brochure/Jade_%20Brochure.pdf";
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "Jade_Brochure.pdf"; // The name of the downloaded file
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Function to open the modal
  function openModal() {
    // Add your code to open the modal here
    alert("Thank you! Your brochure will download shortly."); // Replace this with your custom modal code
  }
});
