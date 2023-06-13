let seleccionados = [];


// Recuperar los datos de jugadores seleccionados del LocalStorage
const seleccionadosGuardados = JSON.parse(localStorage.getItem('seleccionados'));
if (seleccionadosGuardados && Array.isArray(seleccionadosGuardados)) {
  seleccionados = seleccionadosGuardados;
}

// Obtener referencias a elementos del DOM
const formularioConvocatoria = document.querySelector('.formulario-convocatoria');
const fechaInput = document.getElementById('fecha');
const rivalInput = document.getElementById('rival');
const capitanInput = document.getElementById('capitan');
const listaConvocatorias = document.getElementById('listaConvocatorias');
const listaSeleccionados = document.getElementById('listaSeleccionados');

// Array para almacenar las convocatorias
let convocatorias = [];

// Crear convocatoria
function crearConvocatoria() {
  const fecha = fechaInput.value;
  const rival = rivalInput.value;
  const capitan = capitanInput.value;

  if (fecha && rival && capitan) {
    const convocatoria = {
      fecha,
      rival,
      capitan,
      jugadores: [], // Array para almacenar los jugadores seleccionados en esta convocatoria
    };

    convocatorias.push(convocatoria);
    actualizarListaConvocatorias();

    // Reiniciar el formulario
    fechaInput.value = '';
    rivalInput.value = '';
    capitanInput.value = '';

    // Verificar si hay 11 jugadores seleccionados
    if (convocatoria.jugadores.length === 11) {
      vaciarListaSeleccionados();
    }

    // Guardar las convocatorias en el LocalStorage
    localStorage.setItem('convocatorias', JSON.stringify(convocatorias));
  }
}

// Vaciar la lista de seleccionados
function vaciarListaSeleccionados() {
  listaSeleccionados.innerHTML = '';
}

// Actualizar la lista de convocatorias en el DOM
function actualizarListaConvocatorias() {
  listaConvocatorias.innerHTML = '';

  convocatorias.forEach((convocatoria, index) => {
    const li = document.createElement('li');
    li.textContent = `Fecha: ${convocatoria.fecha}, Rival: ${convocatoria.rival}, Capitán: ${convocatoria.capitan}`;
    li.addEventListener('click', () => {
      console.log('Convocatoria seleccionada:', convocatoria);
      // Aquí puedes agregar la lógica para mostrar los jugadores seleccionados en esta convocatoria
      cargarJugadoresSeleccionados(convocatoria.jugadores);
    });
    listaConvocatorias.appendChild(li);
  });
}

// Cargar jugadores seleccionados en el DOM
function cargarJugadoresSeleccionados(jugadores) {
  listaSeleccionados.innerHTML = '';

  jugadores.forEach((jugador) => {
    const li = document.createElement('li');
    li.textContent = jugador;
    listaSeleccionados.appendChild(li);
  });
}

// Event listener para el botón "Crear Convocatoria"
const botonCrearConvocatoria = document.getElementById('crearConvocatoria');
botonCrearConvocatoria.addEventListener('click', crearConvocatoria);

// Guardar las convocatorias en el LocalStorage al cerrar la página
window.addEventListener('beforeunload', () => {
  localStorage.setItem('convocatorias', JSON.stringify(convocatorias));
});

