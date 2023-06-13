let seleccionados = [];

// Obtener la lista de jugadores almacenada en el LocalStorage
const jugadoresGuardados = localStorage.getItem('jugadores');

if (jugadoresGuardados) {
  // Convertir la cadena JSON en un array de objetos
  const jugadores = JSON.parse(jugadoresGuardados);

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
        // Agregar el jugador seleccionado al array 'seleccionados'
        seleccionados.push(jugador);

        // Guardar el array 'seleccionados' en el LocalStorage
        localStorage.setItem('seleccionados', JSON.stringify(seleccionados));
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