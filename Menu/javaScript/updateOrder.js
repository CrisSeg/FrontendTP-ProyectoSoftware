const orderId = localStorage.getItem('orderId');

function updateOrder(){

    const updateOrderDiv = document.getElementById('updateOrder');

    updateOrderDiv.addEventListener('click', (Event) => {
        Event.preventDefault();

        const existingForm = document.getElementById('updateO');

        if(existingForm) {
            existingForm.remove();
            return
        };

        // Contenedo General
        const divUpdateO = document.createElement('div');
        divUpdateO.id = 'updateO';
        divUpdateO.className = 'updateO';

        divUpdateO.addEventListener('click', (e) => e.stopPropagation())
        
        // Contenedor donde se iran agregando platos
        const dishesCon = document.createElement('div');
        dishesCon.id = 'updateO';
        dishesCon.className = 'updateO';

        divUpdateO.appendChild(dishesCon);

        const agregarD = document.createElement('button');
        agregarD.id = 'agregarD';
        agregarD.className = 'agregarD';
        agregarD.textContent = 'Agregar Plato';

        const send = document.createElement('button');
        send.id = 'buttonUO';
        send.className = 'buttonUO';
        send.textContent = 'Actualizar Orden';

        function agregarPlato(){
            const dishDiv = document.createElement('div');
            dishDiv.className = 'dishDiv';

            const oiId = document.createElement('input');
            oiId.type = 'text';
            oiId.id = 'oiId';
            oiId.className = 'oiId';
            oiId.placeholder = 'Ingrese el id del plato';

            const oiNote = document.createElement('textarea');
            oiNote.id = 'oiNote';
            oiNote.className = 'oiNOte';
            oiNote.placeholder = 'Ingrese la nueva nota de la orden';

            const oiQuantity = document.createElement('input');
            oiQuantity.type = 'number';
            oiQuantity.id = 'oiQuan';
            oiQuantity.className = 'oiQuan';
            oiQuantity.min = '1';
            oiQuantity.value = '1';

            const deleteDish = document.createElement('button');
            deleteDish.textContent = 'Eliminar Plato';
            deleteDish.id= 'oiDelete';
            deleteDish.className = 'oiDelete';
            deleteDish.addEventListener('click', (e) => {
                e.stopPropagation();
                dishesCon.removeChild(dishDiv);
            })

            dishDiv.appendChild(oiId);
            dishDiv.appendChild(oiNote);
            dishDiv.appendChild(oiQuantity);
            dishDiv.appendChild(deleteDish);

            dishesCon.appendChild(dishDiv);
        }

        agregarPlato();

        agregarD.addEventListener('click', (e) => {
            e.stopPropagation();
            agregarPlato();
        });

        divUpdateO.appendChild(agregarD);
        divUpdateO.appendChild(send);

        send.addEventListener('click', (e) => {
            e.stopPropagation();
            sendUpdateOrder();
        })

        updateOrderDiv.appendChild(divUpdateO);
    });
}

function sendUpdateOrder(){
    document.getElementById('buttonUO').addEventListener('click', async () =>{
        const dishOrders = [];

        document.querySelectorAll('.dishDiv').forEach(div => {
            const id = div.querySelector('.oiId').value;
            const note = div.querySelector('.oiNOte').value || 'Sin ninguna especificacion';
            const quantity = div.querySelector('.oiQuan').value;

            if(id){
                dishOrders.push({
                    id: id,
                    quantity: quantity,
                    notes: note || 'Sin ninguna especificacion'
                });
            }
        });

        if(dishOrders.length === 0){
            alert('Debe agregar al menos un plato');
            return;
        }

        const apiUrl = `https://localhost:7131/api/v1/Order/${orderId}`;

        try {
            const response = await fetch(apiUrl, {
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dishOrders)
            });

            if(!response.ok){
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            alert(
                `Se actualizo la orden con exito:\n\n` +
                `orderNumber: ${data.orderNumber}\n totalAmount: ${data.totalAmount}\n updatedAt: ${new Date(data.updatedAt).toLocaleDateString()}`
            );
        } catch(error){
            console.error("error al actualizar la orden: ",error);
            alert("error al actualizar la orden: " + error.message);
        }
    })
}

updateOrder();
