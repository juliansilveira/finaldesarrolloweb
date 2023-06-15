let seleccionados = [];
let convocatorias = [];
let jugadores = [];
let jugadoresConvocatoria = [];

// Obtener la lista de jugadores almacenada en el LocalStorage
const jugadoresGuardados = localStorage.getItem('jugadores');

if (jugadoresGuardados) {
  // Convertir la cadena JSON en un array de objetos
  jugadores = JSON.parse(jugadoresGuardados);

  // Hacer algo con la lista de jugadores
  jugadores.forEach(jugador => {
    const filaDeJugadores = document.createElement('tr');

    const dniJugador = document.createElement('td');
    dniJugador.textContent = `${jugador.dni}`;

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

    botonSeleccionar.addEventListener('click', () => {
      if (seleccionados.length < 11) {
        // Verificar si el jugador ya está seleccionado
        const jugadorRepetido = seleccionados.some(seleccionado => seleccionado.dni === jugador.dni);

        if (!jugadorRepetido) {
          // Verificar si el jugador seleccionado es arquero
          if (jugador.posicion === 'Arquero') {
            // Verificar si ya hay un arquero seleccionado
            const arqueroSeleccionado = seleccionados.some(seleccionado => seleccionado.posicion === 'Arquero');
            if (arqueroSeleccionado) {
              // Mostrar un mensaje de error o tomar alguna otra acción
              alert('Ya hay un arquero seleccionado');
              return;
            }
          }

          // Agregar el jugador seleccionado al array 'seleccionados'
          seleccionados.push(jugador);

          // Guardar el array 'seleccionados' en el LocalStorage
          localStorage.setItem('seleccionados', JSON.stringify(seleccionados));

          // Mostrar los jugadores seleccionados
          mostrarJugadoresSeleccionados();
        } else {
          // Mostrar un mensaje de error o tomar alguna otra acción
          alert('Este jugador ya ha sido seleccionado');
        }
      } else {
        // Mostrar un mensaje de error o tomar alguna otra acción
        alert('No se pueden seleccionar más de 11 jugadores');
      }
    });
  });
} else {
  // No se encontraron jugadores en el LocalStorage
  console.log('No se encontraron jugadores en el LocalStorage');
}

// Obtener los jugadores seleccionados del LocalStorage
const seleccionadosGuardados = localStorage.getItem('seleccionados');

if (seleccionadosGuardados) {
  // Convertir la cadena JSON en un array de objetos
  seleccionados = JSON.parse(seleccionadosGuardados);

  // Mostrar los jugadores seleccionados
  mostrarJugadoresSeleccionados();
} else {
  // No se encontraron jugadores seleccionados en el LocalStorage
  console.log('No se encontraron jugadores seleccionados en el LocalStorage');
}

// Obtener referencias a los elementos del formulario de convocatoria
const fechaInput = document.getElementById('fecha');
const rivalInput = document.getElementById('rival');
const capitanInput = document.getElementById('capitan');
const crearConvocatoriaBtn = document.getElementById('crearConvocatoria');
const listaConvocatorias = document.getElementById('listaConvocatorias');
let selectoss = document.querySelector('.selectos')

// Cargar las convocatorias almacenadas en el LocalStorage
const convocatoriasGuardadas = localStorage.getItem('convocatorias');

if (convocatoriasGuardadas) {
  // Convertir la cadena JSON en un array de objetos
  convocatorias = JSON.parse(convocatoriasGuardadas);

  // Mostrar las convocatorias en la lista
  convocatorias.forEach(convocatoria => {
    const convocatoriaItem = document.createElement('li');
    const btnconvocatoria = document.createElement('button')
    btnconvocatoria.classList.add('btnconvocatoria')
    btnconvocatoria.innerText = 'Mostrar'
    convocatoriaItem.textContent = `Fecha: ${convocatoria.fecha}, Rival: ${convocatoria.rival}, Capitán: ${convocatoria.capitan}`;

// Agregar evento de clic al botón "btnconvocatoria"
btnconvocatoria.addEventListener('click', () => {
  // Obtener la posición de la convocatoria en el array 'convocatorias'
  const posicionConvocatoria = Array.from(listaConvocatorias.children).indexOf(convocatoriaItem);

  // Verificar si la posición es válida
  if (posicionConvocatoria >= 0) {
    // Obtener la lista de jugadores de la convocatoria seleccionada
    const jugadoresConvocatoria = convocatorias[posicionConvocatoria].jugadores;

    // Limpiar la lista de jugadores seleccionados
    selectoss.innerHTML = '';

    // Mostrar los jugadores de la convocatoria seleccionada
    jugadoresConvocatoria.forEach(jugador => {
      const jugadorItem = document.createElement('li');
      jugadorItem.textContent = `${jugador.apellido}, ${jugador.nombre}, (${jugador.posicion})`;
      
      const btnEliminarJugador = document.createElement('button');
      btnEliminarJugador.classList.add('btnEliminarJugador')
      btnEliminarJugador.innerText = ' x ';
      jugadorItem.appendChild(btnEliminarJugador);

      btnEliminarJugador.addEventListener('click', () => {
        quitarJugadorDeSeleccion(jugador);
      });

      selectoss.appendChild(jugadorItem);
    });
  }
});

// Función para quitar un jugador de la selección
function quitarJugadorDeSeleccion(jugador) {
  const posicionConvocatoria = Array.from(listaConvocatorias.children).indexOf(convocatoriaItem);
  
  if (posicionConvocatoria >= 0) {
    const jugadoresConvocatoria = convocatorias[posicionConvocatoria].jugadores;
    const indiceJugador = jugadoresConvocatoria.findIndex(j => j.dni === jugador.dni);
    
    if (indiceJugador >= 0) {
      jugadoresConvocatoria.splice(indiceJugador, 1);
      localStorage.setItem('convocatorias', JSON.stringify(convocatorias));
      
      // Actualizar la lista de jugadores seleccionados en el DOM
      btnconvocatoria.click();
    }
  }
}



    convocatoriaItem.appendChild(btnconvocatoria);
    listaConvocatorias.appendChild(convocatoriaItem);
  });
}

