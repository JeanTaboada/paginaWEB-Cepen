const firebaseConfig= {
    apiKey: 'AIzaSyD8-LBXVhB1w8ok_bP3L2Q3kchf2DCU8',
    authDomain: 'crud-cepen-web.firebaseapp.com',
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
                <td>${alumnoData.Telefono}</td>
                <td>${alumnoData.DNI}</td>
                <td>${alumnoData.Email}</td>
                <td>${alumnoData.Carrera}</td>
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
                        updateForm['cel'].value = data.Telefono
                        updateForm['DNI'].value = data.DNI
                        updateForm['email'].value = data.Email
                        updateForm['carrera'].value = data.Carrera
                        updateForm['desc'].value = data.Descripcion

                    })
                    const uid = e.target.dataset.id
                    updateForm.addEventListener('submit', (e)=>{
                        e.preventDefault()

                        const nombre = updateForm['nombre'].value
                        const apellidoPaterno= updateForm['apePat'].value
                        const apellidoMaterno= updateForm['apeMat'].value
                        const telefono= updateForm['cel'].value
                        const DNI= updateForm['DNI'].value
                        const Email= updateForm['email'].value
                        const Carrera= updateForm['carrera'].value
                        const Descripcion = updateForm['desc'].value


                        firebase.database().ref(`alumnos/${uid}`).update({

                            Nombre : nombre,
                            Apellido_Paterno : apellidoPaterno,
                            Apellido_Materno : apellidoMaterno,
                            Telefono : telefono,
                            DNI : DNI,
                            Email : Email,
                            Carrera : Carrera,
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

                registerForm.addEventListener('submit', (e) =>{
                e.preventDefault()

                const nombre = registerForm['nombre'].value
                const apellidoPaterno= registerForm['apePat'].value
                const apellidoMaterno= registerForm['apeMat'].value
                const telefono= registerForm['cel'].value
                const DNI= registerForm['DNI'].value
                const Email= registerForm['email'].value
                const Carrera= registerForm['carrera'].value
                const Descripcion = registerForm['desc'].value


                const registerAlumno =  alumnoRef.push()
                registerAlumno.set({
                Uid: registerAlumno.path.pieces_[1],

                Nombre : nombre,
                Apellido_Paterno : apellidoPaterno,
                Apellido_Materno : apellidoMaterno,
                Telefono : telefono,
                DNI : DNI,
                Email : Email,
                Carrera : Carrera,
                Descripcion : Descripcion,

            })
                showRegisterModal()

    })



