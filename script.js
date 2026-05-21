// ======================================
// VARIABLES GLOBALES
// ======================================

let dinero = 0;
let meta = 0;
let apuesta = 0;
let ladoElegido = "";

let jugadas = 0;
let victorias = 0;
let derrotas = 0;

let numerosPseudoaleatorios = [];

let historialExperimentos = [];


// ======================================
// GENERADOR CONGRUENCIAL LINEAL
// ======================================

let semilla = 0;
let a = 0;
let c = 0;
let m = 0;


// ======================================
// GENERAR NÚMEROS
// ======================================

function generarNumeros(cantidad){

    let numeros = [];

    let x = semilla;

    for(let i = 0; i < cantidad; i++){

        x = (a * x + c) % m;

        let numero = x / m;

        numeros.push(numero);
    }

    semilla = x;

    return numeros;
}


// ======================================
// PRUEBA 1 - PROMEDIOS
// ======================================

function realizarPruebaPromedios(){

    // Obtiene parámetros ingresados por el usuario

semilla = Number(
    document.getElementById("semilla").value
);

a = Number(
    document.getElementById("valorA").value
);

c = Number(
    document.getElementById("valorC").value
);

m = Number(
    document.getElementById("valorM").value
);

    numerosPseudoaleatorios = generarNumeros(100);

    let suma = 0;

    let textoNumeros = "";

    for(let i = 0; i < numerosPseudoaleatorios.length; i++){

        suma += numerosPseudoaleatorios[i];

        textoNumeros += `
        <div class="numero-item">
            Número ${i + 1}: 
            ${numerosPseudoaleatorios[i].toFixed(4)}
        </div>
        `;
    }

    let promedio = suma / numerosPseudoaleatorios.length;

    document.getElementById("numerosGenerados").innerHTML =
    textoNumeros;

    if(promedio >= 0.45 && promedio <= 0.55){

        document.getElementById("resultadoPrueba").innerHTML =
        `
        ✅ Prueba aceptada
        <br>
        📈 Promedio obtenido:
        <b>${promedio.toFixed(4)}</b>
        `;

        localStorage.setItem(
            "numeros",
            JSON.stringify(numerosPseudoaleatorios)
        );

        document.getElementById("btnSiguiente").style.display =
        "inline-block";

    }else{

        document.getElementById("resultadoPrueba").innerHTML =
        `
        ❌ Prueba rechazada
        <br>
        📈 Promedio obtenido:
        <b>${promedio.toFixed(4)}</b>
        <br><br>
        Vuelve a realizar la prueba.
        `;

        document.getElementById("btnSiguiente").style.display =
        "none";
    }
}


// ======================================
// PRUEBA 2 - FRECUENCIA
// ======================================

function realizarPruebaFrecuencia(){

    numerosPseudoaleatorios =
    JSON.parse(localStorage.getItem("numeros"));

    if(!numerosPseudoaleatorios){

        alert(
            "Primero debes aprobar la prueba No. 1"
        );

        location.href = "index.html";

        return;
    }

    let caras = 0;
    let cruces = 0;

    let texto = "";

    for(let i = 0; i < numerosPseudoaleatorios.length; i++){

        let numero = numerosPseudoaleatorios[i];

        let resultado = "";

        if(numero < 0.5){

            caras++;

            resultado = "Cara";

        }else{

            cruces++;

            resultado = "Cruz";
        }

        texto += `
        <div class="numero-item">

            Número ${i + 1}:
            ${numero.toFixed(4)}

            → ${resultado}

        </div>
        `;
    }

    let diferencia = Math.abs(caras - cruces);

    document.getElementById("numerosFrecuencia").innerHTML =
    texto;

    if(diferencia <= 20){

        document.getElementById("resultadoFrecuencia").innerHTML =
        `
        ✅ Prueba aceptada

        <br>

        🪙 Cara:
        <b>${caras}</b>

        <br>

        ❌ Cruz:
        <b>${cruces}</b>

        <br>

        📊 Diferencia:
        <b>${diferencia}</b>
        `;

        document.getElementById("btnJuego").style.display =
        "inline-block";

    }else{

        document.getElementById("resultadoFrecuencia").innerHTML =
        `
        ❌ Prueba rechazada

        <br>

        🪙 Cara:
        <b>${caras}</b>

        <br>

        ❌ Cruz:
        <b>${cruces}</b>

        <br><br>

        Vuelve a realizar la prueba.
        `;

        document.getElementById("btnJuego").style.display =
        "none";
    }
}


