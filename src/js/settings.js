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

// Event listener
const toggleOption = (filePath, checkbox) => {
  checkbox.addEventListener('change', () => {
    fs.writeFileSync(filePath, checkbox.checked.toString());
  });
};

// DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function (event) {
  const options_stream_checkbox = document.getElementById("autostart_streamingsoftware");
  const options_discord_rpc = document.getElementById("discord_rpc");

  options_stream_checkbox.checked = fs.readFileSync(options_stream, "utf-8") === "true";
  options_discord_rpc.checked = fs.readFileSync(options_discord, "utf-8") === "true";

  toggleOption(options_stream, options_stream_checkbox);
  toggleOption(options_discord, options_discord_rpc);
});



window.transitionToPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 500);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});

// function to open URL in default browser
function openURL(url) {
  require("electron").shell.openExternal(
    url
  );
}
