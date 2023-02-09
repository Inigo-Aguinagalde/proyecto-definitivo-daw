//Creo un array con las empresas que queremos
var empresas = ['inditex', 'santander', 'bbva', 'naturgy', 'cellnex', 'caixabank', 'telefonica', 'repsol', 'ferrovial', 'iberdrola']

//Cuompruebo si existe en el localstorage el elemento bolsa, si exite creo las imagenes en sus respectivos campos si no creo todas la empresas en las empresas a seleccionar
if (localStorage.getItem("bolsa") === null) {
    sSalida = "";
    empresas.forEach(element => {

        sSalida += `<img src="../img/${element}.png" id="${element}"class="img-thumbnail p-2 empresa" alt="${element}">`
    });

    document.getElementById('listaEmpresas').innerHTML = sSalida;
} else {
    select = localStorage.getItem('bolsa');
    select = select.split(',');
    sSeleccionadas = "";
    sSalida = "";
    select.forEach(element => {

        empresas = empresas.filter(e => e !== element);
        sSeleccionadas += `<img src="../img/${element}.png" id="${element}"class="img-thumbnail p-2 img-fluid empresaSeleccionada" style="background-color: bisque;" alt="${element}">`
    });

    empresas.forEach(element => {
        sSalida += `<img src="../img/${element}.png" id="${element}"class="img-thumbnail img-fluid empresa" alt="${element}">`
    });

    sSeleccionadas += `<p><button type="button" class="btn btn-primary align-content-end save" onclick="guardar()">Save</button></p>`

    document.getElementById('listaEmpresas').innerHTML = sSalida;
    document.getElementById('empresaSeleccionadas').innerHTML = sSeleccionadas;

}



//Cuando clickas en el boton de save se ejecuta esta funcion que guarda las empreas seleccionas en el localstorage, tambien comprueba que las empresas seleccionas
// no este vacio despues de eso invoca a la funcion de generarSeleccionadas

function guardar() {
    seleccionadas = document.getElementById("empresaSeleccionadas").getElementsByTagName('img');


    localStorage.removeItem('bolsa');
    seleccionadas = Object.entries(seleccionadas)
    let vacio;
    if (seleccionadas.length == 0) {
        vacio = true;
        alert("tienes que elegir al menos una empresa")
    }

    let empre = [];
    let i = 0;
    seleccionadas.forEach(element => {
        document.getElementById(element[1].id).className = 'img-thumbnail p-2 empresaSeleccionada';
        empre[i] = element[1].id;
        i++;
    });
    if (empre.length != 0) {
        localStorage.setItem('bolsa', empre);


    }
    if (!vacio) {
        document.getElementById('total').className = 'modal-body row d-none'
        generarSeleccionadas(empre)
    }


}




