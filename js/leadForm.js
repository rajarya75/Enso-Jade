document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(this);

    // Prepare data according to the API schema
    const jsonData = {
      name: formData.get("name"),
      contactNumber: formData.get("phone"),
      email: formData.get("email"),
      interest: formData.get("enquiry"),
      status: "new",
      source: "Enso Jade",
      assignedTo: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      followUpDate: new Date().toISOString(),
      interestedPropertyId: formData.get("message"),
    };

    // Send data to the API using fetch
    fetch("https://qaapi.enso.inc/api/lead", {
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
