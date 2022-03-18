import { saveTask, saveTicket, onGetTasks, getTasks, getUser, onGetUser, deleteTask } from './firebase.js'





const buttonLogin = document.getElementById('btn-sent')

buttonLogin.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const loginForm = document.getElementById('form-login')
    
    const usersCollection = await getUser();
    const dniLog = loginForm['input-dni']
    const contraLog = loginForm['input-contra']

    let users = usersCollection.docs.map((doc)=>doc.data())

    

    
    let userNow = users.find((user)=>user.DNI === dniLog.value);

    if((contraLog.value == userNow.contraseña) && (userNow.cargo == 'Admin')){
        window.location.href="index.html"
    }else if((contraLog.value == userNow.contraseña) && (userNow.cargo == 'Empleado')){
        window.location.href="empleado.html"
    }else if((contraLog.value == userNow.contraseña) && (userNow.cargo == 'Jefe')){
        window.location.href="jefe.html"
    }

    if((contraLog.value != userNow.contraseña) || (userNow.cargo != 'Admin') || ((contraLog.value != userNow.contraseña) && (userNow.cargo != 'Admin'))){
        showMessage('Usuario y/o contraseña incorrecto', 'alert')
    }

    console.log(userNow);
})


function showMessage(message, cssClass) {
    
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-2`;
    div.style = `background-color: blue;`;
    div.appendChild(document.createTextNode(message));
    // Show in dom
    const container = document.querySelector('#form-login');
    const app = document.querySelector('#msg');
    container.insertBefore(div, app);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
}





