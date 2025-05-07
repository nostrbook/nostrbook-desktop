const { ipcRenderer } = require('electron');

document.getElementById('minimize').addEventListener('click', () => {
    ipcRenderer.send('minimize');
});

document.getElementById('maximize').addEventListener('click', () => {
    ipcRenderer.send('maximize');
});

document.getElementById('close').addEventListener('click', () => {
    ipcRenderer.send('close');
});
