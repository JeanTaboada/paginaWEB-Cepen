import { ManageAccount } from './firebaseconection.js';

document.addEventListener('DOMContentLoaded', async () => {
    const account = new ManageAccount();

    // Esperar a que el usuario se autentique
    const user = await account.getCurrentUser();

    if (user) {
        console.log('Usuario autenticado:', user.email);
        const email = user.email;

        // Referencia a la base de datos de alumnos
        const alumnoRef = firebase.database().ref('alumnos');

        // Buscar el alumno con el mismo correo
        alumnoRef.orderByChild('Email').equalTo(email).once('value', snapshot => {
            if (snapshot.exists()) {
                console.log('Alumno encontrado en la base de datos.');
                snapshot.forEach(alumnoSnapshot => {
                    const alumnoData = alumnoSnapshot.val();
                    console.log('Datos del alumno:', alumnoData);

                    // Mostrar los datos del alumno en la página de perfil
                    document.getElementById('profile-name').textContent = `${alumnoData.Nombre} ${alumnoData.Apellido_Paterno} ${alumnoData.Apellido_Materno}`;
                    document.getElementById('profile-email').textContent = alumnoData.Email;
                    document.getElementById('profile-phone').textContent = alumnoData.Telefono;
                    document.getElementById('profile-carrera').textContent = alumnoData.Carrera;
                    document.getElementById('profile-description').textContent = alumnoData.Descripcion;
                });
            } else {
                console.log('No se encontró un alumno con este correo.');
            }
        }, error => {
            console.error('Error al leer la base de datos:', error);
        });
    } else {
        console.log('No hay usuario autenticado.');
        window.location.href = 'login.html';
    }
});