fetch('../jugadores.json')
  .then((res) => res.json())
  .then((data) => {
    let dni = 39028680;
    const { jugadores } = data;
    jugadores.forEach((jugador) => {
      dni += 1;
      jugador.dni = dni;

      const filaDeJugadores = document.createElement('tr');

      const dniJugador = document.createElement('td');
      dniJugador.textContent = `${dni}`;

      const apellidoJugador = document.createElement('td');
      apellidoJugador.textContent = `${jugador.apellido}`;

      const nombreJugador = document.createElement('td');
      nombreJugador.textContent = `${jugador.nombre}`;

      const posicionJugador = document.createElement('td');
      posicionJugador.textContent = `${jugador.posicion}`;

      const apodoJugador = document.createElement('td');
      apodoJugador.textContent = `${jugador.apodo}`;

      const dorsalJugador = document.createElement('td');
      dorsalJugador.textContent = `${jugador.dorsal}`;

      const pieJugador = document.createElement('td');
      pieJugador.textContent = `${jugador.pie}`;

      filaDeJugadores.appendChild(dniJugador);
      filaDeJugadores.appendChild(apellidoJugador);
      filaDeJugadores.appendChild(nombreJugador);
      filaDeJugadores.appendChild(posicionJugador);
      filaDeJugadores.appendChild(apodoJugador);
      filaDeJugadores.appendChild(dorsalJugador);
      filaDeJugadores.appendChild(pieJugador);

      let tabla = document.querySelector('table');
      tabla.appendChild(filaDeJugadores);

      let botonEditar = document.createElement('button');
      let botonSeleccionar = document.createElement('button');

      filaDeJugadores.appendChild(botonEditar);
      botonEditar.innerText = 'Editar';

      filaDeJugadores.appendChild(botonSeleccionar);
      botonSeleccionar.innerText = 'Seleccionar';

      botonEditar.addEventListener('click', () => {
        const apellido = prompt('Ingrese el nuevo apellido:', jugador.apellido);
        const nombre = prompt('Ingrese el nuevo nombre:', jugador.nombre);
        const posicion = prompt('Ingrese la nueva posición:', jugador.posicion);
        const apodo = prompt('Ingrese el nuevo apodo:', jugador.apodo);
        const dorsal = prompt('Ingrese el nuevo dorsal:', jugador.dorsal);
        const pieDominante = prompt('Ingrese el nuevo pie dominante:', jugador.pieDominante);

        if (apellido && nombre && posicion && apodo && dorsal && pieDominante) {
          // Actualizar los datos del jugador
          jugador.apellido = apellido;
          jugador.nombre = nombre;
          jugador.posicion = posicion;
          jugador.apodo = apodo;
          jugador.dorsal = dorsal;
          jugador.pieDominante = pieDominante;

          // Guardar los datos actualizados en el archivo JSON
          guardarDatosEnJSON();
        }
      });

      botonSeleccionar.addEventListener('click', () => {
        if (!seleccionados.includes(jugador.nombre) && seleccionados.length < 11) {
          const numArquerosSeleccionados = seleccionados.filter((nombre) => {
            const jugadorSeleccionado = jugadores.find((j) => j.nombre === nombre);
            return jugadorSeleccionado.posicion === 'Arquero';
          }).length;

          if (jugador.posicion === 'Arquero' && numArquerosSeleccionados >= 1) {
            alert('Ya se ha seleccionado un arquero');
            return;
          }

          seleccionados.push(jugador.nombre);
          localStorage.setItem('seleccionados', JSON.stringify(seleccionados));

          const filaSeleccionado = document.createElement('tr');
          const dorsalSeleccionado = document.createElement('td');
          dorsalSeleccionado.textContent = jugador.dorsal;

          const posicionSeleccionado = document.createElement('td');
          posicionSeleccionado.textContent = jugador.posicion;

          const nombreSeleccionado = document.createElement('td');
          nombreSeleccionado.textContent = jugador.nombre;

          const apellidoSeleccionado = document.createElement('td');
          apellidoSeleccionado.textContent = jugador.apellido;

          const btnEliminarSeleccionado = document.createElement('button');
          btnEliminarSeleccionado.innerText = 'X';

          btnEliminarSeleccionado.addEventListener('click', () => {
            const indice = seleccionados.indexOf(jugador.nombre);
            if (indice !== -1) {
              seleccionados.splice(indice, 1);
              localStorage.setItem('seleccionados', JSON.stringify(seleccionados));
              filaSeleccionado.remove();
            }
          });

          filaSeleccionado.appendChild(dorsalSeleccionado);
          filaSeleccionado.appendChild(posicionSeleccionado);
          filaSeleccionado.appendChild(nombreSeleccionado);
          filaSeleccionado.appendChild(apellidoSeleccionado);
          filaSeleccionado.appendChild(btnEliminarSeleccionado);

          filaSeleccionados.appendChild(filaSeleccionado);
        }
      });
    });

    const filaSeleccionados = document.querySelector('.selectos');

    seleccionados.forEach((jugadorSeleccionado) => {
      const jugador = jugadores.find((j) => j.nombre === jugadorSeleccionado);

      if (jugador) {
        const filaSeleccionado = document.createElement('tr');
        const dorsalSeleccionado = document.createElement('td');
        dorsalSeleccionado.textContent = jugador.dorsal;

        const posicionSeleccionado = document.createElement('td');
        posicionSeleccionado.textContent = jugador.posicion;

        const nombreSeleccionado = document.createElement('td');
        nombreSeleccionado.textContent = jugador.nombre;

        const apellidoSeleccionado = document.createElement('td');
        apellidoSeleccionado.textContent = jugador.apellido;

        const btnEliminarSeleccionado = document.createElement('button');
        btnEliminarSeleccionado.innerText = 'X';

        btnEliminarSeleccionado.addEventListener('click', () => {
          console.log('Eliminado', jugador.nombre);

          const indice = seleccionados.indexOf(jugador.nombre);
          if (indice !== -1) {
            seleccionados.splice(indice, 1);
            localStorage.setItem('seleccionados', JSON.stringify(seleccionados));
            filaSeleccionado.remove();
          }
        });

        filaSeleccionado.appendChild(dorsalSeleccionado);
        filaSeleccionado.appendChild(posicionSeleccionado);
        filaSeleccionado.appendChild(nombreSeleccionado);
        filaSeleccionado.appendChild(apellidoSeleccionado);
        filaSeleccionado.appendChild(btnEliminarSeleccionado);

        filaSeleccionados.appendChild(filaSeleccionado);
      }
    });
  })
  .catch((error) => {
    console.error('Error al leer el archivo JSON:', error);
  });

let botonCrearNuevo = document.querySelector('.crearNuevo')


botonCrearNuevo.addEventListener('click', () => {
  const nuevoJugador = {
    apellido: document.querySelector('#apellidonuevo'),
    nombre: document.querySelector('#nombrenuevo'),
    posicion: document.querySelector('#posicionnuevo'),
    apodo: document.querySelector('#apodonuevo'),
    dorsal: document.querySelector('#dorsalnuevo'),
    pieDominante: document.querySelector('#piedominantenuevo'),
  };
  if (nuevoJugador.apellido && nuevoJugador.nombre && nuevoJugador.posicion && nuevoJugador.apodo && nuevoJugador.dorsal && nuevoJugador.pieDominante) {
    fetch('../jugadores.json')
      .then((res) => res.json())
      .then((data) => {
        const { jugadores } = data;
        jugadores.push(nuevoJugador);

        // guardarDatosEnJSON(jugadores);
      })
      .catch((error) => {
        console.error('Error al leer el archivo JSON:', error);
      });
  } else {
    alert('Debe completar todos los campos del nuevo jugador.');
  }
})


//funcion para guardar los datos en el json
// function guardarDatosEnJSON(jugadores) {
//   const datosActualizados = {
//     jugadores: jugadores,
//   };

//   fetch('../jugadores.json', {
//     method: 'PUT',
//     body: JSON.stringify(datosActualizados),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('Datos actualizados:', data);
//     })
//     .catch((error) => {
//       console.error('Error al guardar los datos en el archivo JSON:', error);
//     });
// }