import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: 'AIzaSyD8-LBXVhB1w8ok_bP3L2QvQ3kchf2DCU8',
    authDomain: 'crud-cepen-web.firebaseapp.com',
    databaseURL: 'https://crud-cepen-web-default-rtdb.firebaseio.com',
    projectId: 'crud-cepen-web',
    storageBucket: 'crud-cepen-web.appspot.com',
    messagingSenderId: '625555156658',
    appId: '1:625555156658:web:5fc29488466a92d76063ab',
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export class ManageAccount {

    authenticate(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Buscar al alumno en la base de datos por correo electrónico
                const dbRef = ref(database);
                get(child(dbRef, `alumnos`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        let alumnoData = null;
                        snapshot.forEach((childSnapshot) => {
                            const data = childSnapshot.val();
                            if (data.Email === email) {
                                alumnoData = data;
                            }
                        });

                        if (alumnoData) {
                            // Guardar datos en sessionStoragem
                            sessionStorage.setItem('alumnoData', JSON.stringify(alumnoData));
                            // Redirigir según el correo electrónico
                            const adminEmails = ['admin@cepen.edu.pe']; // Lista de correos de administradores
                            if (adminEmails.includes(email)) {
                                window.location.href = './paginaweb-cepen/index.html';
                            } else {
                                window.location.href = './paginaweb-cepen/profile.html';
                            }
                        } else {
                            alert("No se encontraron datos para este usuario.");
                        }
                    } else {
                        alert("No se encontraron datos.");
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                alert('Error en el inicio de sesión: ' + error.message);
            });
    }
}
