
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

  import { getFirestore, collection, addDoc, getDocs, onSnapshot,doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAzVEm9Opk8-3tVPCYwiTf4hgN2pb2GjcM",
    authDomain: "maintenance-server-74d16.firebaseapp.com",
    projectId: "maintenance-server-74d16",
    storageBucket: "maintenance-server-74d16.appspot.com",
    messagingSenderId: "846650725263",
    appId: "1:846650725263:web:b1ce4c2cefab47978ff1fa"
  };
  
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore()

  
  export const saveTask = (nombre, apellido, dni, telefono, direccion, contraseña, cargo, sector) => {
    addDoc(collection(db, 'Usuarios'), { Nombre: nombre, Apellido: apellido, DNI: dni, Telefono: telefono, Direccion: direccion, contraseña: contraseña,
    cargo: cargo, sector: sector })
    
}

  export const saveTicket = (dniT, puesto, descripcion, estado, empleado) => {
    addDoc(collection(db, 'Tickets'), {DNI: dniT, Puesto: puesto, Descripcion: descripcion, estado: estado, empleado: empleado})
  }

  export const onGetTasks = (callback) =>
  onSnapshot(collection(db, 'Tickets'), callback);

  export const getTasks = () => getDocs(collection(db, 'Tickets'));

  export const deleteTask = (id) => deleteDoc(doc(db, 'Tickets', id));
  

  export const onGetUser = (callback) =>
  onSnapshot(collection(db, 'Usuarios'), callback);

  export const getUser = () => getDocs(collection(db, 'Usuarios'));
  




