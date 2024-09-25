const passwordScreen = document.querySelector(".password-display__screen");
const copyMessage = document.querySelector(".password-copy__message");
const passwordLengthDisplay = document.querySelector(
  ".password-generator-length"
);
const difficultyText = document.querySelector(".difficulty-text");
const difficultyBars = document.querySelectorAll(".difficulty-bar");

const copyIcon = document.querySelector(".password__copy-icon");
const range = document.querySelector(".password-generator__range");
const optionsContainer = document.querySelector(".options");
const generatePasswordBtn = document.querySelector(".generate-btn");

const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+{}[]|:;<>,.?/";

let generatedPassword = "";
let passwordLength = 0;
let containsLowercase = false;
let containsUppercase = false;
let containsNumbers = false;
let containsSymbols = false;

function generatePassword(
  passwordLength,
  containsLowercase,
  containsUppercase,
  containsNumbers,
  containsSymbols
) {
  generatedPassword = "";
  let availableCharacters = "";
  availableCharacters += containsLowercase ? lowercaseLetters : "";
  availableCharacters += containsUppercase ? uppercaseLetters : "";
  availableCharacters += containsNumbers ? numbers : "";
  availableCharacters += containsSymbols ? symbols : "";

  if (
    containsLowercase ||
    containsUppercase ||
    containsNumbers ||
    containsSymbols
  ) {
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword +=
        availableCharacters[
          Math.floor(Math.random() * availableCharacters.length)
        ];
    }
  }

  passwordScreen.value = generatedPassword;
}

function passwordStrength(length, lowercase, uppercase, numbers, symbols) {
  let options = 0;
  options = lowercase + uppercase + numbers + symbols;

  difficultyBars.forEach((bar) => {
    bar.style.backgroundColor = "transparent";
  });

  let barsToColor = 0;
  if (options === 4 && length >= 12) {
    barsToColor = 4;
    difficultyText.style.color = "#A4FFAF";
    difficultyText.textContent = "STRONG";
  } else if (options >= 3 && length >= 8) {
    barsToColor = 3;
    difficultyText.style.color = "#F8CD65";
    difficultyText.textContent = "MEDIUM";
  } else if (options >= 2 && length >= 6) {
    barsToColor = 2;
    difficultyText.style.color = "#FB7C58";
    difficultyText.textContent = "WEAK";
  } else if (options >= 1 && length > 0) {
    barsToColor = 1;
    difficultyText.style.color = "#F64A4A";
    difficultyText.textContent = "TOO WEAK";
  } else {
    difficultyText.textContent = "";
  }

  difficultyBars.forEach((bar, index) => {
    if (index < barsToColor) {
      if (barsToColor === 4) bar.style.backgroundColor = "#A4FFAF";
      else if (barsToColor === 3) bar.style.backgroundColor = "#F8CD65";
      else if (barsToColor === 2) bar.style.backgroundColor = "#FB7C58";
      else if (barsToColor === 1) bar.style.backgroundColor = "#F64A4A";
    }
  });
}

copyIcon.addEventListener("click", () => {
  navigator.clipboard.writeText(generatedPassword).then(() => {
    copyMessage.textContent = "Copied";
    setTimeout(() => {
      copyMessage.textContent = "";
    }, 2000);
  });
});

range.addEventListener("input", (e) => {
  const value = e.target.value;
  const max = e.target.max;
  passwordLengthDisplay.textContent = e.target.value;
  passwordLength = value;
  const percentage = (value / max) * 100;
  e.target.style.setProperty("--slider-value", `${percentage}%`);
  passwordStrength(
    passwordLength,
    containsLowercase,
    containsUppercase,
    containsNumbers,
    containsSymbols
  );
});

optionsContainer.addEventListener("change", (e) => {
  if (e.target.classList.contains("option-checkbox")) {
    const checkbox = e.target;
    switch (checkbox.getAttribute("data-password")) {
      case "lowercase":
        containsLowercase = checkbox.checked;
        break;
      case "uppercase":
        containsUppercase = checkbox.checked;
        break;
      case "numbers":
        containsNumbers = checkbox.checked;
        break;
      case "symbols":
        containsSymbols = checkbox.checked;
        break;
    }
    const checkboxContainer = checkbox.closest(".option-checkbox-container");
    const checkMark = checkboxContainer.querySelector(".check-mark");
    if (checkbox.checked) checkMark.style.display = "block";
    else checkMark.style.display = "none";
    passwordStrength(
      passwordLength,
      containsLowercase,
      containsUppercase,
      containsNumbers,
      containsSymbols
    );
  }
});

generatePasswordBtn.addEventListener("click", () => {
  generatePassword(
    passwordLength,
    containsLowercase,
    containsUppercase,
    containsNumbers,
    containsSymbols
  );
});
