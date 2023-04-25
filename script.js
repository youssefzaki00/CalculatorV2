// Light/Dark themes
const toggleElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => toggleElement.classList.toggle("themes__toggle--isActive");

toggleElement.addEventListener("keydown", e => e.key === "Enter" && toggleDarkTheme())
toggleElement.addEventListener("click", toggleDarkTheme)

//  Logic for calculator

//  Use keyboard to type
