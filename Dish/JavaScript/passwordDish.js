document.getElementById('dishes').addEventListener("click", (Event) => {
    Event.preventDefault();

    if(document.getElementById("passwordDish")) return;

    const divDish = document.createElement('div');
    divDish.id = 'passwordDish';
    divDish.className = 'passwordD';

    divDish.innerHTML = `
        <input type="password" id="dishPassword" placeholder="Ingrese contraseña">
        <button id="check">Acceder</button>
    `;

    document.getElementById("controllerDish").appendChild(divDish);

    document.getElementById("check").addEventListener("click", () => {
        const clave = document.getElementById("dishPassword").value;

        if(verificationPassword(clave)){
            divDish.remove();
            window.location.href = "/Dish/index.html";
        } else{
            alert("Contraseña incorrecta");
        }
    })
});