// ======================================
// INICIAR JUEGO
// ======================================

function iniciarJuego(){

    numerosPseudoaleatorios =
    JSON.parse(localStorage.getItem("numeros"));

    if(!numerosPseudoaleatorios){

        alert(
            "Primero debes aprobar las pruebas"
        );

        location.href = "index.html";

        return;
    }

    dinero = Number(
        document.getElementById("dineroInicial").value
    );

    meta = Number(
        document.getElementById("meta").value
    );

    apuesta = Number(
        document.getElementById("apuestaInicial").value
    );

    ladoElegido =
    document.getElementById("ladoElegido").value;

    jugadas = 0;
    victorias = 0;
    derrotas = 0;

    document.getElementById("btnVolado").disabled =
    false;

    document.getElementById("btnReiniciar").style.display =
    "none";

    document.getElementById("configuracionInicial")
    .style.display = "none";

    document.getElementById("controlesJuego")
    .style.display = "flex";

    actualizarPantalla();

    document.getElementById("resultado").innerHTML =
    `
    Juego iniciado.
    Puedes comenzar a lanzar volados.
    `;
}


// ======================================
// JUGAR VOLADO
// ======================================

function jugarVolado(){

    apuesta = Number(
        document.getElementById("apuestaInicial").value
    );

    ladoElegido =
    document.getElementById("ladoElegido").value;

    if(apuesta <= 0){

        alert(
            "La apuesta debe ser mayor a 0"
        );

        return;
    }

    if(apuesta > dinero){

        alert(
            "No puedes apostar más dinero del que tienes"
        );

        return;
    }

    let numero =
    numerosPseudoaleatorios[jugadas];

    if(numero === undefined){

        alert(
            "Ya no hay más números pseudoaleatorios."
        );

        return;
    }

    let resultadoMoneda = "";

    if(numero < 0.5){

        resultadoMoneda = "Cara";

    }else{

        resultadoMoneda = "Cruz";
    }

    animarMoneda(resultadoMoneda);

    jugadas++;

    setTimeout(() => {

        if(ladoElegido === resultadoMoneda){

            victorias++;

            dinero += apuesta;

            document.getElementById("resultado")
            .innerHTML =
            `
            🎲 Número generado:
            <b>${numero.toFixed(4)}</b>

            <br>

            🪙 Resultado:
            <b>${resultadoMoneda}</b>

            <br>

            ✅ Ganaste $${apuesta}.
            `;

        }else{

            derrotas++;

            dinero -= apuesta;

            if(dinero < 0){

                dinero = 0;
            }

            document.getElementById("resultado")
            .innerHTML =
            `
            🎲 Número generado:
            <b>${numero.toFixed(4)}</b>

            <br>

            🪙 Resultado:
            <b>${resultadoMoneda}</b>

            <br>

            ❌ Perdiste $${apuesta}.
            `;
        }

        actualizarPantalla();

        if(dinero <= 0 || dinero >= meta){

            finalizarJuego();
        }

    }, 1500);
}


// ======================================
// ANIMACIÓN MONEDA
// ======================================

function animarMoneda(resultadoMoneda){

    const moneda =
    document.getElementById("moneda");

    moneda.classList.remove("girar-cara");
    moneda.classList.remove("girar-cruz");

    void moneda.offsetWidth;

    if(resultadoMoneda === "Cara"){

        moneda.classList.add("girar-cara");

    }else{

        moneda.classList.add("girar-cruz");
    }
}


// ======================================
// ACTUALIZAR PANTALLA
// ======================================

function actualizarPantalla(){

    document.getElementById("jugadas").textContent =
    jugadas;

    document.getElementById("victorias").textContent =
    victorias;

    document.getElementById("derrotas").textContent =
    derrotas;

    document.getElementById("dineroActual").textContent =
    dinero;

    document.getElementById("metaActual").textContent =
    meta;

    document.getElementById("apuestaActual").textContent =
    apuesta;

    document.getElementById("ladoActual").textContent =
    ladoElegido;
}


// ======================================
// FINALIZAR JUEGO
// ======================================

