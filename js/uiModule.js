let uiModule = (function () {
  // Data Fields
  let DOMelements = {
    wpm: document.getElementById("wpm"),
    cpm: document.getElementById("cpm"),
    accuracy: document.getElementById("accuracy"),
    time: document.getElementById("time"),
    screen: document.getElementById("screen"),
    userInput: document.getElementById("userInput"),
  };

  // Private Methods
  function formatWords(words) {
    let result = "";
    // Wrapping every word in a span element
    for (let i = 0; i < words.length; i++) {
      // Wrapping every character in a span element
      let finalWord = "";
      for (let j = 0; j < words[i].length; j++) {
        finalWord += `<span>${words[i][j]}</span>`;
      }

      result += `<span>${finalWord} </span>`;
    }

    return result;
  }

  // Public Methods
  return {
    displayResults: function (data) {
      DOMelements.wpm.innerHTML = data.wpm;
      DOMelements.cpm.innerHTML = data.cpm;
      DOMelements.accuracy.innerHTML = Math.round(data.accuracy, 1);
      DOMelements.time.innerHTML = data.timeLeft;
    },

    displayRandomWords: function (words) {
      // Formatting the words
      words = formatWords(words);

      // Display it on the screen
      DOMelements.screen.innerHTML = words;
    },

    getUserInput: function () {
      return DOMelements.userInput.value;
    },

    clearInput: function () {
      DOMelements.userInput.value = "";
    },

    highlightWord: function (index) {
      DOMelements.screen.children[index].className = "active";
      if (index != 0) {
        DOMelements.screen.children[index - 1].className = "";
      }
    },

    colorChars: function (word) {
      for (let i = 0; i < word.word.length; i++) {
        if (word.word[i] == word.user[i]) {
          DOMelements.screen.children[word.wordIndex].children[i].className =
            "correct";
        } else if (word.user[i] == null) {
          DOMelements.screen.children[word.wordIndex].children[i].className =
            "";
        } else {
          DOMelements.screen.children[word.wordIndex].children[i].className =
            "wrong";
        }
      }
    },

    ifWordNotFinished: function (word) {
      if (word.word.length != word.user.length) {
        for (let i = word.user.length; i < word.word.length; i++) {
          DOMelements.screen.children[word.wordIndex].children[i].className =
            "wrong";
        }
      }
    },
  };
})();
