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
let mensaje // para anunciar al ganador

let jugadores = []
let ganador

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
    
    jugadores = JSON.parse(localStorage.getItem('jugadores'))
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
function pulsar(tecla)
{
    tecla.classList.remove('btn-dark')
    let valorTecla
    if (turno %2 == 0)
    {           
        // marca el turno con el simbolo correspondiente
        tecla.textContent = simbolo1
        valorTecla = simbolo1
        // avisa de quién es el turno
        td_nombre.innerHTML = `<strong>Turno</strong>: ${jugadores[1].nombre}`
        tecla.classList.add('btn-info')
        tecla.setAttribute("disabled", "")
        turno++
        return valorTecla
        
    }
    else
    {
        // marca el turno con el simbolo correspondiente
        tecla.textContent = simbolo2
        valorTecla = simbolo2
        // avisa de quién es el turno
        td_nombre.innerHTML = `<strong>Turno</strong>: ${jugadores[0].nombre}`
        tecla.classList.add('btn-warning')
        tecla.setAttribute("disabled", "")
        turno++
        return valorTecla
    }
    
}

// verifica si hay tateti vertical
function vertical()
{

    if (valorA1 == valorB1 && valorB1 == valorC1 && valorA1 != "" && valorA1 != undefined)
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

        return true
    
       
    }
    else if (valorA2 == valorB2 && valorB2 == valorC2 && valorA2 != "" && valorA2 != undefined)
    {
        a2.classList.remove('btn-warning')
        a2.classList.remove('btn-info')
        a2.classList.add('btn-success')
        b2.classList.remove('btn-warning')
        b2.classList.remove('btn-info')
        b2.classList.add('btn-success')
        c2.classList.remove('btn-warning')
        c2.classList.remove('btn-info')
        c2.classList.add('btn-success')
        a1.setAttribute("disabled", "")
        a3.setAttribute("disabled", "")
        b1.setAttribute("disabled", "")
        b3.setAttribute("disabled", "")
        c1.setAttribute("disabled", "")
        c3.setAttribute("disabled", "")

        return true

    }
    else if (valorA3 == valorB3 && valorB3 == valorC3 && valorA3 != "" && valorA3 != undefined)
    {
        a3.classList.remove('btn-warning')
        a3.classList.remove('btn-info')
        a3.classList.add('btn-success')
        b3.classList.remove('btn-warning')
        b3.classList.remove('btn-info')
        b3.classList.add('btn-success')
        c3.classList.remove('btn-warning')
        c3.classList.remove('btn-info')
        c3.classList.add('btn-success')
        a1.setAttribute("disabled", "")
        a2.setAttribute("disabled", "")
        b1.setAttribute("disabled", "")
        b2.setAttribute("disabled", "")
        c1.setAttribute("disabled", "")
        c2.setAttribute("disabled", "")

        return true
    }
    else
    {
        return false
    }
}

// horizontal si hay tateti horizontal
function horizontal()
{

    if (valorA1 == valorA2 && valorA2 == valorA3 && valorA1 != "" && valorA1 != undefined)
    {
        a1.classList.remove('btn-warning')
        a1.classList.remove('btn-info')
        a1.classList.add('btn-success')
        a2.classList.remove('btn-warning')
        a2.classList.remove('btn-info')
        a2.classList.add('btn-success')
        a3.classList.remove('btn-warning')
        a3.classList.remove('btn-info')
        a3.classList.add('btn-success')
        b1.setAttribute("disabled", "")
        b2.setAttribute("disabled", "")
        b3.setAttribute("disabled", "")
        c1.setAttribute("disabled", "")
        c2.setAttribute("disabled", "")
        c3.setAttribute("disabled", "")


        return true

    }
    if (valorB1 == valorB2 && valorB2 == valorB3 && valorB1 != "" && valorB1 != undefined)
    {
        b1.classList.remove('btn-warning')
        b1.classList.remove('btn-info')
        b1.classList.add('btn-success')
        b2.classList.remove('btn-warning')
        b2.classList.remove('btn-info')
        b2.classList.add('btn-success')
        b3.classList.remove('btn-warning')
        b3.classList.remove('btn-info')
        b3.classList.add('btn-success')
        a1.setAttribute("disabled", "")
        a2.setAttribute("disabled", "")
        a3.setAttribute("disabled", "")
        c1.setAttribute("disabled", "")
        c2.setAttribute("disabled", "")
        c3.setAttribute("disabled", "")

        return true
    }
    if (valorC1 == valorC2 && valorC2 == valorC3 && valorC1 != "" && valorC1 != undefined)
    {
        c1.classList.remove('btn-warning')
        c1.classList.remove('btn-info')
        c1.classList.add('btn-success')
        c2.classList.remove('btn-warning')
        c2.classList.remove('btn-info')
        c2.classList.add('btn-success')
        c3.classList.remove('btn-warning')
        c3.classList.remove('btn-info')
        c3.classList.add('btn-success')
        a1.setAttribute("disabled", "")
        a2.setAttribute("disabled", "")
        a3.setAttribute("disabled", "")
        b1.setAttribute("disabled", "")
        b2.setAttribute("disabled", "")
        b3.setAttribute("disabled", "")

        return true
    }
    else
    {
        return false
    }   

}

