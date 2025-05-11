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

      testIndicators.cpm =
        testIndicators.totalCorrectChars / (testIndicators.totalTestTime / 60);
    },
  };
})();
