const { spawn } = require('child_process');
const fs = require('fs');
const { v4 } = require('uuid');

const certDir = './../certifacates/';
const issuer = 'issuer.crt';

const testedName = v4();

/*
const base64str = `-----BEGIN CERTIFICATE-----
MIICOTCCAZygAwIBAgIJAYEH4wMVNaerMAoGCCqGSM49BAMEMFUxEjAQBgNVBAMM
CWVJRFN1YkNDQTEyMDAGA1UECgwpU1TDgVROw40gVElTS8OBUk5BIENFTklOLCBz
dMOhdG7DrSBwb2RuaWsxCzAJBgNVBAYTAkNaMB4XDTE5MDEwMjAwMDAwMFoXDTI5
MDEwMjIzNTk1OVowNDELMAkGA1UEBhMCQ1oxETAPBgNVBAoMCENEQlBfZUlEMRIw
EAYDVQQDDAkyMTA0NjI3NTUwgZswEAYHKoZIzj0CAQYFK4EEACMDgYYABADb54ar
WzzoNHieYYJC2K593h91MxaBsv0dk6ey+3OT3PV1pHZ2MQrdGqjk+NAoWp+QAjf/
VyQDMtgO9FQPh6/ddgFxKQpbHQ9mQIzx9xMgY6AaZggx8T+Ovqz28mbqexGS8Qh7
GpRfzkVx2PdaFOvXrfiQqnycyy+c/yduZ8hRSzz0n6MzMDEwDgYDVR0PAQH/BAQD
AgCAMB8GA1UdIwQYMBaAFBGZ8vJ+DuZuzlMSObhehXfLtQh0MAoGCCqGSM49BAME
A4GKADCBhgJBDaZw5RuzH59rK9+QWuKT0KIrAVztN/EySi0DyXly4getutYQ34vR
BI9yml3WUOY7/ZJ6fnzMPcANcfNnqOGolskCQXdMlVO/XFWzd0XGmQACJtq1OpP1
qoPkS6xRToawFryV8kstluPtbXZcT4JzCFQyQ8OXj5uWJQqRBvrTeERx+lDc
-----END CERTIFICATE-----`; */

export const verifyCertificate = base64str =>
  new Promise((resolve, reject) => {
    const fileToWrite = Buffer.from(base64str, 'utf-8');

    fs.writeFile(`${certDir}${testedName}.crt`, fileToWrite, 'base64', (err) => {
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
          reject(new Error('Java client sucks'));
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
