const electron = require('electron');
const path = require('path');
const { BrowserWindow } = electron;



class MainWindow extends BrowserWindow {
    constructor(url, iconPath) {
        super({
            height: 500,
            width: 300,
            frame: false,
            icon : path.join(iconPath),
            resizable: false,
            show:false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                backgroundThrottling: false
            }
        });

        this.loadURL(url);
        this.on('blur', this.onBlur.bind(this));
    }
    
    //Controlling window focus
    onBlur(){
        this.hide();
    }
}

module.exports = MainWindow;