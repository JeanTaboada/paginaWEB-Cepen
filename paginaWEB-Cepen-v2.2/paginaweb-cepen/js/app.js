const firebaseConfig= {
    apiKey: 'AIzaSyD8-LBXVhB1w8ok_bP3L2QvQ3kchf2DCU8',
    authDomain: 'crud-cepen-web.firebaseapp.com',
    databaseURL: 'https://crud-cepen-web-default-rtdb.firebaseio.com',
    projectId: 'crud-cepen-web',
    storageBucket: 'crud-cepen-web.appspot.com',
    messagingSenderId: '625555156658',
    appId: '1:625555156658:web:5fc29488466a92d76063ab',
}
const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const updateModal = document.getElementById('modal-update')
const updateForm = document.getElementById('update-form')
const closeUpdateModal = document.getElementById('closeUpdateModal')
const closeModal = document.getElementById('closeRegisterModal')
const registerForm = document.getElementById('register-form')
const alumnosTable = document.getElementById('alumnos-table')
const searchInput = document.getElementById('search-input');

firebase.initializeApp(firebaseConfig)
const alumnoRef = firebase.database().ref('alumnos')

const showRegisterModal = () =>{
    modal.classList.toggle('is-active')
}
openModal.addEventListener('click', showRegisterModal)
closeModal.addEventListener('click', showRegisterModal)

const deleteAlumno = (uid)=>{
    firebase.database().ref(`alumnos/${uid}`).remove()
}
const showUpdateModal =()=>{
    updateModal.classList.toggle('is-active')
}
closeUpdateModal.addEventListener('click', showUpdateModal)

window.addEventListener('DOMContentLoaded', async (e)=>{
    await alumnoRef.on('value',(alumnos)=>{
        alumnosTable.innerHTML = ''
        alumnos.forEach((alumno)=>{
            let alumnoData = alumno.val()
            alumnosTable.innerHTML += `<tr>
                <th>1</th>
                <td>${alumnoData.Nombre}</td>
                <td>${alumnoData.Apellido_Paterno}</td>
                <td>${alumnoData.Apellido_Materno}</td>
                <td>${alumnoData.Domicilio}</td>
                <td>${alumnoData.Telefono}</td>
                <td>${alumnoData.DNI}</td>
                <td>${alumnoData.Email}</td>
                <td>${alumnoData.Email2}</td>
                <td>${alumnoData.Carrera}</td>
                <td>${alumnoData.Turno}</td>
                <td>${alumnoData.Descripcion}</td>
                <td>
                    <button class="button is-warning" data-id="${alumnoData.Uid}">Editar</button>
                    <button class="button is-danger" data-id="${alumnoData.Uid}">Eliminar</button>
                </td>
                <tr/>`

                const updateButtons = document.querySelectorAll('.is-warning')
                updateButtons.forEach((button)=>{
                button.addEventListener('click', (e)=>{
                    showUpdateModal()
                    firebase
                        .database()
                        .ref(`alumnos/${e.target.dataset.id}`)
                        .once('value')
                        .then((alumno)=>{
                        let data = alumno.val()
                        updateForm['nombre'].value = data.Nombre
                        updateForm['apePat'].value = data.Apellido_Paterno
                        updateForm['apeMat'].value = data.Apellido_Materno
                        updateForm['domicilio'].value = data.Domicilio
                        updateForm['cel'].value = data.Telefono
                        updateForm['DNI'].value = data.DNI
                        updateForm['email'].value = data.Email
                        updateForm['email2'].value = data.Email2
                        updateForm['carrera'].value = data.Carrera
                        updateForm['turno'].value = data.Turno
                        updateForm['desc'].value = data.Descripcion

                    })
                    const uid = e.target.dataset.id
                    updateForm.addEventListener('submit', (e)=>{
                        e.preventDefault()

                        const nombre = updateForm['nombre'].value
                        const apellidoPaterno= updateForm['apePat'].value
                        const apellidoMaterno= updateForm['apeMat'].value
                        const domicilio= updateForm['domicilio'].value
                        const telefono= updateForm['cel'].value
                        const DNI= updateForm['DNI'].value
                        const Email= updateForm['email'].value
                        const Email2= updateForm['email2'].value
                        const Carrera= updateForm['carrera'].value
                        const Turno= updateForm['turno'].value
                        const Descripcion = updateForm['desc'].value


                        firebase.database().ref(`alumnos/${uid}`).update({

                            Nombre : nombre,
                            Apellido_Paterno : apellidoPaterno,
                            Apellido_Materno : apellidoMaterno,
                            Domicilio : domicilio,
                            Telefono : telefono,
                            DNI : DNI,
                            Email : Email,
                            Email2 : Email2,
                            Carrera : Carrera,
                            Turno : Turno,
                            Descripcion : Descripcion,

                        })
                        showUpdateModal()
                    })
                })
            })

                const deleteButtons = document.querySelectorAll('.is-danger')
                deleteButtons.forEach((button)=>{
                button.addEventListener('click', (e)=>{
                deleteAlumno(e.target.dataset.id)
                })
                })
        })
    })
})

// Escuchar el evento 'input' en el campo de búsqueda
searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    const rows = alumnosTable.getElementsByTagName('tr');

    // Iterar sobre cada fila de la tabla
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        // Iterar sobre las celdas relevantes (nombres y apellidos)
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            const cellText = cell.textContent || cell.innerText;

            // Restablecer el contenido original
            cell.innerHTML = cellText;

            // Verificar si el texto en la celda coincide con el filtro
            if (cellText.toLowerCase().indexOf(filter) > -1) {
                match = true;
                const regex = new RegExp(`(${filter})`, 'gi');
                cell.innerHTML = cellText.replace(regex, '<span style="text-decoration: underline;">$1</span>');
            }
        }

        // Mostrar solo las filas con coincidencias
        if (match) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
});
                registerForm.addEventListener('submit', (e) =>{
                e.preventDefault()

                const nombre = registerForm['nombre'].value
                const apellidoPaterno= registerForm['apePat'].value
                const apellidoMaterno= registerForm['apeMat'].value
                const domicilio= registerForm['domicilio'].value
                const telefono= registerForm['cel'].value
                const DNI= registerForm['DNI'].value
                const Email= registerForm['email'].value
                const Email2= registerForm['email2'].value
                const Carrera= registerForm['carrera'].value
                const Turno= registerForm['turno'].value
                const Descripcion = registerForm['desc'].value


                const registerAlumno =  alumnoRef.push()
                registerAlumno.set({
                Uid: registerAlumno.path.pieces_[1],

                Nombre : nombre,
                Apellido_Paterno : apellidoPaterno,
                Apellido_Materno : apellidoMaterno,
                Domicilio : domicilio,
                Telefono : telefono,
                DNI : DNI,
                Email : Email,
                Email2 : Email2,
                Carrera : Carrera,
                Turno : Turno,
                Descripcion : Descripcion,

            })
                showRegisterModal()

    })



