function registre() {
    email = document.getElementById('emailR').value;
    password1 = document.getElementById('password1').value;
    password2 = document.getElementById('password2').value;
    nombre = document.getElementById('name').value;

    let error = false;

    if (email == "") {
        alert("el email no puede estar vacio")
        error = true;
    }
    if (password1 == "" || password2 == "") {
        alert("la contraseña no puede estar vacio")
        error = true;
    }
    if (nombre == "") {
        alert("el nombre no puede estar vacio")
        error = true;
    }
    if (password1 != password2) {
        alert("las contraseñas no coinciden")
        error = true;
    }
    

    if (!error) {
        
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ name: nombre, email: email, password: password1 })
        };

        fetch('http://hz114486:1235/api/register', options)
            .then(response => response.json())
            .then(response =>alert("el usuario se ha creado correctamente"))
            .catch(err => console.log(err));
    }

    var myModalEl = document.getElementById('signup');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();



}
