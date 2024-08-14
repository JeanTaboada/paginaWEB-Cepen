import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
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
                            // Guardar datos en sessionStorage
                            sessionStorage.setItem('alumnoData', JSON.stringify(alumnoData));
                            // Redirigir al perfil
                            window.location.href = './paginaweb-cepen/profile.html';
                        } else {
                            alert("No se encontraron datos para este usuario en la base de datos.");
                        }
                    } else {
                        alert("No se encontraron datos.");
                    }
                }).catch((error) => {
                    console.error('Error al acceder a la base de datos:', error);
                    alert('Error al acceder a la base de datos.');
                });
            })
            .catch((error) => {
                console.error('Error en el inicio de sesión:', error);
                alert('Error en el inicio de sesión: ' + error.message);
            });
    }
}
