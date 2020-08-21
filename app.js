const fs = require('fs');

// create a file (fichier, text, callback)
fs.writeFile('example.txt', "this is a file", (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('File successfully created');
    fs.readFile('example.txt','utf8', (err, file) => {
      if (err){
        console.log(err);
      } else {
        console.log(file);
      }
    });
  }
});

// rename file
// fs.rename('example.txt','test.txt', (err) => {
//   if (err){
//     console.log(err);
//   } else {
//     console.log('successfully renamed the file');
//   }
// });

// rajouter texte
fs.appendFile('example.txt', '\n ajouté data', (err) => {
  if(err){
    console.log(err);
  } else {
    console.log('successfully updated');
  }
});

// supprimer
// fs.unlink('example.txt', (err) => {
//   if(err){
//     console.log(err + 'lol');
//   } else {
//     console.log('successfully deleted the file');
//   }
// })