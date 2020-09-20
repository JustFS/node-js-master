// fs = file system
const fs = require('fs');

// créer un fichier make directory
fs.mkdir('tuto', (err) => {
  if (err) {
    console.log(err);
  } else {
    fs.writeFile('./tuto/test.txt', 'Héhéhéhéhé', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('well done sheldon');
      }
    })
  }
})