// Agregar evento de clic al botón "Crear Convocatoria"
crearConvocatoriaBtn.addEventListener('click', () => {
  // Obtener los valores del formulario
  const fecha = fechaInput.value;
  const rival = rivalInput.value;
  const capitan = capitanInput.value;


  // Crear el objeto de convocatoria
  const convocatoria = {
    fecha: fecha,
    rival: rival,
    capitan: capitan,
    jugadores: seleccionados
  };

  // Agregar la convocatoria al array de convocatorias
  convocatorias.push(convocatoria);

  // Guardar el array de convocatorias en el LocalStorage
  localStorage.setItem('convocatorias', JSON.stringify(convocatorias));

  // Mostrar la convocatoria en la lista
  const convocatoriaItem = document.createElement('li');
  convocatoriaItem.textContent = `Fecha: ${convocatoria.fecha}, Rival: ${convocatoria.rival}, Capitán: ${convocatoria.capitan}`;

  listaConvocatorias.appendChild(convocatoriaItem);

  // Limpiar los campos del formulario
  fechaInput.value = '';
  rivalInput.value = '';
  capitanInput.value = '';
  selectoss.innerText = '';
  

  // Limpiar la lista de jugadores seleccionados
  seleccionados = [];
  localStorage.removeItem('seleccionados');
});

function mostrarJugadoresSeleccionados() {
  const filaSeleccionados = document.querySelector('.selectos');
  filaSeleccionados.innerHTML = '';

  seleccionados.forEach(jugador => {
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
      // Eliminar el jugador de la lista de seleccionados
      seleccionados = seleccionados.filter(seleccionado => seleccionado.dni !== jugador.dni);

      // Guardar el array actualizado en el LocalStorage
      localStorage.setItem('seleccionados', JSON.stringify(seleccionados));

      // Volver a mostrar los jugadores seleccionados
      mostrarJugadoresSeleccionados();
    });

    filaSeleccionado.appendChild(dorsalSeleccionado);
    filaSeleccionado.appendChild(posicionSeleccionado);
    filaSeleccionado.appendChild(nombreSeleccionado);
    filaSeleccionado.appendChild(apellidoSeleccionado);
    filaSeleccionado.appendChild(btnEliminarSeleccionado);

    filaSeleccionados.appendChild(filaSeleccionado);
  });
}

// Obtener referencias a los elementos del formulario de creación de jugador
const dniNuevoInput = document.getElementById('dninuevo');
const apellidoNuevoInput = document.getElementById('apellidonuevo');
const nombreNuevoInput = document.getElementById('nombrenuevo');
const posicionNuevoInput = document.getElementById('posicionnuevo');
const apodoNuevoInput = document.getElementById('apodonuevo');
const dorsalNuevoInput = document.getElementById('dorsalnuevo');
const pieDominanteNuevoInput = document.getElementById('piedominantenuevo');
const crearNuevoBtn = document.querySelector('.crearNuevo');

