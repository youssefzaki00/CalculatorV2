// Light/Dark themes
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => toggleElement.classList.toggle("themes__toggle--isActive");

toggleElement.addEventListener("keydown", event => event.key === "Enter" && toggleDarkTheme())
toggleElement.addEventListener("click", toggleDarkTheme);

// create logic for calculator
const resultElement = document.querySelector('.calc__result');
const keyElements = document.querySelectorAll("[data-type]");

let storedNumber = "";
let currentNumber = "";
let operation = "";

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber = currentNumber + value;
  updateScreen(currentNumber);
}

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
}

const resetButtonHandler = () => {
  storedNumber = "";
  currentNumber = "";
  updateScreen(currentNumber);
}

const deleteButtonHandler = (value) => {
  if(!currentNumber) return;

  if (value === "0") return;

  if (value.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = value.substring(0, value.length - 1);
  }

  updateScreen(currentNumber);
}

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "plus":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
      case "minus":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
      case "multiply":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
      case "divide":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
    }
  }
}

const operationButtonHandler = (operationValue) => {
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;

    if (currentNumber) executeOperation();
  }
}

keyElements.forEach(element => element.addEventListener("click", () => {
  if (element.dataset.type === "number") {
    numberButtonHandler(element.dataset.value)
  } else if (element.dataset.type === "operation") {
    switch (element.dataset.value) {
      case "reset":
        resetButtonHandler();
        break;
      case "delete":
        deleteButtonHandler(currentNumber);
      case "equal":
        executeOperation(resultElement);
        break;
      default:
        operationButtonHandler(element.dataset.value);
    }
  }
}));

//  Use keyboard to type
