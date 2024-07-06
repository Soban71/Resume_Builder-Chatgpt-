document.addEventListener("DOMContentLoaded", () => {
  const resumeForm = document.querySelector("#resume-form");
  const downloadBtn = document.querySelector("#download-resume");

  // Handle form submission
  resumeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(resumeForm);

    // Convert form data to JSON
    const jsonData = JSON.stringify(Object.fromEntries(formData));

    // Save data to Local Storage
    localStorage.setItem("resume-data", jsonData);

    // Show message
    alert("Resume data saved to Local Storage!");
  });

  // Handle resume download
  downloadBtn.addEventListener("click", () => {
    // Get the resume data from local storage
    const resumeData = localStorage.getItem("resume-data");
    if (!resumeData) {
      alert("No resume data found. Please save your resume first.");
      return;
    }

    const resumeObj = JSON.parse(resumeData);

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set up margins and line height
    const leftMargin = 20;
    const lineHeight = 10;
    let y = 20;

    // Set up fonts
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Created with MSR Resume Builder", leftMargin, y);
    y += lineHeight * 2;

    // Personal Info Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Personal Info", leftMargin, y);
    y += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Full Name: ${resumeObj["full-name"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Email: ${resumeObj["email"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Phone: ${resumeObj["phone"]}`, leftMargin, y);
    y += lineHeight * 2;

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, 190, y);
    y += lineHeight * 1.5;

    // Work Experience Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Work Experience", leftMargin, y);
    y += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Company Name: ${resumeObj["company-name"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Job Title: ${resumeObj["job-title"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Start Date: ${resumeObj["start-date"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`End Date: ${resumeObj["end-date"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Job Description: ${resumeObj["job-description"]}`, leftMargin, y);
    y += lineHeight * 2;

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, 190, y);
    y += lineHeight * 1.5;

    // Education Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Education", leftMargin, y);
    y += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`School Name: ${resumeObj["school-name"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Degree: ${resumeObj["degree"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Field of Study: ${resumeObj["field-of-study"]}`, leftMargin, y);
    y += lineHeight;
    doc.text(`Graduation Date: ${resumeObj["graduation-date"]}`, leftMargin, y);
    y += lineHeight * 2;

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(leftMargin, y, 190, y);
    y += lineHeight * 1.5;

    // Skills Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Skills", leftMargin, y);
    y += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Skill: ${resumeObj["skill"]}`, leftMargin, y);
    y += lineHeight * 2;

    // Save the PDF
    doc.save("resume.pdf");
  });

  // Get the uploaded image file
  const profilePictureInput = document.querySelector("#profile-picture");
  const profilePictureFile = profilePictureInput.files[0];

  if (profilePictureFile) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageDataURI = event.target.result;

      // Convert Data URI to Blob
      const imageBlob = dataURItoBlob(imageDataURI);

      // Embed image in PDF
      const imageWidth = 50; // Adjust as needed
      const imageHeight = 50; // Adjust as needed
      doc.addImage(imageBlob, "JPEG", 10, y, imageWidth, imageHeight);

      // Save the PDF
      doc.save("resume.pdf");
    };
    reader.readAsDataURL(profilePictureFile);
  } else {
    // Save the PDF without the image
    doc.save("resume.pdf");
  }
});
