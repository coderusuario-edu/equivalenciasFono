let ch = [];
let tempViejo = [];
let tempNuevo = [];
let arrayCorrelativas = [];
let boton = document.querySelector("#button");
let optativaUsada = true;
let puntosComLengIII = 0;
let existe;

// Funciones
const cargarPlanes = () => {
    let listColaps = "";
    planViejo.map((item) => {
        for (let ano = 1; ano < 6; ano++) {
            let lista = document.getElementById(`lista${ano}`);
            if (item.anho === ano) {
                listColaps = `
            <li class="list-group-item">
                    <label class="btn btn-secondary">
                        <input type="checkbox" name="" id="${
                            item.id
                        }" autocomplete="off"/>
                    </label> ${item.id} - ${item.nombre} -
                <span> Regimen: ${
                    item.cuatrimestral ? "Cuatrimestral" : "Anual"
                }</span>
            </li>
            `;

                lista.innerHTML += listColaps;
            }
        }
    });

    planNuevo.map((item) => {
        for (let ano = 1; ano < 6; ano++) {
            let lista = document.getElementById(`nuevoAnho${ano}`);
            if (item.anho === ano) {
                listColaps = `
             <div class="card text-white ${bg[item.anho - 1]}  my-3 w-100" id=${
                    item.id
                }>
                <div class="card-body">
                    <p class="card-title"><strong>${
                        item.nombre
                    } </strong> <span class="badge rounded-pill bg-warning hidden" id="qwerty${
                    item.id
                }">Controlar correlativa</span></p>
                    <p class="card-text"> Régimen:  ${
                        item.cuatrimestral ? "Cuatrimestral" : "Anual"
                    }</p>
                </div>
            </div>
        `;

                lista.innerHTML += listColaps;
            }
        }
    });
};

const pintarLabel = (idCh) => {
    let checkId = document.getElementById(`${idCh}`);
    let father = checkId.parentElement;
    father.classList.toggle("bg-primary");
};

const controlDobleCorrelativa = (idMateriaVieja, materiaNuevo) => {
    // let equivalencia = puente[id - 1].id_nuevo;
    let tag;
    if (idMateriaVieja === "6") {
        materiaNuevo.map((item) => {
            tag = document.getElementById("qwerty106");
            tag.classList.remove("hidden");
        });
        armarArrayCorrelativas(106); //id de objeto a agregar
    }
    if (idMateriaVieja === "12") {
        materiaNuevo.map((item) => {
            pintarUnaEquivalencia(item);
            tag = document.getElementById("qwerty106");
            tag.classList.add("hidden");
        });
        sacarCorrelativaDeArray(106);
    }
    if (idMateriaVieja === "13") {
        materiaNuevo.map((item) => {
            pintarUnaEquivalencia(item);
            tag = document.getElementById("qwerty133");
            tag.classList.remove("hidden");
        });
        armarArrayCorrelativas(133); //id de objeto a agregar
    }
    if (idMateriaVieja === "22") {
        materiaNuevo.map((item) => {
            pintarUnaEquivalencia(item);
            tag = document.getElementById("qwerty133");
            tag.classList.add("hidden");
        });
        sacarCorrelativaDeArray(133);
    }
    if (idMateriaVieja === "25") {
        puntosComLengIII += 25;
        agregarTag("129");
        armarArrayCorrelativas(129); //id de objeto a agregar
        if (puntosComLengIII === 51) {
            removerTag("129");
            pintarUnaEquivalencia("129");
            sacarCorrelativaDeArray(129);
        }
    }
    if (idMateriaVieja === "26") {
        puntosComLengIII += 26;
        agregarTag("129");
        armarArrayCorrelativas(129); //id de objeto a agregar
        if (puntosComLengIII === 51) {
            removerTag("129");
            pintarUnaEquivalencia("129");
            sacarCorrelativaDeArray(129);
        }
    }
    if (
        idMateriaVieja === "30" ||
        idMateriaVieja === "31" ||
        idMateriaVieja === "32" ||
        idMateriaVieja === "33"
    ) {
        if (optativaUsada) {
            pintarUnaEquivalencia("135");
            optativaUsada = false;
        } else {
            pintarUnaEquivalencia("135");
        }
    }
};

const armarArrayCorrelativas = (idNuevo) => {
    existe =
        arrayCorrelativas !== "undefined"
            ? arrayCorrelativas.findIndex((item) => item.id === idNuevo) === -1
            : false;
    if (existe) {
        let foo = planNuevo.find((asignatura) => asignatura.id === idNuevo);
        arrayCorrelativas = [...arrayCorrelativas, foo];
    }
};

