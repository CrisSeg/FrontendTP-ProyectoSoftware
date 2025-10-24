document.getElementById('accessOrder').addEventListener("click", (Event) => {
    // Evita que el enlace redirija automaticamente
    Event.preventDefault();

    if (document.getElementById("passwordOrder")) return;

    const div = document.createElement('div');
    div.id = 'passwordOrder';
    div.className = 'passwordOrd';

    div.innerHTML = `
        <input type="password" id="orderPassword" placeholder="Ingrese contraseña">
        <button id="checkPassword">Acceder</button>
    `;

    document.getElementById("employee").appendChild(div);

    document.getElementById("checkPassword").addEventListener("click", () => {
        const clave = document.getElementById("orderPassword").value;

        if(verificationPassword(clave)){
        div.remove();
        window.location.href = "/Order/index.html";
        } else {
            alert("Contraseña incorrecta");
        }
    });
});

function verificationPassword(clave){
    return clave == "MesaGaucha"
}