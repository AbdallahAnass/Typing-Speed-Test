const { jsPDF } = window.jspdf;

let cerModule = (function () {
  // Data fields
  let img = new Image();
  let pageCenter = 279.4 / 2;
  let primaryColor = "#188ba3";
  let secondaryColor = "#000000";

  // Private Methods
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("image is not loaded"));
      img.src = src;
    });
  }

  // Public methods
  return {
    generateCertificate: async function (name, wpm, cpm, accuracy) {
      // PDF object
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [279.4, 215.9],
      });

      // Adding border image source
      img = await loadImage(`images/border.jpg`);

      // Adding border to the certification
      doc.addImage(img, "JPG", 0, 0, 279.4, 215.9);

      // Title text
      doc.setFontSize(30);
      doc.setTextColor(primaryColor);
      doc.text("Typing Skills Certificate", pageCenter, 40, "center");

      // Body text up parts
      doc.setFontSize(16);
      doc.setTextColor(secondaryColor);
      doc.text("This document hereby certifies that", pageCenter, 80, "center");

      // User's name
      doc.setFontSize(30);
      doc.setTextColor(primaryColor);
      doc.text(name, pageCenter, 100, "center");

      // details and date section
      let date = new Date();
      date = `${date.getFullYear()}/${date.getDate()}/${date.getMonth()}`;
      let lastSectionString = `has successfully completed a certified Typing Skills\n Test on ${date}, with the following proficiency`;

      doc.setFontSize(16);
      doc.setTextColor(secondaryColor);
      doc.text(lastSectionString, pageCenter, 120, "center");

      // Status section

      // Three circles
      doc.setDrawColor(primaryColor);
      doc.setLineWidth(1);
      doc.circle(80, 170, 20);
      doc.circle(140, 170, 20);
      doc.circle(200, 170, 20);

      // WPM
      doc.setTextColor(primaryColor);
      doc.setFont("times", "italic");
      doc.text("Word per minute", 80, 145, "center");

      doc.setFontSize(30);
      doc.setFont("times", "bold");
      doc.text(String(wpm), 80, 170, "center");

      doc.setFontSize(20);
      doc.text("WPM", 80, 180, "center");

      // CPM
      doc.setFont("times", "italic");
      doc.text("character per minute", 140, 145, "center");
      doc.setFontSize(30);
      doc.setFont("times", "bold");
      doc.text(String(cpm), 140, 170, "center");

      doc.setFontSize(20);
      doc.text("CPM", 140, 180, "center");

      // Accuracy
      doc.setFont("times", "italic");
      doc.text("Accuracy", 200, 145, "center");

      doc.setFontSize(30);
      doc.setFont("times", "bold");
      // Rounding accuracy
      accuracy = Math.round(accuracy, 1);
      doc.text(String(accuracy) + "%", 200, 172, "center");

      // Saving the certification
      doc.save("certificate.pdf");
    },
  };
})();
