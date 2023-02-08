function opcines() {
    clearInterval(intervalId)
    document.getElementById('valoresBolsa').className = 'modal-body row d-none'
    document.getElementById('total').className = 'container'
    changeClass("opciones");

}

function primeraLLamada(obj) {
    let controller = new AbortController();
    controller.abort();
    const newController = new AbortController();

    fetch(`http://${ip}:1235/api/empresas`, {
        method: 'GET',
        signal: newController.signal,

        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/x-www-form-urlencoded, application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then(response => response.json()).then(response => { comprobarEmprsas(response, obj) })
        .catch(error => {
            if (error.name === 'AbortError') {
                console.log('Petición cancelada');
            } else {
                console.error(error);
            }
        });

    controller = newController;


}

function cambiarColor(element) {

    document.getElementById(`coticacion${element}`).style = 'color: black'

}


function comprobarEmprsas(response, obj) {
    let error = false;
    let jsonOk = Object.keys(response)[0]
    if (jsonOk == 'status') {
        if (response['status'].includes('expired') == true) {
            alert("el token ha expirado por favor vuelva a hacer log in")
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            clearInterval(intervalId)
            checkIflog();
        } else if (response['status'.includes('invalid') == true]) {
            alert("el token no es valido")
            clearInterval(intervalId)
            localStorage.removeItem('token');
        } else {
            alert("no se ha encontrado el token, por favor comprueba si ha iniciado sesion o esta regristado")
            localStorage.removeItem('token');
            localStorage.removeItem('login');
            clearInterval(intervalId)
            checkIflog();
        }

    }

    if (!error) {
        response = Object.values(response);

        obj.forEach(element => {
            element = element.toUpperCase();

            let coticacion = response[0][element].euros
            let variacion = response[0][element].variacion
            element = element.toLowerCase();
            variacion = variacion.toString();
            coticacion = Math.round(coticacion * 100) / 100;
            coticacion += " €"

            if (variacion.includes("-") == true) {
                document.getElementById(`coticacion${element}`).innerHTML = coticacion;
                document.getElementById(`coticacion${element}`).style = 'color: red'
                setTimeout(cambiarColor, 3000, element);
            } else {
                document.getElementById(`coticacion${element}`).innerHTML = coticacion;
                document.getElementById(`coticacion${element}`).style = 'color: green'

                setTimeout(cambiarColor, 3000, element);
            }

        });
    }


}

var intervalId
function llamaApiConstante(obj) {
    let primera = true;
    let controller = new AbortController();
    if (primera) {
        primeraLLamada(obj);
        primera = false;
    }
    intervalId = setInterval(() => {

        controller.abort();
        const newController = new AbortController();

        fetch(`http://${ip}:1235/api/empresas`, {
            method: 'GET',
            signal: newController.signal,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => response.json()).then(response => { comprobarEmprsas(response, obj) })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Petición cancelada');
                } else {
                    console.error(error);
                }
            });

        controller = newController;
    }, 60000);


}

function generarSeleccionadas(obj) {

    llamaApiConstante(obj);


    document.getElementById('valoresBolsa').className = 'modal-body row'
    var seletc = `
    <header>
    <button class="btn btn-success pull-right" onclick="opcines()">Opciones</button>
    <br>
    <br>
    </header>
    <br>
`
    let malas = ['inditex', 'cellnex', 'ferrovial', 'santander', 'naturgy']
    sSalida = ""
    let salto = "<br><br><br>"

    obj.forEach(element => {
        sSalida += `<div id="${element}" class="card" style="width: 18rem; background-color: #ADD8E6" data-bs-toggle="modal" data-bs-target="#Modal" onclick="gaurdarNombre(this)">`
        if (malas.includes(element)) {
            sSalida += `<p><img src="../img/${element}.png" style="width: auto; height: 150%;background-color: #ADD8E6;" id="${element}"  class="img-thumbnail p-2 empresa"  alt="${element}"></p>`
            sSalida += salto;
        } else {
            sSalida += `<p><img src="../img/${element}.png" style="width: auto;background-color: #ADD8E6;" id="${element}"  class="img-thumbnail p-2 empresa"  alt="${element}"></p>`

        }


        sSalida += `<div class="card-body"><h2 id="coticacion${element}">~~</h2></div>`
        sSalida += `</div>`
        estilo = "auto"
    });

    seletc += sSalida;
    document.getElementById('valoresBolsa').innerHTML = seletc;


}
var nombre;
function gaurdarNombre(obj) {
    nombre = "";

    nombre = obj.id;
    nombre = nombre.toUpperCase();
    document.getElementById('exampleModalLabel').innerHTML = nombre;
}

function llamadaAPIEmpresa() {
    let controller = new AbortController();

    let fechaFn = document.getElementById('end-date').value;
    let fechaStart = document.getElementById('start-date').value;
    let error = false;
    if (fechaFn < fechaStart) {
        alert("La fecha final no puede ser mayor que la fecha inicial se han cambiado las fechas")
        error = true;
    }

    if (fechaFn == "" || fechaStart == "") {
        alert("Por favor eliga las fechas para hacer la llamada")
    } else {
        document.getElementById('canvas').className = ''
    }

    if (!error) {
        controller.abort();
        const newController = new AbortController();
        fetch(`http://${ip}:1235/api/datos?name=${nombre}&from=${fechaStart}&to=${fechaFn}`, {
            method: 'GET',
            signal: newController.signal,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },

        })
            .then(response => response.json())
            .then(data => {
                grafico(data)
            }).catch(error => {
                if (error.name === 'AbortError') {
                    console.log('Petición cancelada');
                } else {
                    console.error(error);
                }
            });

        controller = newController;;
    }

}

$("#Modal").on('hide.bs.modal', function () {
    if (chart) {
        chart.destroy();
    }
});


let chart;
function grafico(data) {
    let datos = [];


    data['data'].forEach(function (item, index) {
        if (index < 1000) {

            let date = new Date(item.date)
            let fecha = date.getTime();
            datos[index] = [fecha, item.euros]
        }


    });


    chart = Highcharts.stockChart('canvas', {
        chart: {
            height: 400
        },



        title: {
            text: `Grafico de ${nombre}`
        },

        rangeSelector: {
            selected: 1
        },


        xAxis: {

            type: 'datetime',
            labels: {
                enabled: true,
                format: '{value:%d-%m-%Y}',
            },
        },


        series: [{

            name: nombre,
            data: datos,
            type: 'area',
            threshold: null,
            tooltip: {
                valueDecimals: 2
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    chart: {
                        height: 300
                    },
                    subtitle: {
                        text: null
                    },
                    navigator: {
                        enabled: false
                    }
                }
            }]
        }
    });



}

$('#start-date').datepicker({
    format: 'yyyy/mm/dd',
    endDate: new Date()
});
$('#end-date').datepicker({

    format: 'yyyy/mm/dd',
    endDate: new Date()
});




