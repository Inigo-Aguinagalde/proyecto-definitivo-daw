
var empresas = ['inditex', 'santander', 'bbva', 'naturgy', 'cellnex', 'caixabank', 'telefonica', 'repsol', 'ferrovial', 'iberdrola']


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
        sSeleccionadas += `<img src="../img/${element}.png" id="${element}"class="img-thumbnail p-2 empresaSeleccionada" alt="${element}">`
    });

    empresas.forEach(element => {
        sSalida += `<img src="../img/${element}.png" id="${element}"class="img-thumbnail empresa" alt="${element}">`
    });

    sSeleccionadas += `<p><button type="button" class="btn btn-primary align-content-end save" onclick="guardar()">Save</button></p>`

    document.getElementById('listaEmpresas').innerHTML = sSalida;
    document.getElementById('empresaSeleccionadas').innerHTML = sSeleccionadas;

}





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




