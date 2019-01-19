function login() {
	fetch('http://localhost:3000/login').then((data) => {
		console.log(data);
	}).catch((err) => {
		console.log(err);
	});
}

function data() {
	fetch('http://localhost:3000/data').then((data) => {
		console.log(data);
	}).catch((err) => {
		console.log(err);
	});
}

login();