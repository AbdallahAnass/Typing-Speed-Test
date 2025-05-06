let dataModule = (function () {
  // Data fields
  let testIndicators = {
    totalTestTime: 60,
    timeLeft: null,
    wps: null,
    cps: null,
    accuracy: null,
  };

  // Test words
  let testWords = [];

  // Private Methods

  // Public Methods
  return {
    initializeIndicators: function () {
      testIndicators.timeLeft = testIndicators.totalTestTime;
      testIndicators.wps = 0;
      testIndicators.cps = 0;
      testIndicators.accuracy = 0;
    },

    getResults: function () {
      return {
        timeLeft: testIndicators.timeLeft,
        wpm: testIndicators.wps,
        cpm: testIndicators.cps,
        accuracy: testIndicators.accuracy,
      };
    },

    fillTestWords: function (words) {
      testWords = words;
    },

    getTestWord: function () {
      return testWords;
    },

    countDown: function () {
      testIndicators.timeLeft--;
    },
  };
})();
