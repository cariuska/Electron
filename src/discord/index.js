const { ipcRenderer } = require('electron'); 


var back = document.getElementById('back'); 

back.addEventListener('click', () => {
    ipcRenderer.send('back-window');
  }, false);