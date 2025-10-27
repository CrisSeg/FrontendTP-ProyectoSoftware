document.getElementById('deleteDish').addEventListener('click', (Event) => {
    Event.preventDefault();

    if(document.getElementById('delete')) return;

    const divDelete = document.createElement('div');
    divDelete.id = 'delete';
    divDelete.className = 'deleteD';

    const id = document.createElement('input');
    id.type = 'text';
    id.id = 'dishId';
    id.className = 'dishI'
    id.placeholder = 'Ingrese el id del plato';

    const send = document.createElement('button');
    send.id = 'buttonDelete';
    send.className = 'buttonD'
    send.textContent = 'Eliminar Plato';

    divDelete.appendChild(id);
    divDelete.appendChild(send);

    document.getElementById('deleteDish').appendChild(divDelete);

    const apiUrl = `https://localhost:7131/api/v1/Dish/${id}`;

    send.addEventListener('click', async () => {
        const dish = {
            id: id.value
        };

        try{
            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
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
                `Se elimino el plato con exito:\n\n` +
                `id: ${data.id}\n name: ${data.name}\n description: ${data.description}\n price: ${data.price}\n categoryName: ${dataC}\n isActive: ${data.isActive}\n createAt: ${new Date(data.createdAt).toLocaleDateString()}\n updateAt: ${new Date(data.updatedAt).toLocaleDateString()}`
            );
        } catch(error){
            console.error("Error al crear el plato: ",error);
            alert("Erro al crear el pedido: " + error.message);
        }
    })
})