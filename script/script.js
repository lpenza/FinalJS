const ingresos = document.getElementById("ingresos");
const botonNuevoGasto = document.getElementById("botonNuevoGasto")
const botonLimpiar = document.getElementById("botonLimpiar")
let estadoActual = true
let estadoLimite = true



let gastosFijos = []
let gastosVariables = []
let gastosAhorros = []


const calculoValor = (valor, porcentaje) => {
    return valor * (porcentaje / 100)
}

const calculoPorcentaje = (total, valor) => {
    return (valor * 100) / total
}


const radialProgress = document.getElementById("RadialProgress");
const radialProgress1 = document.getElementById("RadialProgress1");
const radialProgress2 = document.getElementById("RadialProgress2");

const setProgress = (progress) => {
    let progressActual = radialProgress.style.getPropertyValue("--progress")
    let a = progressActual == '' ? 0 : parseInt(progressActual)
    let b = parseInt(progress)
    /* sumo lo que ya hay al nuevo valor */
    const value = `${progress == 0 ? 0 : a + b}%`;
    radialProgress.style.setProperty("--progress", value);
    const span = document.getElementById('spanProgress')
    span.innerHTML = value;
    // radialProgress.setAttribute("aria-valuenow", value);
};

const setProgress1 = (progress) => {
    let progressActual = radialProgress1.style.getPropertyValue("--progress")
    let a = progressActual == '' ? 0 : parseInt(progressActual)
    let b = parseInt(progress)
    /* sumo lo que ya hay al nuevo valor */
    const value = `${progress == 0 ? 0 : a + b}%`;
    radialProgress1.style.setProperty("--progress", value);
    const span = document.getElementById('spanProgress1')
    span.innerHTML = value;
    radialProgress1.setAttribute("aria-valuenow", value);
};


const setProgress2 = (progress) => {
    let progressActual = radialProgress2.style.getPropertyValue("--progress")
    let a = progressActual == '' ? 0 : parseInt(progressActual)
    let b = parseInt(progress)
    /* sumo lo que ya hay al nuevo valor */
    const value = `${progress == 0 ? 0 : a + b}%`;
    radialProgress2.style.setProperty("--progress", value);
    const span = document.getElementById('spanProgress2')
    span.innerHTML = value;
    radialProgress2.setAttribute("aria-valuenow", value);
};


const saldoDisponible = {
    disponibleFijo: 0,
    disponibleVariable: 0,
    disponibleAhorro: 0,
    disponibleTotal: 0
}

const gastosActuales = {

    gastadoFijo: 0,
    gastadoVaribale: 0,
    gastadoAhorro: 0
}


if (!(localStorage.getItem('disponibleTotal'))) {
    botonNuevoGasto.disabled = true
    if ((localStorage.getItem('disponibleTotal') != 0)) {
        botonLimpiar.disabled = true

    }
}


botonLimpiar.addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()

})



if (localStorage.getItem('gastosFijos')) {//devuelve true si existe/null si no existe
    gastosFijos = JSON.parse(localStorage.getItem('gastosFijos'))//json. parse pasa de json a objetos
    let acumulador = 0
    gastosFijos.forEach((unGAsto) => {
        acumulador += parseInt(unGAsto.valor)
    })
    let disponibleFijo = localStorage.getItem('disponibleFijo')
    setProgress(calculoPorcentaje(disponibleFijo, acumulador))
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('gastosFijos', JSON.stringify(gastosFijos))//json.strigify pasa de objeto a json
    setProgress(0)
}


if (localStorage.getItem('disponibleFijo')) {//devuelve true si existe/null si no existe
    saldoDisponible.disponibleFijo = localStorage.getItem('disponibleFijo')//json. parse pasa de json a objetos
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('disponibleFijo', 0)//json.strigify pasa de objeto a json

}



if (localStorage.getItem('gastosVariables')) {//devuelve true si existe/null si no existe
    gastosVariables = JSON.parse(localStorage.getItem('gastosVariables'))//json. parse pasa de json a objetos
    let acumulador = 0
    gastosVariables.forEach((unGAsto) => {
        acumulador += parseInt(unGAsto.valor)
    })
    let disponibleVariable = localStorage.getItem('disponibleVariable')
    setProgress1(calculoPorcentaje(disponibleVariable, acumulador))
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('gastosVariables', JSON.stringify(gastosVariables))//json.strigify pasa de objeto a json
    setProgress1(0)
}


if (localStorage.getItem('disponibleVariable')) {//devuelve true si existe/null si no existe
    saldoDisponible.disponibleVariable = localStorage.getItem('disponibleVariable')//json. parse pasa de json a objetos
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('disponibleVariable', 0)//json.strigify pasa de objeto a json

}





