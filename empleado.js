import { saveTask, saveTicket, onGetTasks, getTasks, getUser, onGetUser, deleteTask } from './firebase.js'


const btnTicket = document.getElementById('btn-ticket')



btnTicket.addEventListener('click', e => {
    //screen.innerHTML = ''
    
    document.getElementById('form-ticket').style.display = 'block';
    e.preventDefault()
    
   
    let all_users = [];
    getUser().then((collection)=>{
        
    // collection.docs.forEach((doc)=>all_users.push(doc.data()))
    console.log(collection.docs);
    all_users = collection.docs.flatMap((doc)=>{
        console.log('Nombre: ' + doc.data().cargo)
        if(doc.data().Apellido=='') return [];
        
            return {
                name:doc.data().Nombre,
                surname: doc.data().Apellido,
                dni: doc.data().DNI,
                cargo: doc.data().cargo,
                
                
                toString(){
                    return `${this.surname} ${this.name}`
                }
            }    
    });

    console.log(all_users);
    
    all_users.forEach((u)=>{
        
        
        if(u.cargo == 'Empleado'){
            
            let option = document.createElement('option');
            option.innerText = u.toString();
            option.value = u.dni;
            option.onclick = function (event){
                console.log(event.target.value)
            }
            document.getElementById('divsito').appendChild(option);
        };
        
        
    })
})



    const ticketForm = document.getElementById('form-ticket')
    const btnTicket = document.getElementById('btnTicket')
    


    btnTicket.addEventListener('click', (e) => {
        e.preventDefault()
        
        
        const dniT = ticketForm['divsito']
        const puesto = ticketForm['select-puesto']
        const descripcion = ticketForm['input-desc-ticket']
        const estado = 'Pendiente'
        const empleado = 'Sin asignar'
        
        //console.log(dniT.value)
        //console.log(puesto.value)
        //console.log(descripcion.value)
        
        saveTicket(dniT.value, puesto.value, descripcion.value, estado, empleado)
    
        ticketForm.reset()

    })
})

