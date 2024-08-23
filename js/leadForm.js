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

  function checkFormValidity() {
    let allValid = true;
    requiredFields.forEach(function (field) {
      if (!field.value.trim()) {
        allValid = false;
      }
    });

    if (allValid) {
      submitButton.classList.remove("invalid");
    } else {
      submitButton.classList.add("invalid");
    }
  }

  requiredFields.forEach(function (field) {
    field.addEventListener("input", checkFormValidity);
  });

  // Initial check in case the user has autofill enabled
  checkFormValidity();

  form.addEventListener("submit", function (event) {
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
          form.reset();
          submitButton.classList.remove("active-class");

          // Add a delay before triggering PDF download
          setTimeout(() => {
            const pdfUrl =
              "https://ensojade.com/image/brochure/Jade_%20Brochure.pdf";
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = "Jade_Brochure.pdf"; // The name of the downloaded file
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }, 500); // Delay in milliseconds
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
});