function diagonal()
{
    if (valorA1 == valorB2 && valorB2 == valorC3 && valorA1 != "" && valorA1 != undefined)
    {
        a1.classList.remove('btn-warning')
        a1.classList.remove('btn-info')
        a1.classList.add('btn-success')
        b2.classList.remove('btn-warning')
        b2.classList.remove('btn-info')
        b2.classList.add('btn-success')
        c3.classList.remove('btn-warning')
        c3.classList.remove('btn-info')
        c3.classList.add('btn-success')
        a2.setAttribute("disabled", "")
        a3.setAttribute("disabled", "")
        b1.setAttribute("disabled", "")
        b3.setAttribute("disabled", "")
        c1.setAttribute("disabled", "")
        c2.setAttribute("disabled", "")

        return true
        
    }
    else if (valorA3 == valorB2 && valorB2 == valorC1 && valorA3 != "" && valorA3 != undefined)
    {
        a3.classList.remove('btn-warning')
        a3.classList.remove('btn-info')
        a3.classList.add('btn-success')
        b2.classList.remove('btn-warning')
        b2.classList.remove('btn-info')
        b2.classList.add('btn-success')
        c1.classList.remove('btn-warning')
        c1.classList.remove('btn-info')
        c1.classList.add('btn-success')
        a1.setAttribute("disabled", "")
        a2.setAttribute("disabled", "")
        b1.setAttribute("disabled", "")
        b3.setAttribute("disabled", "")
        c2.setAttribute("disabled", "")
        c3.setAttribute("disabled", "")

        return true
    }
    else
    {
        return false
    } 

}

function chequear()
{
    if (horizontal())
    {
        if (turno %2 == 0)
        {
            ganador = jugadores[1].nombre;
            jugadores[1].contador++
            localStorage.setItem('jugadores', JSON.stringify(jugadores))
        }
        else
        {
            ganador = jugadores[0].nombre;
            jugadores[0].contador++
            localStorage.setItem('jugadores', JSON.stringify(jugadores))

        }
        mensaje = "¡Ganaste! ".concat(ganador)
        alert(mensaje)
        tablita.innerHTML = ''
        foot_tabla = ''
        actualizar_tabla()
    }
    else if(vertical())
    {
        if (turno %2 == 0)
        {
            ganador = jugadores[1].nombre;
            jugadores[1].contador++
            localStorage.setItem('jugadores', JSON.stringify(jugadores)) 
        }
        else
        {
            ganador = jugadores[0].nombre;
            jugadores[0].contador++
            localStorage.setItem('jugadores', JSON.stringify(jugadores))

        }
        mensaje = "¡Ganaste! ".concat(ganador)
        alert(mensaje)
        tablita.innerHTML = ''
        foot_tabla = ''
        actualizar_tabla()
    }
    else if(diagonal())
    {
        if (turno %2 == 0)
        {
            ganador = jugadores[1].nombre;
            jugadores[1].contador++
            localStorage.setItem('jugadores', JSON.stringify(jugadores))  
        }
        else
        {
            ganador = jugadores[0].nombre;
            jugadores[0].contador++
            localStorage.setItem('jugadores', JSON.stringify(jugadores))

        }
        mensaje = "¡Ganaste! ".concat(ganador)
        alert(mensaje)
        tablita.innerHTML = ''
        foot_tabla = ''
        actualizar_tabla()
    }
    else if (turno == 9)
    {
        alert("¡Empate!")
        jugadores[0].empates++
        jugadores[1].empates++
        localStorage.setItem('jugadores', JSON.stringify(jugadores))
        tablita.innerHTML = ''
        foot_tabla = ''
        actualizar_tabla()
    }
}


// addEventListener de cada casilla
a1.addEventListener('click', () => {
    valorA1 = pulsar(a1)
    chequear()
})

a2.addEventListener('click', () => {
    valorA2 = pulsar(a2)
    chequear()
})

a3.addEventListener('click', () => {
    valorA3 = pulsar(a3)
    chequear()
})

b1.addEventListener('click', () => {
    valorB1 = pulsar(b1)
    chequear()
})

b2.addEventListener('click', () => {
    valorB2 = pulsar(b2)
    chequear()   
})

b3.addEventListener('click', () => {
    valorB3 = pulsar(b3)
    chequear()
})

c1.addEventListener('click', () => {
    valorC1 = pulsar(c1)
    chequear()   
})

c2.addEventListener('click', () => {
    valorC2 = pulsar(c2)
    chequear()
})

c3.addEventListener('click', () => {
    valorC3 = pulsar(c3)
    chequear()
})