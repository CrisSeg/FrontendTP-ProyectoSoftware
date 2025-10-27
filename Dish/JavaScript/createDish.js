const apiUrl = "https://localhost:7131/api/v1/Dish"

function createDish(){
    document.getElementById('createDish').addEventListener("click", (Event) => {
        Event.preventDefault();

        if (document.getElementById("create")) return;

        const divCreate = document.createElement('div');
        divCreate.id = 'create';
        divCreate.className = 'createD';

        const name = document.createElement('input');
        name.type = 'text';
        name.id = 'nameDish';
        name.placeholder = 'Ingrese el nombre del plato';

        const desc = document.createElement('textarea');
        desc.id = 'description';
        desc.placeholder = 'Ingrese el precio del plato';

        const price = document.createElement('input');
        price.type = 'text';
        price.id = 'priceDish';
        price.placeholder = 'Ingrese el precio del plato';

        const sel = document.createElement('select');
        sel.id= 'category';

        const values = [
            {valor: '1', texto: 'Entrada'},
            {valor: '2', texto: 'Ensalada'},
            {valor: '3', texto: 'Minutas'},
            {valor: '4', texto: 'Pastas'},
            {valor: '5', texto: 'Parrilla'},
            {valor: '6', texto: 'Pizzas'},
            {valor: '7', texto: 'Sandwiches'},
            {valor: '8', texto: 'Bebidas'},
            {valor: '9', texto: 'Cerveza Artesanal'},
            {valor: '10', texto: 'Postres'},
        ];

        values.forEach(opcion => {
            const option = document.createElement('option');

            option.value = opcion.valor;
            option.text = opcion.texto;

            sel.appendChild(option);
        })

        const img = document.createElement('input');
        img.type = 'text';
        img.id = 'imgDish';
        img.placeholder = 'Ingrese el link de la imagen del plato';

        const send = document.createElement('button');
        send.id = 'buttonCreate';
        send.className = 'buttonC';
        send.textContent = 'Crear Plato';

        divCreate.appendChild(name);
        divCreate.appendChild(desc);
        divCreate.appendChild(price);
        divCreate.appendChild(sel);
        divCreate.appendChild(img);
        divCreate.appendChild(send);

        document.getElementById('createDish').appendChild(divCreate);

        send.addEventListener('click', async () =>{
            const dish = {
                name: name.value,
                description: desc.value,
                price: price.value,
                category: sel.value,
                image: img.value
            };

            try{
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dish)
                });

                if(!response.ok){
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`)
                }

                const data = await response.json();
                const dataC = data.category.name

                alert(
                    `Se creo el plato con exito:\n\n` + 
                    `Id: ${data.id}\n name: ${data.name}\n description: ${data.description}\n price: ${data.price}\n categoryName: ${dataC}\n isActive: ${data.isActive}\n createAt: ${new Date(data.createdAt).toLocaleDateString()}\n updateAt: ${new Date(data.updatedAt).toLocaleDateString()}`
                );
            } catch(error){
                console.error("Error al crear el plato: ", error);
                alert("Error al crear el pedido: " + error.message);
            }
        })
    }); 
}

createDish();
