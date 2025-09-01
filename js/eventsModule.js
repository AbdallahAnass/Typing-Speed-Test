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

      // If user input exceeds the actual word length sets the word as empty (wrong)
      currentWord = dataModule.exceedWordLength(currentWord);

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
    // Starting time count down
    dataModule.countDown();

    // Getting the result and displaying them on the screen
    let data = dataModule.getResults();
    uiModule.displayResults(data);

    // Timer animation
    uiModule.timerAnimation(data.timeLeft);

    // Checking the end of test
    if (dataModule.getTestTimeStatus().testEnd) {
      // Ending the test if time is over
      endTest();
    }
  }

  function endTest() {
    // Ending the input and result displaying
    clearInterval(time);
    document.removeEventListener("keyup", handleUserEvents);

    // Calculating level
    let level = dataModule.calcLevel();

    // Displaying result form
    uiModule.displayForm(level);
  }

  async function showCertification() {
    // Getting user name
    let username = uiModule.getUsername();

    // Getting all the information for the certificate
    let data = dataModule.getResults();

    // Generating the certification after verifying username
    if (dataModule.verifyUsername(username)) {
      // Display the loading spinner
      uiModule.renderLoadingSpinner();

      // Starting the generation of the certificate
      await cerModule.generateCertificate(
        username,
        data.wpm,
        data.cpm,
        data.accuracy
      );

      // removing the spinner after generation is done
      uiModule.stopSpinner();

      // Render retake test button
      uiModule.renderRetake();

      // Adding an eventListener to the retake button
      document
        .getElementById("retake")
        .addEventListener("click", uiModule.reloadPage);
    } else {
      uiModule.wrongUsername();
    }
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

      // Adding an event listener to generate button
      document
        .getElementById("generate")
        .addEventListener("click", showCertification);
    },
  };
})();
