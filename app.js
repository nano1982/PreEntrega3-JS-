const formulario = document.getElementById("formulario")
const juego = document.getElementById("juego")
const tablero = document.getElementById("tablero")
let turno = 0
let foot_tabla = document.getElementById('turno')
let td_nombre
let valorA1 = ""
let valorA2 = ""
let valorA3 = "" 
let valorB1 = ""
let valorB2 = "" 
let valorB3 = ""
let valorC1 = ""
let valorC2 = ""
let valorC3 = ""

const jugadores = []

// preparo las variables para los jugadores
let jugador1 = document.getElementById("jugador1")
let jugador2 = document.getElementById("jugador2")


// formatea el/los nombre/s ingresado/s
let play = (player) => {
    player = player.trim()
    let part1 = player.slice(0,1).toUpperCase()
    let part2 = player.slice(1).toLowerCase()
    player = part1.concat(part2)
    return player
}


// cargo la variable simbolo con el seleccionado por el usuario
let simbolo1 = "O"
let simbolo2 = "X"

const radio = document.getElementById("inlineRadio1")
radio.addEventListener('click', () => {
    if (radio.checked)
    {
        simbolo1 = "X"
        simbolo2 = "O"
    }
})




// botón para enviar el formulario
const enviar = document.getElementById("enviar")
enviar.addEventListener('click', (evento) =>
{
    evento.preventDefault();

    jugadores.push(new Usuario(jugador1.value, simbolo1, 0,0))
    jugadores.push(new Usuario(jugador2.value, simbolo2, 0,0))
    
    // formatea el nombre
    jugadores[0].nombre = play(jugadores[0].nombre)
    jugadores[1].nombre = play(jugadores[1].nombre)

    if (jugador1.value !="" && jugador2.value !="") // verifico que se hayan completado los campos del formulario
    {

    alert("Datos cargados correctamente\n¡A Jugar!")

    // escondo el formlario y hago visible el tablero y la tabla de posiciones
    formulario.style.visibility="hidden"
    juego.classList.remove("oculta")
    tablero.classList.remove("oculta")
    actualizar_tabla()
    // grabo los datos en el localStorage
    localStorage.setItem('jugadores', JSON.stringify(jugadores))
    }
    else if (jugador1.value == "") // alerta por si faltó escribir el nombre del primer jugador
    {
        alert("debe ingresar el nombre del primer jugador")
    }
    else if(jugador2.value == "") // alerta por si faltó escribir el nombre del segundo jugador
    {
        alert("debe ingresar el nombre del segundo jugador")
    }

})

// función para crear la tabla de posiciones de los jugadores
function actualizar_tabla()
{
    const tablita = document.getElementById("tablita")
    let fila
    jugadores.forEach((item) => {
        fila = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = item.nombre;
        fila.appendChild(td);

        td = document.createElement('td');
        td.textContent = item.contador;
        fila.appendChild(td);

        td = document.createElement('td');
        td.textContent = item.empates;
        fila.appendChild(td);

        tablita.appendChild(fila)
    })

    // agrego a la tabla el turno que está en juego
    let fila_foot = document.createElement('tr');
    fila_foot = document.createElement('tr');
    td_nombre = document.createElement('td');
    td_nombre.innerHTML = `<strong>Turno</strong>: ${jugadores[0].nombre}`;
    fila_foot.appendChild(td_nombre);

    foot_tabla.appendChild(fila_foot);
    
    
}

// declaro las variables casilleros del tablero
const a1 = document.getElementById("a1")
const a2 = document.getElementById("a2")
const a3 = document.getElementById("a3")
const b1 = document.getElementById("b1")
const b2 = document.getElementById("b2")
const b3 = document.getElementById("b3")
const c1 = document.getElementById("c1")
const c2 = document.getElementById("c2")
const c3 = document.getElementById("c3")

// esta función marca la casilla y avisa de quién es el turno
function pulsar(tecla, valorTecla)
{
    tecla.classList.remove('btn-dark')
    if (turno %2 == 0)
    {   valorTecla = simbolo1
        // avisa de quién es el turno
        td_nombre.innerHTML = `<strong>Turno</strong>: ${jugadores[1].nombre}`
        
        // marca el turno con el simbolo correspondiente
        tecla.textContent = simbolo1
        tecla.classList.add('btn-info')
        
    }
    else
    {
        valorTecla = simbolo2
        // avisa de quién es el turno
        td_nombre.innerHTML = `<strong>Turno</strong>: ${jugadores[0].nombre}`

        // marca el turno con el simbolo correspondiente
        tecla.textContent = simbolo2
   
        tecla.classList.add('btn-warning')
    }
    valorTecla = simbolo1
    tecla.setAttribute("disabled", "")
    turno++
    vertical()
}


// addEventListener de cada casilla
a1.addEventListener('click', () => {
    pulsar(a1, valorA1)
})
a2.addEventListener('click', () => {
    pulsar(a2, valorA2)
})

a3.addEventListener('click', () => {
    pulsar(a3, valorA3)
})
b1.addEventListener('click', () => {
    pulsar(b1, valorB1)
})
b2.addEventListener('click', () => {
    pulsar(b2, valorB2)
})

b3.addEventListener('click', () => {
    pulsar(b3, valorB3)
})
c1.addEventListener('click', () => {
    pulsar(c1, valorC1)
})
c2.addEventListener('click', () => {
    pulsar(c2, valorC2)
})

c3.addEventListener('click', () => {
    pulsar(c3, valorC3)
})


// verifica si hay tateti vertical
function vertical()
{
    console.log(valorA1)
    if (valorA1 == valorB1 && valorB1 == valorC1 && valorA1 != "")
    {
        a1.classList.remove('btn-warning')
        a1.classList.remove('btn-info')
        a1.classList.add('btn-success')
        b1.classList.remove('btn-warning')
        b1.classList.remove('btn-info')
        b1.classList.add('btn-success')
        c1.classList.remove('btn-warning')
        c1.classList.remove('btn-info')
        c1.classList.add('btn-success')
        a2.setAttribute("disabled", "")
        a3.setAttribute("disabled", "")
        b2.setAttribute("disabled", "")
        b3.setAttribute("disabled", "")
        c2.setAttribute("disabled", "")
        c3.setAttribute("disabled", "")

        console.log(valorA1)
        console.log(valorB2)
       
        return true
    }
}

