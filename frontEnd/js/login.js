function checkLogin() {
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email: email, password: password })
    };
    fetch('http://hz114486:1235/api/login', options)
        .then(response => response.json())
        .then(response => token(response))



}

function logout() {
    document.getElementById('login').className = "btn btn-primary"
    document.getElementById('register').className = "btn btn-primary"
    document.getElementById('logout').className = "btn btn-primary pull-right d-none"
    document.getElementById('total').className = "modal-body row d-none"
    document.getElementById('valoresBolsa').className = 'modal-body row d-none'
    var imgs = $('#empresaSeleccionadas img');
    let imagenes = [];
    for (let i = 0; i < imgs.length; i++) {
        imagenes[i] = imgs[i].id
    }

    imagenes.forEach(element => {
        document.getElementById(element).className = "img-thumbnail empresa ui-draggable ui-draggable-handle"
    })


    localStorage.clear()

}



function token(response) {
        
   
    if (response['message'] != "Unauthorized") {
        if (localStorage.getItem("token") === null) {
            localStorage.setItem('token', response['authorisation']['token'])
        } else {
            localStorage.removeItem('token');
            localStorage.setItem('token', response['authorisation']['token'])
        }

        document.getElementById('email').style = "color: green";
        document.getElementById('password').style = "color: green";
        var myModalEl = document.getElementById('signIn');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();

        document.getElementById('login').className = "btn btn-primary d-none"
        document.getElementById('register').className = "btn btn-primary d-none"
        document.getElementById('logout').className = "btn btn-primary pull-right"
        document.getElementById('total').className = "modal-body row"
        localStorage.setItem("login", true)
    } else {
        alert('email o contraseña incorrecto');
        document.getElementById('email').style = "color: red";
        document.getElementById('password').style = "color: red";
    }

}


function checkIflog() {
    if (localStorage.getItem("login") === null) {
        document.getElementById('login').className = "btn btn-primary"
        document.getElementById('register').className = "btn btn-primary"
        document.getElementById('logout').className = "btn btn-primary pull-right d-none"
        document.getElementById('total').className = "modal-body row d-none"
        document.getElementById('valoresBolsa').className = "modal-body row d-none"
        $('#signIn').modal('show');
    } else {
        document.getElementById('login').className = "btn btn-primary d-none"
        document.getElementById('register').className = "btn btn-primary d-none"
        document.getElementById('logout').className = "btn btn-primary pull-right"
        document.getElementById('total').className = "modal-body row"
    
    }
}
