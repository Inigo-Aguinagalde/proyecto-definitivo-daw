var deleteImg;
$(document).ready(function () {
    $('.empresa').draggable({
        helper: 'clone',
        drag: function (event, ui) {
            $('.empresa').width(100);
            img = "";
            img = this;
        }

    });

    $('.empresaSeleccionada').draggable({
        helper: 'clone',
        drag: function () {
            deleteImg = "";
            deleteImg = this;


        }

    });




    $('.basura').droppable({
        accept: '.empresaSeleccionada',
        hoverClass: 'hovering',
        drop: function () {

            document.getElementById('listaEmpresas').appendChild(deleteImg);


        }
    });


    $('#empresaSeleccionadas').droppable({
        accept: '.empresa',
        hoverClass: 'hovering',
        drop: function (ev, ui) {

            document.getElementById('empresaSeleccionadas').appendChild(img);
            changeClass(ui.draggable[0].id)
        }
    });
})

function changeClass(id) {
    document.getElementById(id).className = 'img-thumbnail p-2 empresaSeleccionada ui-draggable ui-draggable-handle'
    var imgs = $('#empresaSeleccionadas img');
    let imagenes = [];
    for (let i = 0; i < imgs.length; i++) {
        imagenes[i] = imgs[i].id
    }

    console.log(imagenes);

    sSeleccionadas = "";
    imagenes.forEach(element => {

        empresas = empresas.filter(e => e !== element);
        sSeleccionadas += `<img src="../img/${element}.png" id="${element}"class="img-thumbnail p-2 empresaSeleccionada" alt="${element}">`
    });
    sSeleccionadas += `<p><button type="button" class="btn btn-primary position-relative align-content-end"
       onclick="guardar()">Save</button></p>`


    $('#empresaSeleccionadas').html(sSeleccionadas);
    $('.empresaSeleccionada').draggable({
        helper: 'clone',
        drag: function () {
            deleteImg = "";
            deleteImg = this;


        }
    });



}