let todosLosJugadores = [];

fetch('../jugadores.json')
.then((res) => res.json())
.then((data) => {
  const { jugadores } = data;
  jugadores.forEach(jugador => {
    todosLosJugadores.push(jugador)
  });
  // Guardar la lista en el LocalStorage
  localStorage.setItem('jugadores', JSON.stringify(todosLosJugadores));
});