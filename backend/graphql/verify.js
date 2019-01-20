const { spawn } = require('child_process');
const fs = require('fs');
const { v4 } = require('uuid');

const certDir = `${__dirname}/`;
const issuer = 'issuer.crt';

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}


export const verifyCertificate = base64str =>
  new Promise((resolve, reject) => {
    // const formatted = base64str.split(64).join('\n');

    const splitted = chunkSubstr(base64str, 64).join('\n');

    const fileToWrite = Buffer.from(`-----BEGIN CERTIFICATE-----\n${splitted}\n-----END CERTIFICATE-----`, 'utf-8');

    const testedName = v4();

    fs.writeFile(`${certDir}${testedName}.crt`, fileToWrite, 'base64', (err) => {
      console.log(`file created... ${certDir}${testedName}.crt`, err); // eslint-disable-line
      if (err === null) {
        const child = spawn('java', ['-jar', 'certificateverifier-1.0-jar-with-dependencies.jar', `${certDir}${issuer}`, `${certDir}${testedName}.crt`]);

        child.stdout.on('data', (data) => {
          if (`${data}` === 'true') {
            console.log('overeno');
            resolve(true);
          }
          resolve(false);
        });

        child.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
          reject(new Error(data));
        });

        child.on('close', (code) => {
          spawn('rm', [`${certDir}${testedName}.crt`]);
          console.log(`child process exited with code ${code}`);
        });
      } else {
        console.log(err);
        reject(new Error('Can not write file'));
      }
    });

  });


export default verifyCertificate;
