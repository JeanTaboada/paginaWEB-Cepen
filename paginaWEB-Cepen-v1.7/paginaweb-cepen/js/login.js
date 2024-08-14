import { ManageAccount } from './firebaseconection.js';

document.getElementById('formulario-sesion').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const account = new ManageAccount();

    account.authenticate(email, password);
});