if (localStorage.getItem('gastosAhorros')) {//devuelve true si existe/null si no existe
    gastosAhorros = JSON.parse(localStorage.getItem('gastosAhorros'))//json. parse pasa de json a objetos
    let acumulador = 0
    gastosAhorros.forEach((unGAsto) => {
        acumulador += parseInt(unGAsto.valor)
    })
    let disponibleAhorro = localStorage.getItem('disponibleAhorro')
    setProgress2(calculoPorcentaje(disponibleAhorro, acumulador))
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('gastosAhorros', JSON.stringify(gastosAhorros))//json.strigify pasa de objeto a json
    setProgress2(0)
}


if (localStorage.getItem('disponibleAhorro')) {//devuelve true si existe/null si no existe
    saldoDisponible.disponibleAhorro = localStorage.getItem('disponibleAhorro')//json. parse pasa de json a objetos
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('disponibleAhorro', 0)//json.strigify pasa de objeto a json

}



if (localStorage.getItem('estadoActual')) {//devuelve true si existe/null si no existe
    estadoActual = localStorage.getItem('estadoActual')//json. parse pasa de json a objetos
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('estadoActual', true)//json.strigify pasa de objeto a json

}

if (localStorage.getItem('estadoLimite')) {//devuelve true si existe/null si no existe
    estadoLimite = localStorage.getItem('estadoLimite')//json. parse pasa de json a objetos
} else {
    /* si es la primera vez, creo el localstorage */
    localStorage.setItem('estadoLimite', true)//json.strigify pasa de objeto a json

}












const semaforo = (evaluador, estadoLimite) => {
    let luzRojo = document.getElementById('luzRojo')
    let luzVerde = document.getElementById('luzVerde')
    let luzAmarillo = document.getElementById('luzAmarillo')
    let labelEstado = document.getElementById('labelEstado')
    console.log(evaluador, estadoLimite)
    console.log(!evaluador, !estadoLimite)
    if (evaluador && estadoLimite) {
        luzRojo.style.setProperty("background-color", 'transparent')
        luzVerde.style.setProperty("background-color", '#008D84')
        luzAmarillo.style.setProperty("background-color", 'transparent')
        labelEstado.innerText = 'Todo se ve bien!'
    } else if (evaluador && !estadoLimite) {
        luzRojo.style.setProperty("background-color", 'transparent')
        luzVerde.style.setProperty("background-color", 'transparent')
        luzAmarillo.style.setProperty("background-color", '#FFC94B')
        labelEstado.innerText = 'Es recomendable que revises tus gastos!'
    }
    else if (!evaluador && !estadoLimite) {
        luzRojo.style.setProperty("background-color", 'red')
        luzVerde.style.setProperty("background-color", 'transparent')
        luzAmarillo.style.setProperty("background-color", 'transparent')
        labelEstado.innerText = 'Algo anda mal, deberias revisar tus gastos!'
    }
}






if (localStorage.getItem('estadoActual') && localStorage.getItem('estadoLimite')) {
    evalu = (localStorage.getItem('estadoActual') == 'true')
    estadoAct = (localStorage.getItem('estadoLimite') == 'true')
    console.log(evalu, estadoAct)
    semaforo(evalu, estadoAct)
}











ingresos.addEventListener('input', (e) => {
    if ((localStorage.getItem('disponibleTotal'))) {
        botonNuevoGasto.disabled = false
    }
    if (e.target.value === '' || e.target.value == 0) {
        setProgress(0);
        setProgress1(0);
        setProgress2(0);


    } else {

        const total = e.target.value
        const gastosFijos = total * 0.5
        const gastosVariables = total * 0.3
        const gastosAhorros = total * 0.2
        /* set sugeridos */
        const prescindibleSugerido = document.getElementById('prescindibleSugerido')
        const ahorroSugerido = document.getElementById('ahorroSugerido')
        const fijoSugerido = document.getElementById('fijoSugerido')
        prescindibleSugerido.innerText = ` $${gastosVariables}`
        fijoSugerido.innerText = ` $${gastosFijos}`
        ahorroSugerido.innerText = ` $${gastosAhorros}`

        /* guardar 100 de cada grafico */
        saldoDisponible.disponibleTotal = total
        localStorage.setItem('disponibleTotal', total)
        saldoDisponible.disponibleFijo = gastosFijos
        localStorage.setItem('disponibleFijo', gastosFijos)
        saldoDisponible.disponibleVariable = gastosVariables
        localStorage.setItem('disponibleVariable', gastosVariables)
        saldoDisponible.disponibleAhorro = gastosAhorros
        localStorage.setItem('disponibleAhorro', gastosAhorros)



    }

})

ingresos.addEventListener('blur',()=>{
    window.location.reload()

})


class Gasto {
    constructor(valor, concepto) {
        // this.id=id
        this.valor = valor
        this.concepto = concepto
    }

}





