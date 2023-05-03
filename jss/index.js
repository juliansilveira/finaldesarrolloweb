let contacto = `
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

let inicio = `<div>

  </div>`

let info = `
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

let listaJugadores = [];
let jugadores =
  `
  <div class="container-jugadores">
    <div class="jugadores">
      <h1>Jugadores</h1>
      <h3>Lista de jugadores</h3>
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
        <thead>
        <tr>
          <th>Documento</th><th>Apellido</th><th>Nombre</th><th>Posicion
          </th><th>Apodo</th><th>
            Dorsal</th>
          <th>Pie hábil</th>
          </tr></thead>

          <tr>
          <td>39028686</td>
          <td>Álvarez</td>
          <td>Julián</td>
          <td>Delantero</td>
          <td>Araña</td>
          <td>19</td>
          <td>Izquierda</td>
          </tr>


          </table>
        </div>
    </div>
  </div>
  `


function dinamico(variante) {
  document.getElementById("contenido").innerHTML = variante;

}


function agregarJugador() {
  let algo = document.querySelector('jugadores')
  algo.innerHTML += `<tr>
  <td>123213213</td>
  <td>Alvarez</td>
  <td>Julián</td>
  <td>Delantero</td>
  <td>Araña</td>
  <td>19</td>
  <td>Izquierda</td>
  </tr>`
}