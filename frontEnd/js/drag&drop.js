var deleteImg;
$(document).ready(function () {
    $('.empresa').draggable({
        helper: 'clone',
        drag: function (event, ui) {
            $('.empresa').width(100);
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
            ui.draggable.detach();

            $(this).append(ui.draggable);
        }
    });
})