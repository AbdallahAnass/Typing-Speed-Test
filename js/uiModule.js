let uiModule = (function () {
  // Data Fields
  let DOMelements = {
    wpm: document.getElementById("wpm"),
    cpm: document.getElementById("cpm"),
    accuracy: document.getElementById("accuracy"),
    time: document.getElementById("time"),
  };

  // Private Methods

  // Public Methods
  return {
    displayResults: function (data) {
      DOMelements.wpm.innerHTML = data.wpm;
      DOMelements.cpm.innerHTML = data.cpm;
      DOMelements.accuracy.innerHTML = data.accuracy;
      DOMelements.time.innerHTML = data.timeLeft;
    },
  };
})();
