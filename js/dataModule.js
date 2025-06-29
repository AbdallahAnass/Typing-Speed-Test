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
      // Ending test if there is no time left
      if (testIndicators.timeLeft == 0) {
        testIndicators.testEnded = true;
      } else {
        // Decrement the time by 1s
        testIndicators.timeLeft--;
      }
    },

    provideInput: function (input) {
      // Splitting the user entered word into characters
      currentWord.user = input.split("");
    },

    setActiveWord: function () {
      // Setting index to the next word
      let index = ++currentWord.wordIndex;
      // Splitting the word into characters
      currentWord.word = testWords[index].split("");

      // Initializing user to empty array to store user input
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
      // Incrementing the total correct word if the word is correct
      if (isCorrectWord(word)) {
        testIndicators.totalCorrectWords++;
      }

      // Calculating WPM
      testIndicators.wpm =
        testIndicators.totalCorrectWords / (testIndicators.totalTestTime / 60);
    },

    calcCPM: function (word) {
      // Incrementing the total correct characters if the word is correct
      if (isCorrectWord(word)) {
        testIndicators.totalCorrectChars += word.word.length;
      }

      // Incrementing the total characters
      testIndicators.totalChars += word.word.length;

      // Calculating CPM
      testIndicators.cpm =
        testIndicators.totalCorrectChars / (testIndicators.totalTestTime / 60);
    },

    calcAccuracy: function () {
      // Calculating accuracy
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

    calcLevel: function () {
      // Determining the level and it's information based on the WPM of the user
      if (testIndicators.wpm <= 20) {
        return {
          level: 1,
          name: "Sloth",
          description: "Just starting, keep practicing!",
        };
      } else if (testIndicators.wpm <= 35) {
        return {
          level: 2,
          name: "Turtle",
          description: "Slow but steady progress.",
        };
      } else if (testIndicators.wpm <= 50) {
        return {
          level: 3,
          name: "Rabbit",
          description: "Decent speed, getting better!",
        };
      } else if (testIndicators.wpm <= 65) {
        return {
          level: 4,
          name: "Fox",
          description: "Above average, nice work!",
        };
      } else if (testIndicators.wpm <= 80) {
        return {
          level: 5,
          name: "Cheetah",
          description: "Fast typist, great job!",
        };
      } else if (testIndicators.wpm <= 100) {
        return {
          level: 6,
          name: "Rocket",
          description: "Professional-level speed!",
        };
      } else if (testIndicators.wpm <= 120) {
        return {
          level: 7,
          name: "Typing Bot",
          description: "Extremely fast, almost robotic!",
        };
      } else {
        return {
          level: 8,
          name: "T-REX",
          description: "	Elite typist, you dominate the keyboard!",
        };
      }
    },

    verifyUsername: function (name) {
      // Checking for a valid username
      if (name == "" || name == null) {
        return false;
      } else if (name.length > 30) {
        return false;
      }

      return true;
    },

    exceedWordLength: function (word) {
      if (word.word.length < word.user.length) {
        // Changing the user input to be empty
        word.user = [];
      }

      return word;
    },
  };
})();
