const {ipcRenderer} = require('electron');

var arquivo = document.getElementById('Arquivo');
var discord = document.getElementById('Discord');

arquivo.addEventListener('click', () => {
  ipcRenderer.send('open-new-window', 'arquivo');
}, false);

discord.addEventListener('click', () => {
  ipcRenderer.send('open-new-window', 'discord');
}, false);
