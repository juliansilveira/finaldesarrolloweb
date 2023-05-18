const inicio = document.querySelector('#inicio')

inicio.addEventListener('click', () =>{ 
  document.getElementById("contenido").innerHTML = 
`<div></div>`})

const info = document.querySelector('#info')

info.addEventListener('click', () =>{
  document.getElementById('contenido').innerHTML =
  `
    <div class="container-info">
      <div class="container-ifo-dev">
      <h1>Información</h1>
      <div class="container-info-afa">
      <h2>Asociación del Fútbol Argentino</h2>
      <p>
      La Asociación del Fútbol Argentino es el ente rector del fútbol en la Argentina, encargada de organizar y regular las distintas selecciones nacionales, y los campeonatos oficiales, en todas las modalidades del deporte en ese país, incluidas las ramas de futsal, fútbol playa y fútbol femenino.
      </p>
      <p>
      Presidente: Claudio Fabián Tapia
      </p>
      <p>
      Fundador: Alejandro Watson Hutton
      </p>
      <p>
      Clubes afiliados: Directamente: 88; Indirectamente: más de 3500
      </p>
      <p>
      Fundación: 21 de febrero de 1893 (130 años)
      </p>
      <p>
      Tesorero: Pablo Toviggino
      </p>
      <p>
      Sede: Viamonte 1366, Ciudad 
      </p>
      <p>
      Autónoma de Buenos Aires, Argentina
      </p>
      </div>
      <h3>Desarrollador</h3>
      <p>Julián Silveira Annoni</p>
      <a href="https://github.com/juliansilveira"><span>Github</span></a>
      <a href="https://www.linkedin.com/in/julian-sa/"><span>LinkedIn</span></a>
      <span>Gmail: julian.silveira.annoni@gmail.com</span></a>
      </div>
    </div>
  ` 
})

const contacto = document.querySelector('#contacto')

contacto.addEventListener('click', () => {
  document.getElementById('contenido').innerHTML = 
  `
  <!-- INICIO FORMULARIO -->
  <div class="container">
    <h1>FORMULARIO DE CONTACTO</h1>
    <h3>Llena el formulario para contactarme</h3>
    <div class="container-form">
      <p>
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" placeholder="Nombre"
          required>
      </p>
      <p>
        <label>Apellido</label>
        <input type="text" id="lastname" name="lastname"
          placeholder="Apellido" required>
      </p>
      <p>
        <label>Número de Teléfono</label>
        <input type="tel" id="phone" name="phone"
          placeholder="Teléfono de Contacto" required>
      </p>
      <p>
        <label>Correo Electrónico</label>
        <input type="text"
          id="email"
          name="email"
          placeholder="Correo Electrónico" required>
      </p>
      <p>
        <label>Comentario</label>
        <input type="text" name="coment" id="coment"
          placeholder="Deja tu comentario...">
      </p>

      <button type="submit" id="send">Enviar Formulario</button>
    </div>
  </div>
  <!-- FIN FORMULARIO -->
  `;
})



let seccionJugadores = `<div class="container-jugadores">
<div class="jugadores">
  <h1>Jugadores</h1>
  <h3>Lista de jugadores</h3>
</div>
</div>
`



const contenedorJugadores = document.createElement('div');
contenedorJugadores.innerHTML = `
  <div clas="agregar"></div>
  <button onclick="agregarJugador()">Agregar Jugador</button>
  <input id="dnijugador" type="text" placeholder="DNI del jugador">
  <input type="text" placeholder="Apellido del jugador">
  <input type="text" placeholder="Nombre del jugador">
  <input type="text" placeholder="Apodo del jugador">
  <input type="text" placeholder="Posicion del jugador">
  <input type="text" placeholder="Dorsal del jugador">
  <input type="text" placeholder="Pie Hábil del jugador">
  </div>
  <div class="tabla">
  <table>
  <th>dni</th>
  <th>Apellido</th>
  <th>Nombre</th>
  <th>Posicion</th>
  <th>Apodo</th>
  <th>Dorsal</th>
    <th>Pie habil</th>
  </table>
  </div>`

seccionJugadores.appendChild(contenedorJugadores)

// CREANDO LOCALSTORAGE JUGADORES
// let seleccionados = [];
// let dni = 39028680;
fetch('/jugadores.json')
.then(response => response.json())
.then(jugadores => {
  // Aquí puedes trabajar con el contenido del archivo JSON

  let nuevo = jugadores.jugadores

  nuevo.forEach(jugador => {
    let arqueros = 0
    lista = [];
    dni += 1



    const filaDeJugadores = document.createElement('tr');

    const dniJugador = document.createElement('td');
    dniJugador.textContent = `${dni}`

    const apellidoJugador = document.createElement('td');
    apellidoJugador.textContent = `${jugador.apellido}`

    const nombreJugador = document.createElement('td');
    nombreJugador.textContent = `${jugador.nombre}`

    const posicionJugador = document.createElement('td');
    posicionJugador.textContent = `${jugador.posicion}`

    const apodoJugador = document.createElement('td');
    apodoJugador.textContent = `${jugador.apodo}`

    const dorsalJugador = document.createElement('td');
    dorsalJugador.textContent = `${jugador.dorsal}`

    const pieJugador = document.createElement('td');
    pieJugador.textContent = `${jugador.pie}`



    localStorage.setItem(`${dni}`, `${jugador.nombre}`);
    lista.push(jugador)

    // localStorage.getItem(`${jugador.dorsal}`)

    filaDeJugadores.appendChild(dniJugador);
    filaDeJugadores.appendChild(apellidoJugador);
    filaDeJugadores.appendChild(nombreJugador);
    filaDeJugadores.appendChild(posicionJugador);
    filaDeJugadores.appendChild(apodoJugador);
    filaDeJugadores.appendChild(dorsalJugador);
    filaDeJugadores.appendChild(pieJugador);

    let tabla = document.querySelector('table')

    tabla.appendChild(filaDeJugadores)

    let botonEditar = document.createElement('button')
    let botonEliminar = document.createElement('button');
    let botonSeleccionar = document.createElement('button');


    filaDeJugadores.appendChild(botonEditar)
    botonEditar.innerText = 'Editar';

    filaDeJugadores.appendChild(botonEliminar)
    botonEliminar.innerText = 'Eliminar';

    filaDeJugadores.appendChild(botonSeleccionar)
    botonSeleccionar.innerText = 'Seleccionar'

    botonEditar.addEventListener('click', () => {
      console.log('Editado', jugador.nombre)
    })

    botonEliminar.addEventListener('click', () => {
      console.log('Eliminado', jugador.nombre)
    })

    botonSeleccionar.addEventListener('click', () => {
      if (seleccionados.length < 11) {
        seleccionados.push(jugador);
        console.log('Seleccionado', jugador.nombre)
      } else {
        alert('Solo puede seleccionar hasta 11 titulares')
      }
    })
  });
})
.catch(error => {
  // Manejo de errores
  console.error('Error al leer el archivo JSON:', error);
});

