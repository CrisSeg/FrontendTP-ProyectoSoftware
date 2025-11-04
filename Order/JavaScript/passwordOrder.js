document.getElementById('accessOrder').addEventListener("click", (Event) => {
    // Evita que el enlace redirija automaticamente
    Event.preventDefault();

    const existing = document.getElementById('passwordOrder');
    if(existing){
        existing.remove();
        return;
    }

    const div = document.createElement('div');
    div.id = 'passwordOrder';
    div.className = 'passwordOrd';

    div.innerHTML = `
        <input type="password" id="orderPassword" placeholder="Ingrese contraseña">
        <button id="checkPassword">Acceder</button>
    `;

    div.addEventListener('click', (e) => e.stopPropagation());
    document.getElementById("employee").appendChild(div);

    document.getElementById('checkPassword').addEventListener('click', (e) => {
        e.stopPropagation();
        const clave = document.getElementById("orderPassword").value;

        if(verificationPassword(clave)){
            document.getElementById('passwordOrder').remove();
            window.location.href = "/Order/index.html";
        } else {
            alert("Contraseña incorrecta");
        }
    });
});

function verificationPassword(clave){
    return clave == "MesaGaucha"
}