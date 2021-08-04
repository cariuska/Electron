const { remote, ipcRenderer } = require('electron'); 
const path = require('path'); 
const fs = require('fs'); 


// Importing dialog module using remote 
const dialog = remote.dialog; 

var back = document.getElementById('back'); 

back.addEventListener('click', () => {
    ipcRenderer.send('back-window');
  }, false);
  
var save = document.getElementById('save'); 
  
save.addEventListener('click', (event) => { 
    // Resolves to a Promise<Object> 

    dialog.showSaveDialog({ 
        title: 'Select the File Path to save', 
        defaultPath: path.join(__dirname, '../assets/sample.txt'), 
        // defaultPath: path.join(__dirname, '../assets/'), 
        buttonLabel: 'Save', 
        // Restricting the user to only Text Files. 
        filters: [ 
            { 
                name: 'Text Files', 
                extensions: ['txt', 'docx'] 
            }, ], 
        //properties: [] 
    }).then(file => { 
        // Stating whether dialog operation was cancelled or not. 
        if (!file.canceled) { 
            
            var text = document.getElementById('text'); 
              
            // Creating and Writing to the sample.txt file 
            fs.writeFile(file.filePath.toString(),  
            text.value, function (err) { 
                if (err) throw err; 
            }); 
        } 
    }).catch(err => { 
        console.log(err) 
    }); 
    
}); 


var load = document.getElementById('load'); 

load.addEventListener('click', (event) => { 

    var text = document.getElementById('text'); 

    dialog.showOpenDialog({ 
        title: 'Select the File Path to load', 
        defaultPath: path.join(__dirname, '../assets/sample.txt'), 
        // defaultPath: path.join(__dirname, '../assets/'), 
        buttonLabel: 'Load', 
        // Restricting the user to only Text Files. 
        filters: [ 
            { 
                name: 'Text Files', 
                extensions: ['txt', 'docx'] 
            }, ], 
        //properties: [] 
    }).then(file => { 

        if (!file.canceled) { 
            
            fs.readFile(file.filePaths[0].toString(),function (err, data) {
                if (err) {
                  throw err; 
                }
                text.value = data.toString();
              });
            
        }
        
        
    }).catch(err => { 
        console.log(err) 
    }); 

});