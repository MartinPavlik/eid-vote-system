
const x509 = require('x509');

const cert = x509.parseCert('tested.crt')

const issuer = x509.parseCert('issuer.crt')

console.log(cert);
console.log('---------')
console.log(issuer);

30 16 80 14 35 EF 62 28 36 EE EB 8E 25 D9 71 58 F0 75 1B B3 37 5B 75 7C vaclav dlouhej
30 16 80 14 8A 07 38 DD C3 B8 70 09 D8 AF 5A 35 1B A5 6D 70 70 22 06 48 karel dlouhej

30 16 80 14 11 99 F2 F2 7E 0E E6 6E CE 53 12 39 B8 5E 85 77 CB B5 08 74 vaclav krajkej
30 16 80 14 11 99 F2 F2 7E 0E E6 6E CE 53 12 39 B8 5E 85 77 CB B5 08 74 karel kratkej

6D 0C 7D AE 8B 52 C3 8C 90 15 6E B5 AF C7 FB 6B BB 10 49 29 ca public

20 CF 5B 58 9E EF 2F 31 8C 78 2B DE 6A 4D 58 0A 88 9F 53 9B

6E A0 9C A8 38 EC A6 FB 3D 4B 8D 56 D7 01 63 64 19 B7 37 ED ca publis finger print
6E A0 9C A8 38 EC A6 FB 3D 4B 8D 56 D7 01 63 64 19 B7 37 ED


/*
x509.verify(__dirname + '/tested.crt', __dirname + '/issuer.crt', (err, result) => {
  console.log(err);
  console.log(result);
});
*/

/*

const fs = require('fs');
const { Certificate } = require('@fidm/x509');

const issuer = Certificate.fromPEM(fs.readFileSync('./issuer.pem'))
const cert = Certificate.fromPEM(fs.readFileSync('./tested.pem'))
console.log(cert.isIssuer(issuer)) // true
console.log(issuer.verifySubjectKeyIdentifier()) // true
console.log(cert.verifySubjectKeyIdentifier()) // true
console.log(issuer)

*/