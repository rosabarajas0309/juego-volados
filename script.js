let dinero = 0;
let meta = 0;
let apuesta = 0;
let apuestaInicial = 0;
let ladoElegido = "";

let jugadas = 0;
let victorias = 0;
let derrotas = 0;

let numerosPseudoaleatorios = [];

function iniciarJuego(){

    dinero = Number(document.getElementById("dineroInicial").value);
    meta = Number(document.getElementById("meta").value);

    jugadas = 0;
    victorias = 0;
    derrotas = 0;

    numerosPseudoaleatorios = generarNumeros(100);

    pruebaPromedios();
    pruebaFrecuencia();

    document.getElementById("btnVolado").disabled = false;

    document.getElementById("configuracionInicial").style.display = "none";
    document.getElementById("controlesJuego").style.display = "flex";

    actualizarPantalla();

    document.getElementById("resultado").innerHTML =
    `Juego iniciado. Ahora puedes modificar tu apuesta y elegir Cara o Cruz antes de cada volado.`;
}

function generarNumeros(cantidad){

    let numeros = [];

    for(let i = 0; i < cantidad; i++){

        numeros.push(Math.random());
    }

    return numeros;
}

function jugarVolado(){

    apuesta = Number(document.getElementById("apuestaInicial").value);
    ladoElegido = document.getElementById("ladoElegido").value;

    if(apuesta <= 0){
        alert("La apuesta debe ser mayor a 0");
        return;
    }

    if(apuesta > dinero){
        alert("No puedes apostar más dinero del que tienes");
        return;
    }

    actualizarPantalla();

    if(dinero <= 0 || dinero >= meta){
        finalizarJuego();
        return;
    }

    let numero = numerosPseudoaleatorios[jugadas];

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

            dinero = dinero + apuesta;

            document.getElementById("resultado").innerHTML =
            `Salió <b>${resultadoMoneda}</b>. Ganaste $${apuesta}.`;

        }else{

            derrotas++;

            dinero = dinero - apuesta;

            document.getElementById("resultado").innerHTML =
            `Salió <b>${resultadoMoneda}</b>. Perdiste $${apuesta}.`;
        }

        actualizarPantalla();

        if(dinero <= 0 || dinero >= meta){
            finalizarJuego();
        }

    }, 1500);
}

function animarMoneda(resultadoMoneda){

    const moneda = document.getElementById("moneda");

    moneda.classList.remove("girar-cara");
    moneda.classList.remove("girar-cruz");

    void moneda.offsetWidth;

    if(resultadoMoneda === "Cara"){
        moneda.classList.add("girar-cara");
    }else{
        moneda.classList.add("girar-cruz");
    }
}

function pruebaPromedios(){

    let suma = 0;

    for(let i = 0; i < numerosPseudoaleatorios.length; i++){
        suma = suma + numerosPseudoaleatorios[i];
    }

    let promedio = suma / numerosPseudoaleatorios.length;

    if(promedio >= 0.45 && promedio <= 0.55){

        document.getElementById("pruebaPromedios").innerHTML =
        `Prueba de promedios: Aceptada. Promedio = ${promedio.toFixed(4)}`;

    }else{

        document.getElementById("pruebaPromedios").innerHTML =
        `Prueba de promedios: Rechazada. Promedio = ${promedio.toFixed(4)}`;
    }
}

function pruebaFrecuencia(){

    let caras = 0;
    let cruces = 0;

    for(let i = 0; i < numerosPseudoaleatorios.length; i++){

        if(numerosPseudoaleatorios[i] < 0.5){
            caras++;
        }else{
            cruces++;
        }
    }

    let diferencia = Math.abs(caras - cruces);

    if(diferencia <= 20){

        document.getElementById("pruebaFrecuencia").innerHTML =
        `Prueba de frecuencia: Aceptada. Cara = ${caras}, Cruz = ${cruces}`;

    }else{

        document.getElementById("pruebaFrecuencia").innerHTML =
        `Prueba de frecuencia: Rechazada. Cara = ${caras}, Cruz = ${cruces}`;
    }
}

function actualizarPantalla(){
    document.getElementById("jugadas").textContent = jugadas;
    document.getElementById("victorias").textContent = victorias;
    document.getElementById("derrotas").textContent = derrotas;

    document.getElementById("dineroActual").textContent = dinero;
    document.getElementById("metaActual").textContent = meta;
    document.getElementById("apuestaActual").textContent = apuesta;
    document.getElementById("ladoActual").textContent = ladoElegido;
}


function finalizarJuego(){

    document.getElementById("btnVolado").disabled = true;

    let probabilidad = 0;

    if(jugadas > 0){
        probabilidad = (victorias / jugadas) * 100;
    }

    if(dinero <= 0){

        dinero = 0;

        document.getElementById("resultado").innerHTML +=
        `<br><br>💀 El jugador se quedó sin dinero. Fin del juego.
        <br>📊 Probabilidad de ganar: ${probabilidad.toFixed(2)}%`;

    }else if(dinero >= meta){

        document.getElementById("resultado").innerHTML +=
        `<br><br>🏆 El jugador llegó a la meta. Fin del juego.
        <br>📊 Probabilidad de ganar: ${probabilidad.toFixed(2)}%`;
    }

    actualizarPantalla();

    setTimeout(() => {

        document.getElementById("configuracionInicial").style.display = "flex";
        document.getElementById("controlesJuego").style.display = "none";

        document.getElementById("resultado").innerHTML =
        "Configura nuevamente el juego para comenzar.";

        dinero = 0;
        meta = 0;
        apuesta = 0;
        ladoElegido = "---";

        actualizarPantalla();

    }, 4000);
}