const evaluador = (disponible, tipoGasto) => {
    let acumulador = 0
    switch (tipoGasto) {
        case 'basico':
            gastosFijos.forEach((unGasto) => {

                acumulador += parseInt(unGasto.valor)
            })
            if (acumulador > disponible) {
                estadoActual = false
                estadoLimite = false
                localStorage.setItem('estadoActual', estadoActual)
                localStorage.setItem('estadoLimite', estadoLimite)
                semaforo(estadoActual, estadoLimite)
            }
            else if (acumulador === disponible) {
                estadoActual = true
                estadoLimite = false
                localStorage.setItem('estadoActual', estadoActual)
                localStorage.setItem('estadoLimite', estadoLimite)
                semaforo(estadoActual, estadoLimite)
            } else {
                estadoActual = true
                localStorage.setItem('estadoActual', estadoActual)
                semaforo(estadoActual, estadoLimite)

            }
            break
        case 'variable':
            gastosVariables.forEach((unGasto) => {

                acumulador += parseInt(unGasto.valor)
            })
            if (acumulador > disponible) {
                estadoActual = false
                estadoLimite = false
                localStorage.setItem('estadoActual', estadoActual)
                localStorage.setItem('estadoLimite', estadoLimite)
                semaforo(estadoActual, estadoLimite)
            }
            else if (acumulador === disponible) {
                estadoActual = true
                estadoLimite = false
                localStorage.setItem('estadoActual', estadoActual)
                localStorage.setItem('estadoLimite', estadoLimite)
                semaforo(estadoActual, estadoLimite)
            } else {
                estadoActual = true
                localStorage.setItem('estadoActual', estadoActual)
                semaforo(estadoActual, estadoLimite)

            }
            break
        case 'ahorro':
            gastosAhorros.forEach((unGasto) => {

                acumulador += parseInt(unGasto.valor)
            })
            if (acumulador > disponible) {
                estadoActual = false
                estadoLimite = false
                localStorage.setItem('estadoActual', estadoActual)
                localStorage.setItem('estadoLimite', estadoLimite)
                semaforo(estadoActual, estadoLimite)
            }
            else if (acumulador === disponible) {
                estadoActual = true
                estadoLimite = false
                localStorage.setItem('estadoActual', estadoActual)
                localStorage.setItem('estadoLimite', estadoLimite)
                semaforo(estadoActual, estadoLimite)
            } else {
                estadoActual = true
                localStorage.setItem('estadoActual', estadoActual)
                semaforo(estadoActual, estadoLimite)

            }
            break
    }


}


const agregarGasto = (gasto) => {
    const basico = document.getElementById('optionsRadios1').checked
    const variable = document.getElementById('optionsRadios2').checked
    const ahorro = document.getElementById('optionsRadios3').checked


    switch (true) {
        case basico:
            gastosFijos.push(gasto)
            gastosActuales.gastadoFijo += parseInt(gasto.valor)
            evaluador(saldoDisponible.disponibleFijo, 'basico')
            /* calculo de porcentaje */
            setProgress(parseInt(calculoPorcentaje(saldoDisponible.disponibleFijo, gasto.valor)));
            localStorage.setItem('gastosFijos', JSON.stringify(gastosFijos))
            break;
        case variable:
            gastosVariables.push(gasto)
            gastosActuales.gastadoVaribale += parseInt(gasto.valor)
            evaluador(saldoDisponible.disponibleVariable, 'variable')
            /* calculo de porcentaje */
            setProgress1(parseInt(calculoPorcentaje(saldoDisponible.disponibleVariable, gasto.valor)));
            localStorage.setItem('gastosVariables', JSON.stringify(gastosVariables))
            break;
        case ahorro:
            gastosAhorros.push(gasto)
            gastosActuales.gastadoAhorro += parseInt(gasto.valor)
            evaluador(saldoDisponible.disponibleAhorro, 'ahorro')
            /* calculo de porcentaje */
            setProgress2(parseInt(calculoPorcentaje(saldoDisponible.disponibleAhorro, gasto.valor)));
            localStorage.setItem('gastosAhorros', JSON.stringify(gastosAhorros))
            break;
        default:
            console.log('Seleccione un tipo');
    }


}

botonNuevoGasto.addEventListener('click', () => {
    const nuevoGastoValor = document.getElementById('nuevoGastoValor')
    const nuevoGastoConcepto = document.getElementById('nuevoGastoConcepto')
    const nuevoGasto = new Gasto(nuevoGastoValor.value, nuevoGastoConcepto.value)
    agregarGasto(nuevoGasto)
    /* limpiar form */
    nuevoGastoValor.innerText = ''
    nuevoGastoConcepto.innerText = ''

})





radialProgress.addEventListener('click', () => {

    alert(localStorage.getItem('gastosFijos'))
})

radialProgress1.addEventListener('click', () => {
    alert(localStorage.getItem('gastosVariables'))

})

radialProgress2.addEventListener('click', () => {
    alert(localStorage.getItem('gastosAhorros'))

})




