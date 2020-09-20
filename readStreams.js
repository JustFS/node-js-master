const fs = require('fs');

// zlib = module to compress files
const zlib = require('zlib');
const gunzip = zlib.createGunzip();

// return a readable stream
// must be used to read files
const readStream = fs.createReadStream('./example2.txt.gz');
// new file created must be in gz format
const writeStream = fs.createWriteStream('uncompressed.txt');


// source.pipe(intoNewStream) gzip will compress data before send it
readStream.pipe(gunzip).pipe(writeStream);