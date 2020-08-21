const validator = require('validator');

// process.argv (contient les arguments passés dans la console)
console.log(process.argv);
const emails = process.argv[2].split(',')

// const emails = [
//   'test.fr',
//   'test@test.fr',
//   'john@frames.fr.fr',
//   'coucou@bonjour.com'
// ]

emails.forEach((email) => {
  console.log(
    '%s : %s',
    email,
    validator.isEmail(email) ? 'ok': 'nope'
  );
})