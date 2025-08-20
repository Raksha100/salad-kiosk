const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,  // safer since you don’t need Node inside frontend
      contextIsolation: true,
    },
    title: "Saladific Café"
  });

  // Load deployed Netlify frontend
  win.loadURL('https://salad-kiosk.netlify.app/');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
