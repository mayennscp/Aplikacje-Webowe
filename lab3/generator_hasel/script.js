const minLengthInput = document.getElementById("min-length");
const maxLengthInput = document.getElementById("max-length");
const uppercaseCheckbox = document.getElementById("uppercase");
const specialCharsCheckbox = document.getElementById("special-chars");
const generateButton = document.getElementById("generate-btn");

generateButton.addEventListener("click", () => {
  const minLength = parseInt(minLengthInput.value);
  const maxLength = parseInt(maxLengthInput.value);
  const useUppercase = uppercaseCheckbox.checked;
  const useSpecialChars = specialCharsCheckbox.checked;

  const password = generatePassword(
    minLength,
    maxLength,
    useUppercase,
    useSpecialChars
  );
  alert(`Wygenerowane hasło: ${password}`);
});

function generatePassword(min, max, uppercase, special) {
  let charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  if (uppercase) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if (special) {
    charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  }

  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}
