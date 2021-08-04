const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron') 

var winG;
var winN;

function createWindow () { 
  // Create the browser window. 
  winG = new BrowserWindow({ 
    width: 800, 
    height: 600, 
    webPreferences: { 
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    } 
  }) 
  
  // Load the index.html of the app. 
  //winG.loadFile('src/index.html') 
  winG.loadURL(`file://${__dirname}/src/index.html`)


  nativeTheme.themeSource = 'dark'
  
  // Open the DevTools. 
  //winG.webContents.openDevTools() 
} 
  
// This method will be called when Electron has finished 
// initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs. 
// This method is equivalent to 'app.on('ready', function())' 
app.whenReady().then(createWindow) 
  
// Quit when all windows are closed. 
app.on('window-all-closed', () => { 
  // On macOS it is common for applications and their menu bar 
  // to stay active until the user quits explicitly with Cmd + Q 
  if (process.platform !== 'darwin') { 
    app.quit() 
  } 
}) 
  
app.on('activate', () => { 
    // On macOS it's common to re-create a window in the  
    // app when the dock icon is clicked and there are no  
    // other windows open. 
  if (BrowserWindow.getAllWindows().length === 0) { 
    createWindow() 
  } 
}) 
  
// In this file, you can include the rest of your  
// app's specific main process code. You can also  
// put them in separate files and require them here. 


ipcMain.on('open-new-window', (event, fileName) => {
  winN = new BrowserWindow({ width:960, height:540, 
    webPreferences: { 
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    } })
  winN.loadURL(`file://${__dirname}/src/` + fileName + `/index.html`)
  winG.close()
  //win.loadURL('src/' + fileName + '/index.html')
})

ipcMain.on('back-window', (event) => {
  createWindow()
  winN.close()
  //win.loadURL('src/' + fileName + '/index.html')
})