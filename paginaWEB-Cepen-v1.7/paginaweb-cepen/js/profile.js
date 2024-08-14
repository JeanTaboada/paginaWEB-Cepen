import { ManageAccount } from './firebaseconection.js';

document.addEventListener('DOMContentLoaded', async () => {
    const alumnoData = JSON.parse(sessionStorage.getItem('alumnoData'));

    if (alumnoData) {
        document.getElementById('profile-name').textContent = `${alumnoData.Nombre} ${alumnoData.Apellido_Paterno} ${alumnoData.Apellido_Materno}`;
        document.getElementById('profile-email').textContent = alumnoData.Email;
        document.getElementById('profile-phone').textContent = alumnoData.Telefono;
        document.getElementById('profile-DNI').textContent = alumnoData.DNI;
        document.getElementById('profile-carrera').textContent = alumnoData.Carrera;
        document.getElementById('profile-description').textContent = alumnoData.Descripcion;
    } else {
        console.log('No hay datos de alumno guardados.');
        window.location.href = 'login.html';
    }
});
