import { saveTask, saveTicket, onGetTasks, getTasks, getUser, onGetUser, deleteTask } from './firebase.js'

const btnTickets = document.getElementById('btn-tickets')
const ticketsContainer = document.getElementById('example')

btnTickets.addEventListener('click', e => {
    document.getElementById('table').style.display = 'block';
    mostrarTickets();
})



async function mostrarTickets(){

   
    const usersCollection = await getUser();
 
    let users = {};
    usersCollection.docs.forEach((doc)=>{users[doc.data().DNI] = doc.data()});

    const tasksCollection = await getTasks();
    $('#example').DataTable();
    tasksCollection.docs.forEach((task)=>{
        
        let empleadoGen = 'Sin asignar';
        
        if(users[task.data().DNI]!== undefined){
            empleadoGen = `${users[task.data().DNI].Nombre} ${users[task.data().DNI].Apellido}`;
            
        }else if(empleadoGen === 'Sin asignar'){
            //console.log(task.id)
           deleteTask(task.id)
    
        }
        let badge = ''
        let button = ''
        if(task.data().estado == 'Pendiente'){
            badge = `<span class="badge rounded-pill bg-danger">Pendiente</span>`
            button = `<button type="button" class="btn btn-primary">Asignar</button>`
        }
        console.log([empleadoGen,task.data().Puesto, badge, task.data().Descripcion, task.data().empleado, button])


        $('#example').DataTable().row.add( [
            
            ticketsContainer.innerHTML += `
        
            
                <tr>
                    <td>${empleadoGen}</td>
                    <td>${task.data().Puesto}</td>
                    <td>${badge}</td>
                    <td>${task.data().Descripcion}</td>
                    <td>${task.data().empleado}</td>
                    <td>${button}</td>
                </tr>
           
                
               `,
        ]).draw();

});

$(document).ready(function() {
    $('#example').dataTable().fnDestroy();
    $('#example').DataTable()
   
})

}
/*
  
               */