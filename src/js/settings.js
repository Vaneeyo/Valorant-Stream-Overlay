const fs = require("fs");
const os = require("os");
const path = require("path");

const optionsPath = path.join(
  os.homedir(),
  "AppData",
  "Local",
  "valorant-stream-overlay",
  "options"
);

const options_stream =
  optionsPath + "\\autostart_streamingsoftware";

if (!fs.existsSync(optionsPath)) {
  fs.mkdirSync(optionsPath);
}

if (!fs.existsSync(options_stream)) fs.writeFileSync(options_stream, "false");

document.addEventListener("DOMContentLoaded", function (event) { 
  const options_stream_checkbox = document.getElementById("autostart_streamingsoftware")
  options_stream_checkbox.checked = fs.readFileSync(options_stream, "utf-8") === "true";

  options_stream_checkbox.addEventListener('change', (event) => {
    fs.writeFileSync(options_stream, options_stream_checkbox.checked.toString());
  })
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

function openProject() {
  require("electron").shell.openExternal(
    "https://github.com/Vaneeyo/Valorant-Stream-Overlay"
  );
}
