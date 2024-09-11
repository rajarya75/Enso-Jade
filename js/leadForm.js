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
document
  .getElementById("downloadBrochure")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather form data
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

    // Send the form data to the API
    fetch("https://betaapi.enso.inc/api/website/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          document.getElementsByClassName("downloadBrochure").style.display =
            "none";

          document.getElementById("popupForm").style.display = "none";
          document.getElementById("popupForm1").style.display = "flex";
          window.open("/image/brochure/Enso_Jade_Brochure.pdf", "_blank");
        } else {
          alert("There was an issue with your submission. Please try again.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