const sacarCorrelativaDeArray = (idSacar) => {
    arrayCorrelativas = arrayCorrelativas.filter((asig) => {
        return asig.id !== idSacar;
    });
};

const agregarTag = (id) => {
    tag = document.getElementById(`qwerty${id}`);
    tag.classList.remove("hidden");
};
const removerTag = (id) => {
    tag = document.getElementById(`qwerty${id}`);
    tag.classList.add("hidden");
};
const pintarEquivalencias = (id) => {
    let equivalencia = puente[id - 1].id_nuevo;
    equivalencia.map((equi) => {
        let helpGuy = document.getElementById(equi);
        if (tempNuevo.findIndex((as) => as.id === parseInt(equi)) === -1) {
            tempNuevo.push(planNuevo[equi - 100]);
        }
        helpGuy.classList.toggle("opacity");
        controlDobleCorrelativa(id, equivalencia);
    });
};

const despintarEquivalencias = (id) => {
    let helpGuy = document.getElementById(id);
    helpGuy.classList.remove("opacity");
};
const pintarUnaEquivalencia = (id) => {
    let helpGuy = document.getElementById(id);
    helpGuy.classList.add("opacity");
};

const eliminoLaMateria = (id) => {
    let idPlanNuevo = puente[id - 1].id_nuevo;
    idPlanNuevo.map((equivalencia) => {
        tempNuevoViejo = tempNuevoViejo.filter((asig) => {
            return asig.id !== equivalencia;
        });
    });
};

const agregarEventoCheck = (arrayCheckbox) => {
    arrayCheckbox.forEach((check) => {
        check.addEventListener("click", (evt) => {
            pintarLabel(evt.target.id);
            pintarEquivalencias(evt.target.id);
            if (
                tempViejo.findIndex(
                    (as) => as.id === parseInt(evt.target.id)
                ) === -1
            ) {
                tempViejo.push(planViejo[evt.target.id - 1]);
            }
            eliminoLaMateria(evt.target.id);
        });
    });
};
const mostrarAsimilacion = () => {
    let fullHTML = document.querySelector("#muestraAsimilacion");
    let foohtmlViejo = "";
    let foohtmlNueva = "";
    let foohtmlNuevaEq = "";
    let foohtmlCorrelativas = "";
    //Materias del plan 90
    tempViejo.map((asignatura) => {
        foohtmlViejo += `<li class="list-group-item cap">${asignatura.nombre}</li>`;
    });
    //Materias del plan 21
    tempNuevo.map((asignatura) => {
        foohtmlNueva += `  <li class="list-group-item cap">${asignatura.nombre}</li>`;
    });
    //Materias del plan 21 menos las equivalencias
    tempNuevoViejo.map((asignatura) => {
        foohtmlNuevaEq += `<li class="list-group-item cap">${asignatura.nombre}</li>`;
    });
    //Materias del plan 21 menos las equivalencias
    arrayCorrelativas.map((asignatura) => {
        foohtmlCorrelativas += `<li class="list-group-item cap">${asignatura.nombre}</li>`;
    });
    fullHTML.innerHTML = `<div class="row card-title">
            <div class="col-12">
                <h3>Asignaturas del Plan 90</h3>
                <ul class="list-group list-group-flush">
                ${foohtmlViejo}
                </ul>
            </div>
            <div class="col-12">
                <h3>Equivalencias al Plan 2021</h3>
                <ul class="list-group list-group-flush"> 
                ${foohtmlNueva}
                </ul>       
            </div>
            <div class="col-12">
                <h3>Asignaturas a asimilar(?) al Plan 2021</h3>
                <ul class="list-group list-group-flush"> 
                ${foohtmlNuevaEq}
                </ul>       
            </div>
            <div class="col-12">
                <h3>Conflictos con correlativas</h3>
                <ul class="list-group list-group-flush"> 
                ${foohtmlCorrelativas}
                </ul>       
            </div>
                <div class="col-6 mt-3">
            <button class="btn btn-primary" id="resetButton" onClick="window.location.reload();">Reiniciar</button>
            </div>
        </div>`;
};

//Eventos
window.addEventListener("load", () => {
    cargarPlanes();
    ch = document.querySelectorAll('input[type="checkbox"]');
    agregarEventoCheck(ch);
});

boton.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarAsimilacion();
});
