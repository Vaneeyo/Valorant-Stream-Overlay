window.transitionToPage = function (href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function () {
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelector('body').style.opacity = 1
})

const fs = require('fs');
const os = require('os');
const path = require('path');

// getting the directory where data/preferences are saved
const folderPath = path.join(os.homedir(), 'AppData', 'Local', 'valorant-stream-overlay');

const regionFile = folderPath + "/region";
const nameFile = folderPath + "/name";
const tagFile = folderPath + "/tag"

document.addEventListener("DOMContentLoaded", function () {
    if (fs.existsSync(regionFile)) document.getElementById("region").value = fs.readFileSync(regionFile, 'utf-8');
    if (fs.existsSync(nameFile)) document.getElementById("name").value = fs.readFileSync(nameFile, 'utf-8');
    if (fs.existsSync(tagFile)) document.getElementById("tag").value = fs.readFileSync(tagFile, 'utf-8');
});

function showError(text)
{
    document.getElementById("error").style.visibility = "visible";
    document.getElementById("error").style.position = "relative";
    document.getElementById("error").innerHTML = text;

}

async function go() {
    const apikey = fs.readFileSync(path.join(folderPath, "options", "api_key"), "utf-8");
    if (apikey === "")
    {
        showError("API Key missing.")
        return;
    }

    const name = document.getElementById("name").value;
    if (name === "") {
        showError("Name missing.")
        return;
    }

    const tag = document.getElementById("tag").value;

    if (tag === "") {
        showError("Tag missing.")
        return;
    }

    const region = document.getElementById("region").value;
    const url = `https://api.henrikdev.xyz/valorant/v2/mmr/${region}/${name}/${tag}`
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": apikey
        }
    });
    const data = await response.json();

    if (data.status != 200) {
        showError("Something went wrong.")
    } else {
        fs.writeFileSync(regionFile, region)
        fs.writeFileSync(nameFile, name)
        fs.writeFileSync(tagFile, tag)

        transitionToPage(`./overlay.html?region=${region}&name=${name}&tag=${tag}&key=${apikey}`)
    }
}