// Agregar evento de clic al botón "Crear nuevo"
crearNuevoBtn.addEventListener('click', () => {
  // Obtener los valores del formulario de creación de jugador
  const dniNuevo = dniNuevoInput.value;
  const apellidoNuevo = apellidoNuevoInput.value;
  const nombreNuevo = nombreNuevoInput.value;
  const posicionNuevo = posicionNuevoInput.value;
  const apodoNuevo = apodoNuevoInput.value;
  const dorsalNuevo = dorsalNuevoInput.value;
  const pieDominanteNuevo = pieDominanteNuevoInput.value;

  // Crear el objeto de jugador nuevo
  const jugadorNuevo = {
    dni: dniNuevo,
    apellido: apellidoNuevo,
    nombre: nombreNuevo,
    posicion: posicionNuevo,
    apodo: apodoNuevo,
    dorsal: dorsalNuevo,
    pie: pieDominanteNuevo
  };

  // Agregar el jugador nuevo a la lista de jugadores
  jugadores.push(jugadorNuevo);

  // Guardar la lista de jugadores en el LocalStorage
  localStorage.setItem('jugadores', JSON.stringify(jugadores));

  // Limpiar los campos del formulario de creación de jugador
  dniNuevoInput.value = '';
  apellidoNuevoInput.value = '';
  nombreNuevoInput.value = '';
  posicionNuevoInput.value = '';
  apodoNuevoInput.value = '';
  dorsalNuevoInput.value = '';
  pieDominanteNuevoInput.value = '';

  // Actualizar la tabla de jugadores mostrados en la interfaz
  const filaDeJugadores = document.createElement('tr');

  const dniJugador = document.createElement('td');
  dniJugador.textContent = `${jugadorNuevo.dni}`;

  const apellidoJugador = document.createElement('td');
  apellidoJugador.textContent = `${jugadorNuevo.apellido}`;

  const nombreJugador = document.createElement('td');
  nombreJugador.textContent = `${jugadorNuevo.nombre}`;

  const posicionJugador = document.createElement('td');
  posicionJugador.textContent = `${jugadorNuevo.posicion}`;

  const apodoJugador = document.createElement('td');
  apodoJugador.textContent = `${jugadorNuevo.apodo}`;

  const dorsalJugador = document.createElement('td');
  dorsalJugador.textContent = `${jugadorNuevo.dorsal}`;

  const pieJugador = document.createElement('td');
  pieJugador.textContent = `${jugadorNuevo.pie}`;

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

  botonSeleccionar.addEventListener('click', () => {
    if (seleccionados.length < 11) {
      // Verificar si el jugador ya está seleccionado
      const jugadorRepetido = seleccionados.some(seleccionado => seleccionado.dni === jugadorNuevo.dni);

      if (!jugadorRepetido) {
        // Verificar si el jugador seleccionado es arquero
        if (jugadorNuevo.posicion === 'Arquero') {
          // Verificar si ya hay un arquero seleccionado
          const arqueroSeleccionado = seleccionados.some(seleccionado => seleccionado.posicion === 'Arquero');
          if (arqueroSeleccionado) {
            // Mostrar un mensaje de error o tomar alguna otra acción
            alert('Ya hay un arquero seleccionado');
            return;
          }
        }

        // Agregar el jugador seleccionado al array 'seleccionados'
        seleccionados.push(jugadorNuevo);

        // Guardar el array 'seleccionados' en el LocalStorage
        localStorage.setItem('seleccionados', JSON.stringify(seleccionados));

        // Mostrar los jugadores seleccionados
        mostrarJugadoresSeleccionados();
      } else {
        // Mostrar un mensaje de error o tomar alguna otra acción
        alert('Este jugador ya ha sido seleccionado');
      }
    } else {
      // Mostrar un mensaje de error o tomar alguna otra acción
      alert('No se pueden seleccionar más de 11 jugadores');
    }
  });
});

// Obtener los elementos de filtro por nombre, apellido, dorsal y posición
const filtroNombreInput = document.getElementById('filtroNombre');
const filtroApellidoInput = document.getElementById('filtroApellido');
const filtroDorsalInput = document.getElementById('filtroDorsal');
const filtroPosicionInput = document.getElementById('filtroPosicion');

// Obtener la tabla de jugadores
const tablaJugadores = document.querySelector('.container-jugadores table');

// Agregar eventos de entrada a los campos de filtro
filtroNombreInput.addEventListener('input', filtrarJugadores);
filtroApellidoInput.addEventListener('input', filtrarJugadores);
filtroDorsalInput.addEventListener('input', filtrarJugadores);
filtroPosicionInput.addEventListener('input', filtrarJugadores);

// Función de filtrado de jugadores
function filtrarJugadores() {
  const filtroNombre = filtroNombreInput.value.toLowerCase();
  const filtroApellido = filtroApellidoInput.value.toLowerCase();
  const filtroDorsal = filtroDorsalInput.value.toLowerCase();
  const filtroPosicion = filtroPosicionInput.value.toLowerCase();

  // Obtener todas las filas de jugadores excepto la primera (encabezado)
  const filasJugadores = tablaJugadores.querySelectorAll('tr:not(:first-child)');

  filasJugadores.forEach(fila => {
    const nombre = fila.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const apellido = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const dorsal = fila.querySelector('td:nth-child(6)').textContent.toLowerCase();
    const posicion = fila.querySelector('td:nth-child(4)').textContent.toLowerCase();

    // Verificar si el nombre, apellido, dorsal y/o posición del jugador coincide con los filtros
    const nombreCoincide = nombre.includes(filtroNombre);
    const apellidoCoincide = apellido.includes(filtroApellido);
    const dorsalCoincide = dorsal.includes(filtroDorsal);
    const posicionCoincide = posicion.includes(filtroPosicion);

    // Mostrar la fila si todos los filtros coinciden, o si no se ingresó ningún valor en algún filtro
    if ((nombreCoincide || filtroNombre === '') && (apellidoCoincide || filtroApellido === '') &&
        (dorsalCoincide || filtroDorsal === '') && (posicionCoincide || filtroPosicion === '')) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none'; // Ocultar la fila si no coincide con los filtros
    }
  });
}
