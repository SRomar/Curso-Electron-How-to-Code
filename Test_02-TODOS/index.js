const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain } = electron; 

let mainWindow;
let addWindow;


app.on('ready', ()=> {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/mainWindow.html`);
    mainWindow.on('closed', () => app.quit()); //Quit application if mainWindow closes

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

function createAdddWindow(){
    addWindow = new BrowserWindow({
        width: 500,
        height: 500,
        title: 'Add New Todo',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });
    addWindow.loadURL(`file://${__dirname}/add.html`)
    addWindow.on('closed', () => addWindow = null);//Best practice to close windows
}

ipcMain.on('todo:add', (event, todo) => {
    
    mainWindow.webContents.send('todo:add', todo);
    addWindow.close();
});

const menuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'New todo',
                click() {createAdddWindow()}
            },
            {
                label: 'Clear todos',
                click() {
                    mainWindow.webContents.send('todo:clear');
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }

        ]
    }
];

//Differentiate between windows and macOS
if (process.platform === 'darwin'){
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production'){
    menuTemplate.push({
        label:'Developer',

        // add pre-defined shortcuts
        submenu: [
            { role: 'reload'},
            
            // make shortcuts by hand
            {
                label: 'Toggle Developers Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}
