// leemos el json

let seleccionados = [];
fetch('../jugadores.json')
  .then((res) => res.json())
  .then((data) => {

    let dni = 39028680
    const { jugadores } = data //tomamos cada uno de los jugadores
    jugadores.forEach((jugador) => { //recorremos e interactuamos con cada jugador

      dni += 1

      jugador.dni = dni



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
        console.log('Eliminado', jugador.nombre);

        const clave = 'seleccionados';

        let seleccionados = JSON.parse(localStorage.getItem(clave)) || [];

        const indice = seleccionados.indexOf(jugador.nombre);
        if (indice !== -1) {
          seleccionados.splice(indice, 1);
        }

        localStorage.setItem(clave, JSON.stringify(seleccionados));
      });


      botonSeleccionar.addEventListener('click', () => {

        if (!seleccionados.includes(jugador.nombre)) {
          seleccionados.push(jugador.nombre);
          localStorage.setItem('seleccionados', JSON.stringify(seleccionados));


          // Crear una nueva fila para el jugador seleccionado
          const filaSeleccionado = document.createElement('tr');

          // Crear las celdas correspondientes con los datos del jugador seleccionado
          const dorsalSeleccionado = document.createElement('td');
          dorsalSeleccionado.textContent = jugador.dorsal;

          const posicionSeleccionado = document.createElement('td');
          posicionSeleccionado.textContent = jugador.posicion;

          const nombreSeleccionado = document.createElement('td');
          nombreSeleccionado.textContent = jugador.nombre;

          const apellidoSeleccionado = document.createElement('td');
          apellidoSeleccionado.textContent = jugador.apellido;

          const btnEliminarSeleccionado = document.createElement('button')
          btnEliminarSeleccionado.innerText = 'X'

          // Agregar las celdas a la fila
          filaSeleccionado.appendChild(dorsalSeleccionado);
          filaSeleccionado.appendChild(posicionSeleccionado);
          filaSeleccionado.appendChild(nombreSeleccionado);
          filaSeleccionado.appendChild(apellidoSeleccionado);
          filaSeleccionado.appendChild(btnEliminarSeleccionado);
          //todo quedamos en que logramos cargar bien el local storage y enviar al otro cuadro de seleccionados 
          // Agregar la fila a la tabla de jugadores seleccionados
          filaSeleccionados.appendChild(filaSeleccionado);
        }

      });
    });
  })
  .catch(error => {
    // Manejo de errores
    console.error('Error al leer el archivo JSON:', error);
  });


const filaSeleccionados = document.querySelector('.selectos');


//Todo FALTA LOGRAR EL AWAIT PARA QUE CADA CLICK HAGA RECORRER Y ACTUALIZAR LOS JUGADORES SELECCIONADOS
// Todo TRATAR DE QUITAR EL JUGADOR DE LA SECCION JUGADORES PARA NO REPETIR O CREAR UNA FORMA DE VERIFICAR QUE NO SE REPITAN LO JUGADORES

