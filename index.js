import { saveTask, saveTicket, onGetTasks, getTasks, getUser, onGetUser } from './firebase.js'

const screen = document.getElementById('screen')
const subtitle = document.getElementById('sub-title')
const container = document.getElementById('container')
const btnUser = document.getElementById('btn-user')
const btnTicket = document.getElementById('btn-ticket')




mostrarTickets();
  

btnUser.addEventListener('click', e => {
    e.preventDefault()
    screen.innerHTML = ''
 
    screen.innerHTML += `
        <div style="padding-top: 15%; padding-left: 25%">
            <div class="card border-primary "  style="width: 40rem; padding-left: 1rem; padding-right: 1rem;">
                <div class="card-body">
                    <form id="form-user "  >
                        <h2 class="mb-3" style="padding-left: 10rem;"> Registrar Usuario</h2>
                        <div class="row">
                            <div class="col"> 
                                <label for="name">Nombre:</label> 
                            </div>
                            <div class="col">
                                <label for="apellido">Apellido:</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-4">
                                <input class="w-100 " type="text" placeholder="Gustavo" id="input-name">
                            </div>
                            <div class="col mb-4">
                                <input class="w-100" type="text" placeholder="Gomez" id="input-apellido">
                            </div>
                        </div>


                        <div class="row">
                            <div class="col ">
                                <label for="dni">DNI:</label>
                            </div>
                            <div class="col">
                                <label for="tel">Telefeno:</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-4">
                                <input class="w-100 " type="text" placeholder="43059659" id="input-dni">
                            </div>
                            <div class="col mb-4">
                                <input class="w-100" type="text" placeholder="117432848" id="input-tel">
                            </div>
                        </div>

                        <div class="row">
                            <div class="col ">
                                <label for="direccion">Dirección:</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col mb-4">
                                <input class=" w-100 " type="text" placeholder="Rio de Janeiro 147" id="input-dire" style="width: 20rem;">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col ">
                                <button class="btn btn-primary btn-sent" id="btn-sent" style="float: right; " >Registrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    const userForm = document.getElementById('form-user')



//Events

userForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    
    const nombre = userForm['input-name']
    const apellido = userForm['input-apellido']
    const dni = userForm['input-dni']
    const tel = userForm['input-tel']
    const direccion = userForm['input-dire']

    saveTask(nombre.value, apellido.value, dni.value, tel.value, direccion.value)

    userForm.reset()
})

})


btnTicket.addEventListener('click', e => {
    e.preventDefault()
    screen.innerHTML = ''
    screen.innerHTML += `
    <div style="padding-top: 15%; padding-left: 25%;">
        <div class="card border-primary "  style="width: 40rem; padding-left: 1rem; padding-right: 1rem;">
            <div class="card-body ">
                <form id="form-ticket" >
                    <h2 class="mb-3" style="padding-left: 10rem;">Generar Ticket</h2>
                    <div class="row">
                        <div class="col">
                            <label for="ticket-dni">DNI:</label>
                        </div>
                        <div class="col">
                            <label for="cat">Categoria:</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-4"> 
                                
                            <input class="" type="text" placeholder="43096584" id="input-dni-ticket">
                        </div>
                        <div class="col"> 
                                
                        <select class="form-select" id="select-puesto" aria-label="Floating label select example">
                                <option selected>Seleccione su area</option>
                                <option value="Maquinista">Maquinista</option>
                                <option value="Administracion">Administracion</option>
                                <option value="Industrial">Industrial</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col">
                            <label for="ticket-desc" style="">Descripción:</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mb-4">
                            <textarea class="form-control" placeholder="Explique su problema" id="input-desc-ticket" style="height: 100px"></textarea>
                           
                        </div>
                    </div>
                    <div class="row">
                        <div class="col" >
                            <button type="button" class="btn btn-primary" id="btnTicket" style="float: right; ">Generar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    `;

    const ticketForm = document.getElementById('form-ticket')
    const btnTicket = document.getElementById('btnTicket')
    


    btnTicket.addEventListener('click', (e) => {
        e.preventDefault()
        
        
        const dniT = ticketForm['input-dni-ticket']
        const puesto = ticketForm['select-puesto']
        const descripcion = ticketForm['input-desc-ticket']
        
        console.log(dniT.value)
        console.log(puesto.value)
        console.log(descripcion.value)
        
        saveTicket(dniT.value, puesto.value, descripcion.value)
    
        ticketForm.reset()

    })
})



function mostrarTickets(){
    
    const ticketsContainer = document.getElementById('tickets')
    var nombreTicket = null
    var apellido = null
    window.addEventListener("DOMContentLoaded", async () => {
        
        onGetTasks((querySnapshot) => {
            ticketsContainer.innerHTML = "";
            
            querySnapshot.forEach((doc) => {
                const ticket =  doc.data();

                
                onGetUser((querySnapshot) => {
                    querySnapshot.forEach((user) =>{
                        const userData = user.data()
                        
                        if(ticket.DNI == userData.DNI){
                            console.log(ticket.DNI + ' == ' + userData.DNI)
                            console.log(doc.data())
                            nombreTicket = userData.Nombre
                            apellido = userData.Apellido
                            console.log(nombreTicket)
                            console.log(apellido)
                        }
                    })
                })
                console.log(nombreTicket)
                
                ticketsContainer.innerHTML += `
                
                <div class="row">
                    <div class="col border border-primary" style="bo">
                        ${nombreTicket}
                    </div>
                    <div class="col border border-primary" style="bo">
                        ${apellido}
                    </div>
                    <div class="col border border-primary" style="bo">
                        ${ticket.DNI}
                    </div>
                    <div class="col border border-primary">
                        ${ticket.Puesto}
                    </div>
                    <div class="col border border-primary">
                        ${ticket.Descripcion}
                    </div>
                </div>
                `;
            })
        })
    })
}




