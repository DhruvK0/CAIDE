const { app, BrowserWindow, clipboard, Menu } = require('electron')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('src/TapDrillSizes.html')

  win.on('closed', function () {
    win = null;
  });

  // Add event listener to capture the selected text and copy to clipboard
  win.webContents.on('didFinishLoad', () => {
    win.webContents.on('system-context-menu', (_, params) => {
      const { selectionText } = params;

      if (selectionText && selectionText.trim() !== '') {
        const contextMenuTemplate = [
          {
            label: 'Copy',
            click: () => {
              clipboard.writeText(selectionText);
            },
          },
        ];

        const contextMenu = Menu.buildFromTemplate(contextMenuTemplate);
        contextMenu.popup({ window: win });
      }
    });
  });
}

// mainWindow.loadFile('TapDrillSizes.html')

app.whenReady().then(() => {
  createWindow()
})
// 

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') app.quit()
//   })