const { app, BrowserWindow } = require('electron')
const os = require('os');
const fs = require('fs');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 350,
    height: 150,
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