function updateDish(){
    document.getElementById('updateDish').addEventListener('click', (Event) => {
        Event.preventDefault();

        if(document.getElementById('update')) return;

        const divUpdate = document.createElement('div');
        divUpdate.id = 'update';
        divUpdate.className = 'updateD';

        const id = document.createElement('input');
        id.type = 'text';
        id.id = 'dishId';
        id.className = 'dishI'
        id.placeholder = 'Ingrese el id del plato';

        const dishName = document.createElement('input');
        dishName.type = 'text';
        dishName.id = 'dishName';
        dishName.className = 'dishN'
        dishName.placeholder = 'Ingrese el nuevo nombre del plato';

        const dishDesc = document.createElement('textarea');
        dishDesc.id = 'dishDesc';
        dishDesc.className = 'dishD'
        dishDesc.placeholder = 'Ingrese la nueva descripcion del plato';

        const dishPrice = document.createElement('input');
        dishPrice.type = 'text';
        dishPrice.id = 'dishPrice';
        dishPrice.className = 'dishP'
        dishPrice.placeholder = 'Ingrese el nuevo precio del plato';

        const category = document.createElement('select');
        category.id= 'categoryD';
        category.className = 'categoryD';

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

            category.appendChild(option);
        });

        const dishImg = document.createElement('input');
        dishImg.type = 'text';
        dishImg.id = 'dishImg';
        dishImg.className = 'dishIm';
        dishImg.placeholder = 'ingrese el link de la nueva imagen del plato';

        const active = document.createElement('select');
        active.id = 'isActive';
        active.className = 'isActive';

        const actValues = [
            {valor: 'true', texto: 'Activo'},
            {valor: 'false', texto: 'Inactivo'},
        ];

        actValues.forEach(opc => {
            const opt = document.createElement('option');
            opt.value = opc.valor;
            opt.text = opc.texto;

            active.appendChild(opt);
        })

        const send = document.createElement('button');
        send.id = 'buttonUpdate';
        send.className = 'buttonU';
        send.textContent = 'Actualizar Plato';

        divUpdate.appendChild(id);
        divUpdate.appendChild(dishName);
        divUpdate.appendChild(dishDesc);
        divUpdate.appendChild(dishPrice);
        divUpdate.appendChild(category);
        divUpdate.appendChild(dishImg);
        divUpdate.appendChild(active);
        divUpdate.appendChild(send);

        document.getElementById('updateDish').appendChild(divUpdate);

        const apiUrl = `https://localhost:7131/api/v1/Dish/${id}`;

        send.addEventListener('click', async () => {
            const dish = {
                id: id.value,
                name: dishName.value,
                description: dishDesc.value,
                price: parseFloat(dishPrice.value),
                category: category.value,
                image: dishImg.value,
                isActive: active.value
            };

            try{
                const response = await fetch(apiUrl, {
                    method: "PUT",
                    headers:{
                        "Content.Type": "application/json"
                    },
                    body: JSON.stringify(dish)
                });

                if(!response.ok){
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                const dataC = data.category.name;

                alert(
                    `Se actualizo el plato con exito:\n\n` + 
                    `id: ${data.id}\n name: ${data.name}\n description: ${data.description}\n price: ${data.price}\n categoryName: ${dataC}\n isActive: ${data.isActive}\n createAt: ${new Date(data.createdAt).toLocaleDateString()}\n updateAt: ${new Date(data.updatedAt).toLocaleDateString()}`
                );
            } catch(error){
                console.error("error al actualizar el plato: ", error);
                alert("error al actualizar el plato: " + error.message);
            }
        });
    });
}

updateDish();