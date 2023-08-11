const fs = require('fs');
const os = require('os');
const path = require('path');

// getting the directory where data/preferences are saved
const folderPath = path.join(os.homedir(), 'AppData', 'Local', 'valorant-stream-overlay');
    
const regionFile = folderPath + "/region";
const nameFile = folderPath + "/name";
const tagFile = folderPath + "/tag"

document.addEventListener("DOMContentLoaded", function() {
    if (fs.existsSync(regionFile)) document.getElementById("region").value = fs.readFileSync(regionFile, 'utf-8');
    if (fs.existsSync(nameFile)) document.getElementById("name").value = fs.readFileSync(nameFile, 'utf-8');
    if (fs.existsSync(tagFile)) document.getElementById("tag").value = fs.readFileSync(tagFile, 'utf-8');
});
    
    
async function go() {
    const name = document.getElementById("name").value;
    const tag = document.getElementById("tag").value;
    const region = document.getElementById("region").value;
    const url = `https://api.henrikdev.xyz/valorant/v1/mmr/${region}/${name}/${tag}`
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status != 200 || name == "" || tag == "" ) {
        document.getElementById("error").style.visibility = "visible";
        document.getElementById("error").style.position = "relative";
    } else {
        fs.writeFileSync(regionFile, region)
        fs.writeFileSync(nameFile, name)
        fs.writeFileSync(tagFile, tag)
        window.location.href = `./overlay.html?region=${region}&name=${name}&tag=${tag}`
    }
}
