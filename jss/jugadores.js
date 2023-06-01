let seleccionados = [];

// Recuperar los datos de jugadores seleccionados del LocalStorage
const seleccionadosGuardados = JSON.parse(localStorage.getItem('seleccionados'));
if (seleccionadosGuardados && Array.isArray(seleccionadosGuardados)) {
  seleccionados = seleccionadosGuardados;
}

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
        console.log('Editado', jugador.nombre);
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
 //todo se agrego la funcionalindad de que verifica que haya un arquero y sean hasta un máximo de 11 jugadores

 //todo falta agregar la funcion de editar jugador y agregar jugadores nuevos a la lista