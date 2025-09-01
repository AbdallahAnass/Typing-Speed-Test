let uiModule = (function () {
  // Data Fields
  let DOMelements = {
    wpm: document.getElementById("wpm"),
    cpm: document.getElementById("cpm"),
    accuracy: document.getElementById("accuracy"),
    time: document.getElementById("time"),
    screen: document.querySelector(".container"),
    userInput: document.getElementById("userInput"),
    cerForm: document.getElementById("cerForm"),
    username: document.getElementById("username"),
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

  function centerWord() {
    // Getting element's heights for measuring
    let wordHeight = document.querySelector(".active").offsetTop;

    // Getting padding of the container
    let container = document.querySelector("#screen");

    let padding = window
      .getComputedStyle(container)
      .getPropertyValue("padding")
      .replace("px", "");

    padding = parseInt(padding);

    // Calculating the total move for the word
    wordHeight -= padding;

    // Moving the text
    DOMelements.screen.style.transform = `translateY(-${wordHeight}px)`;
  }

  // Public Methods
  return {
    displayResults: function (data) {
      // Changing UI elements to display new results
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
      // Getting user input
      return DOMelements.userInput.value;
    },

    clearInput: function () {
      // Clearing the input field
      DOMelements.userInput.value = "";
    },

    highlightWord: function (index) {
      // Highlighting the active word
      DOMelements.screen.children[index].className = "active";
      if (index != 0) {
        DOMelements.screen.children[index - 1].className = "";
      }

      // Centering the active word vertically
      centerWord();
    },

    colorChars: function (word) {
      // Setting character color based on right and wrong
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
      // Setting the word as wrong if user didn't finish typing the word to the end
      if (word.word.length != word.user.length) {
        for (let i = word.user.length; i < word.word.length; i++) {
          DOMelements.screen.children[word.wordIndex].children[i].className =
            "wrong";
        }
      }
    },

    displayForm: function (data) {
      // Filling level name
      cerForm.children[0].children[0].innerHTML = data.name;

      // Adding the image
      cerForm.children[1].setAttribute("src", `/images/l${data.level}.jpg`);

      // Filling level description
      cerForm.children[2].innerHTML = data.description;

      cerForm.style.display = "flex";
    },

    timerAnimation: function (timeLeft) {
      // Calculating the degree
      let currentDegree = 360 - (60 - timeLeft) * 6;

      // Updating the degree variable
      document.documentElement.style.setProperty(
        "--degree",
        `${currentDegree}deg`
      );
    },

    getUsername: function () {
      // Getting value of username
      return DOMelements.username.value;
    },

    wrongUsername: function () {
      // Red border on input field
      DOMelements.username.style.border = "5px solid red";

      // Invalid input message
      let message =
        "Username name must not be empty or more than 30 characters";

      let errorElement = document.createElement("div");
      errorElement.innerHTML = message;

      errorElement.setAttribute("class", "error");

      // Inserting the error node to the form before the input field
      DOMelements.cerForm.insertBefore(errorElement, DOMelements.username);
    },

    renderRetake: function () {
      // Rendering the retake button
      let retake = document.createElement("button");
      retake.innerHTML = "Retake test";

      // Adding an id
      retake.setAttribute("id", "retake");

      // Adding the element to the Form
      DOMelements.cerForm.appendChild(retake);
    },

    reloadPage: function () {
      // Reloading page
      location.reload();
    },

    renderLoadingSpinner: function () {
      // Creating the spinner element
      let element = document.createElement("span");
      element.className = "loader";

      // Getting the generate button index
      let btnIndex =
        DOMelements.cerForm.children[DOMelements.cerForm.children.length - 1];

      // Removing the generate Button
      DOMelements.cerForm.children[
        DOMelements.cerForm.children.length - 1
      ].remove();

      // Adding the spinner
      DOMelements.cerForm.append(element);
    },

    stopSpinner: function () {
      // Removing the generate Button
      DOMelements.cerForm.children[
        DOMelements.cerForm.children.length - 1
      ].remove();
    },
  };
})();
