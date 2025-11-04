document.getElementById('dishes').addEventListener("click", (Event) => {
    Event.preventDefault();

    const existing = document.getElementById('passwordDish');
    if(existing){
        existing.remove();
        return;
    }

    const divDish = document.createElement('div');
    divDish.id = 'passwordDish';
    divDish.className = 'passwordD';

    divDish.innerHTML = `
        <input type="password" id="dishPassword" placeholder="Ingrese contraseña">
        <button id="check">Acceder</button>
    `;

    divDish.addEventListener('click', (e) => e.stopPropagation());
    document.getElementById("controllerDish").appendChild(divDish);

    document.getElementById('check').addEventListener('click', (e) => {
        e.stopPropagation();

        const clave = document.getElementById('dishPassword').value;
        if(verificationPassword(clave)){
                divDish.remove();
                window.location.href = "/Dish/index.html";
            } else {
                alert("Contraseña incorrecta");
            }
    });
});

function verificationPassword(clave){
    return clave == "MesaGaucha"
}