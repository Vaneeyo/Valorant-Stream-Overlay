const fs = require("fs");
const os = require("os");
const path = require("path");

// Configuration
const optionsPath = path.join(
  os.homedir(),
  "AppData",
  "Local",
  "valorant-stream-overlay",
  "options"
);

const options_stream = path.join(optionsPath, "autostart_streamingsoftware");
const options_discord = path.join(optionsPath, "discord_rpc");
const apiKeyPath = path.join(optionsPath, "api_key"); // Path for the API key

// Create optionsPath if it doesn't exist
if (!fs.existsSync(optionsPath)) {
  fs.mkdirSync(optionsPath);
}

// Write default options if they don't exist
const writeDefaultOption = (filePath, defaultValue) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultValue);
  }
};

writeDefaultOption(options_stream, "false");
writeDefaultOption(options_discord, "true");
writeDefaultOption(apiKeyPath, ""); // Default API key as empty

// Event listener for checkboxes
const toggleOption = (filePath, checkbox) => {
  checkbox.addEventListener('change', () => {
    fs.writeFileSync(filePath, checkbox.checked.toString());
  });
};

// Event listener for text inputs
const saveTextInput = (filePath, input) => {
  input.addEventListener('input', () => {
    fs.writeFileSync(filePath, input.value);
  });
};

// DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function (event) {
  const options_stream_checkbox = document.getElementById("autostart_streamingsoftware");
  const options_discord_rpc = document.getElementById("discord_rpc");
  const api_key_input = document.getElementById("api_key");

  options_stream_checkbox.checked = fs.readFileSync(options_stream, "utf-8") === "true";
  options_discord_rpc.checked = fs.readFileSync(options_discord, "utf-8") === "true";
  api_key_input.value = fs.readFileSync(apiKeyPath, "utf-8");

  toggleOption(options_stream, options_stream_checkbox);
  toggleOption(options_discord, options_discord_rpc);
  saveTextInput(apiKeyPath, api_key_input); // Save the API key on input change
});

// Transition to another page with animation
window.transitionToPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 500);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});

// Function to open URL in default browser
function openURL(url) {
  require("electron").shell.openExternal(
    url
  );
}
