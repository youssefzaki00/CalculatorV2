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

const deleteButtonHandler = () => {
  if (!currentNumber) return;

  if (currentNumber === "0") return;

  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }

  updateScreen(currentNumber);
}

const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        currentNumber = "";
        updateScreen(storedNumber);
        break;
      case "/":
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
      case "c":
        resetButtonHandler();
        break;
      case "Backspace":
        deleteButtonHandler();
        break;
      case "Enter":
        executeOperation(resultElement);
        break;
      default:
        operationButtonHandler(element.dataset.value);
    }
  }
}));

//  Use keyboard to type
const availableNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
const availableOperations = ["+", "-", "*", "/"]
const availableKeys = [...availableNumbers, ...availableOperations, "Backspace", "Enter", "c"];

window.addEventListener("keydown", (event) => {
  // solution1(event.key);
  solution2(event.key);
})

const solution1 = (key) => {
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    executeOperation();
  }
};

const solution2 = (key) => {
  if (availableKeys.includes(key)) {
    const elem = document.querySelector(`[data-value="${key}"]`);

    elem.classList.add("hover");
    elem.click();
    setTimeout(() => elem.classList.remove("hover"), 100);
  }
}
