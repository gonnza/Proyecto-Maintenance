import { saveTask, saveTicket, onGetTasks, getTasks, getUser, onGetUser, deleteTask } from './firebase.js'

const screen = document.getElementById('screen')
const subtitle = document.getElementById('sub-title')
const container = document.getElementById('container')
const btnUser = document.getElementById('btn-user')
const btnTicket = document.getElementById('btn-ticket')
const ticketsContainer = document.getElementById('tickets-generator')
const clientes = document.getElementById('clientes')
const divGenerarTicket = document.getElementById('generarTicket')




mostrarTickets();
  
//BOTON REGISTRAR USUARIO
btnUser.addEventListener('click', e => {
    e.preventDefault()
    document.getElementById('form-ticket').style.display = 'none';
    ticketsContainer.innerHTML = ''
    document.getElementById('form-user').style.display = 'block';
    const userForm = document.getElementById('form-user')
    


//Events

userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    
    const nombre = userForm['input-name']
    const apellido = userForm['input-apellido']
    const dni = userForm['input-dni']
    const tel = userForm['input-tel']
    const direccion = userForm['input-dire']
    const contra = userForm['input-contra']
    const cargo = userForm['select-cargo']
    const sector = userForm['select-sector']

    saveTask(nombre.value, apellido.value, dni.value, tel.value, direccion.value, contra.value, cargo.value, sector.value)

    userForm.reset()
})

})

// BOTON GENERAR TICKET
btnTicket.addEventListener('click', e => {
    //screen.innerHTML = ''
    e.preventDefault()
    document.getElementById('form-user').style.display = 'none';
    ticketsContainer.innerHTML = ''
    let all_users = [];
    getUser().then((collection)=>{
        
    // collection.docs.forEach((doc)=>all_users.push(doc.data()))
    console.log(collection.docs);
    all_users = collection.docs.flatMap((doc)=>{
        
        if(doc.data().Apellido=='') return [];
        return {
            name:doc.data().Nombre,
            surname: doc.data().Apellido,
            dni: doc.data().DNI,

            toString(){
                return `${this.surname} ${this.name}`
            }
        }
    });

    console.log(all_users);
    
    document.getElementById('form-ticket').style.display = 'block';
    
    all_users.forEach((u)=>{
        let option = document.createElement('option');
        option.innerText = u.toString();
        option.value = u.dni;
        option.onclick = function (event){
            console.log(event.target.value)
        };
        
        document.getElementById('divsito').appendChild(option);
    })
})



    const ticketForm = document.getElementById('form-ticket')
    const btnTicket = document.getElementById('btnTicket')
    


    btnTicket.addEventListener('click', (e) => {
        e.preventDefault()
        
        
        const dniT = ticketForm['divsito']
        const puesto = ticketForm['select-puesto']
        const descripcion = ticketForm['input-desc-ticket']
        
        console.log(dniT.value)
        console.log(puesto.value)
        console.log(descripcion.value)
        
        saveTicket(dniT.value, puesto.value, descripcion.value)
    
        ticketForm.reset()

    })
})


//FUNCION TABLAS
async function mostrarTickets(){


const usersCollection = await getUser();
    
// // let users = usersCollection.docs.map((doc)=>doc.data());
let users = {};
usersCollection.docs.forEach((doc)=>{users[doc.data().DNI] = doc.data()});

// users.find((user)=>user.DNI === "43096637");
// console.log(users["43096637"]);


const tasksCollection = await getTasks();
tasksCollection.docs.forEach((task)=>{
    let empleado = 'Sin asignar';
    
    if(users[task.data().DNI]!== undefined){
        empleado = `${users[task.data().DNI].Nombre} ${users[task.data().DNI].Apellido}`;
        
    }else if(empleado === 'Sin asignar'){
        //console.log(task.id)
       deleteTask(task.id)

    }
    
    
    
    //console.log(`Tarea: ${task.data().Descripcion} para el empleado ${empleado} (${task.data().Puesto})`); 

    //console.log(empleado)
    ticketsContainer.innerHTML += `
                
  <table class="table">
    
    <tbody id="tabla1">
            <tr>
            <th scope="row">1</th>
            <td>${empleado}</td>
            <td>${task.data().Puesto}</td>
            <td>${task.data().Descripcion}</td>
            </tr>
    </tbody>
  </table>

    `;
});
    
}




