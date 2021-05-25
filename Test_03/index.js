const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray')
const MainWindow = require('./app/main_window')


const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
    //app.dock.hide();
    const iconName = process.platform === 'win32' ? 'windows-icon.ico' : 'macos-icon.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    mainWindow = new MainWindow(`file://${__dirname}/src/index.html`, iconPath);    

    tray = new TimerTray(iconPath, mainWindow);
    
});

