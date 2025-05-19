let eventsModule = (function () {
  // Data fields
  let time = null;

  // Private Methods
  function handleUserEvents(e) {
    // Starting the test if it not already started
    if (!dataModule.getTestTimeStatus().testStart) {
      // Starting the time
      dataModule.startTest();

      // Displaying result every second
      time = setInterval(startTest, 1000);
    }
    // Getting user input
    let userInput = uiModule.getUserInput();

    // If user pressed any character (not space)
    if (e.key != " ") {
      // Adding input to data module
      dataModule.provideInput(userInput);

      // Setting colors for the current word in ui module
      let currentWord = dataModule.getCurrentWord();
      uiModule.colorChars(currentWord);
    } // If user pressed space
    else {
      let currentWord = dataModule.getCurrentWord();
      // Updating WPM (data module)
      dataModule.calcWPM(currentWord);

      // Updating CPM (data module)
      dataModule.calcCPM(currentWord);

      // Updating accuracy (data module)
      dataModule.calcAccuracy(currentWord);

      // If user didn't finish the word
      uiModule.ifWordNotFinished(currentWord);

      // Clearing input to take the next word
      uiModule.clearInput();

      // Setting the next word to active
      currentWord = dataModule.setActiveWord();

      // Highlighting the new active word
      uiModule.highlightWord(currentWord);
    }
  }

  function startTest() {
    dataModule.countDown();
    // Getting the result and displaying them on the screen
    let data = dataModule.getResults();
    uiModule.displayResults(data);
  }

  // Public Methods
  return {
    initializeTest: function () {
      // Initializing indicators
      dataModule.initializeIndicators();

      // Displaying indicators in the ui
      let data = dataModule.getResults();
      uiModule.displayResults(data);

      // Displaying random words array
      let wordsArray = wordsModule.getRandomArray();

      dataModule.fillTestWords(wordsArray);
      uiModule.displayRandomWords(wordsArray);

      // Making sure input filed is empty
      uiModule.clearInput();

      // Setting the active word to first word
      let currentWordIndex = dataModule.setActiveWord();
      uiModule.highlightWord(currentWordIndex);

      // Starting the test when user starts typing
      document.addEventListener("keyup", handleUserEvents);
    },
  };
})();
