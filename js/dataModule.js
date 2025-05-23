let dataModule = (function () {
  // Data fields
  let testIndicators = {
    totalTestTime: 60,
    timeLeft: null,
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    totalCorrectWords: 0,
    totalCorrectChars: 0,
    totalChars: 0,
    testStarted: false,
    testEnded: false,
  };

  // Test words
  let testWords = [];

  // Current word
  let currentWord = {
    word: [],
    user: [],
    wordIndex: -1,
  };

  // Private Methods
  function isCorrectWord(word) {
    for (let i = 0; i < word.word.length; i++) {
      if (word.word[i] !== word.user[i]) {
        return false;
      }
    }

    return true;
  }

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
        wpm: testIndicators.wpm,
        cpm: testIndicators.cpm,
        accuracy: testIndicators.accuracy,
      };
    },

    fillTestWords: function (words) {
      testWords = words;
    },

    countDown: function () {
      if (testIndicators.timeLeft == 0) {
        testIndicators.testEnded = true;
      } else {
        testIndicators.timeLeft--;
      }
    },

    provideInput: function (input) {
      currentWord.user = input.split("");
    },

    setActiveWord: function () {
      let index = ++currentWord.wordIndex;
      currentWord.word = testWords[index].split("");
      currentWord.user = [];
      return index;
    },

    getCurrentWord: function () {
      return {
        word: currentWord.word,
        user: currentWord.user,
        wordIndex: currentWord.wordIndex,
      };
    },

    calcWPM: function (word) {
      if (isCorrectWord(word)) {
        testIndicators.totalCorrectWords++;
      }

      testIndicators.wpm =
        testIndicators.totalCorrectWords / (testIndicators.totalTestTime / 60);
    },

    calcCPM: function (word) {
      if (isCorrectWord(word)) {
        testIndicators.totalCorrectChars += word.word.length;
      }

      testIndicators.totalChars += word.word.length;

      testIndicators.cpm =
        testIndicators.totalCorrectChars / (testIndicators.totalTestTime / 60);
    },

    calcAccuracy: function () {
      testIndicators.accuracy =
        (testIndicators.totalCorrectChars / testIndicators.totalChars) * 100;
    },

    getTestTimeStatus: function () {
      return {
        testStart: testIndicators.testStarted,
        testEnd: testIndicators.testEnded,
      };
    },

    startTest: function () {
      testIndicators.testStarted = true;
    },
  };
})();