function finalizarJuego(){

    document.getElementById("btnVolado").disabled =
    true;

    let probabilidad = 0;

    if(jugadas > 0){

        probabilidad =
        (victorias / jugadas) * 100;
    }

    let resultadoFinal = "";

    if(dinero <= 0){

        dinero = 0;

        resultadoFinal =
        "El jugador se quedó sin dinero.";

        document.getElementById("resultado")
        .innerHTML +=
        `
        <br><br>

        💀 ${resultadoFinal}

        <br>

        📊 Probabilidad de ganar:
        ${probabilidad.toFixed(2)}%
        `;

    }else if(dinero >= meta){

        resultadoFinal =
        "El jugador alcanzó la meta.";

        document.getElementById("resultado")
        .innerHTML +=
        `
        <br><br>

        🏆 ${resultadoFinal}

        <br>

        📊 Probabilidad de ganar:
        ${probabilidad.toFixed(2)}%
        `;
    }

    guardarExperimento(
        probabilidad,
        resultadoFinal
    );

    generarConclusion(
        probabilidad,
        resultadoFinal
    );

    actualizarPantalla();

    document.getElementById("btnReiniciar")
    .style.display = "block";
}


// ======================================
// GUARDAR EXPERIMENTO
// ======================================

function guardarExperimento(
    probabilidad,
    resultadoFinal
){

    let experimento = {

        numero:
        historialExperimentos.length + 1,

        jugadas: jugadas,

        victorias: victorias,

        derrotas: derrotas,

        probabilidad:
        probabilidad.toFixed(2),

        resultado: resultadoFinal
    };

    historialExperimentos.push(experimento);

    mostrarHistorial();
}


// ======================================
// MOSTRAR HISTORIAL
// ======================================

function mostrarHistorial(){

    let texto = "";

    for(
        let i = 0;
        i < historialExperimentos.length;
        i++
    ){

        texto +=
        `
        <p>

            <b>
                Experimento
                ${historialExperimentos[i].numero}
            </b>

            <br>

            Jugadas:
            ${historialExperimentos[i].jugadas}

            <br>

            Victorias:
            ${historialExperimentos[i].victorias}

            <br>

            Derrotas:
            ${historialExperimentos[i].derrotas}

            <br>

            Probabilidad:
            ${historialExperimentos[i].probabilidad}%

            <br>

            Resultado:
            ${historialExperimentos[i].resultado}

        </p>

        <hr>
        `;
    }

    document.getElementById("historialExperimentos")
    .innerHTML = texto;
}


// ======================================
// CONCLUSIÓN
// ======================================

function generarConclusion(
    probabilidad,
    resultadoFinal
){

    let conclusion = "";

    if(probabilidad >= 50){

        conclusion =
        `
        La simulación mostró un comportamiento favorable para el jugador,
        ya que obtuvo más victorias que derrotas durante las jugadas realizadas.
        Esto permitió aumentar el dinero inicial hasta alcanzar la meta establecida.

        <br><br>

        📊 Probabilidad de ganar:
        <b>${probabilidad.toFixed(2)}%</b>

        <br><br>

        ✅ Resultado final:
        ${resultadoFinal}
        `;

    }else{

        conclusion =
        `
        La simulación mostró un comportamiento desfavorable para el jugador,
        debido a que se registraron más derrotas que victorias.
        Como resultado, el jugador perdió todo su dinero antes de alcanzar la meta.

        <br><br>

        📊 Probabilidad de ganar:
        <b>${probabilidad.toFixed(2)}%</b>

        <br><br>

        ❌ Resultado final:
        ${resultadoFinal}
        `;
    }

    document.getElementById("conclusion")
    .innerHTML = conclusion;
}


// ======================================
// REINICIAR JUEGO
// ======================================

function reiniciarJuego(){

    dinero = 0;
    meta = 0;
    apuesta = 0;
    ladoElegido = "---";

    jugadas = 0;
    victorias = 0;
    derrotas = 0;

    document.getElementById("btnVolado").disabled =
    true;

    document.getElementById("btnReiniciar")
    .style.display = "none";

    document.getElementById("configuracionInicial")
    .style.display = "flex";

    document.getElementById("controlesJuego")
    .style.display = "none";

    document.getElementById("resultado").innerHTML =
    "Configura nuevamente el juego para comenzar.";

    actualizarPantalla();

}


// ======================================
// REINICIAR EXPERIMENTOS
// ======================================

function reiniciarExperimentos(){

    historialExperimentos = [];

    document.getElementById(
        "historialExperimentos"
    ).innerHTML =
    "Aún no hay experimentos registrados.";

    document.getElementById(
        "conclusion"
    ).innerHTML =
    "La conclusión se mostrará al finalizar el juego.";

}