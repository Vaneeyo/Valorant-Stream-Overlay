const { app, BrowserWindow } = require('electron')
const os = require('os');
const fs = require('fs');
const path = require('path');
const DiscordRPC = require('discord-rpc');
const { type } = require('process');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 350,
    height: 200,
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
  })

  win.loadFile('./src/start.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// get valorant-stream-overlay directory from local appdata directory
const folderPath = path.join(os.homedir(), 'AppData', 'Local', 'valorant-stream-overlay');

// create the valorant-stream-overlay directory if it doesnt exist
if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const startTimestamp = new Date();

const rpc = new DiscordRPC.Client({ transport: 'ipc' });

const clientId = '1142956480660774922';

async function setActivity() {
  if (fs.readFileSync(folderPath + "\\options\\discord_rpc", "utf-8") == "false")
    return;

  rpc.setActivity({
    details: `v0.0.4`,
    startTimestamp,
    largeImageKey: 'logo',
    largeImageText: 'Valorant Stream Overlay',
    instance: false,
    buttons: [
      { label: "Repository", url: "https://github.com/Vaneeyo/Valorant-Stream-Overlay"}
    ]
  });
}

rpc.on('ready', () => {
  setActivity();

  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);


