const apiUrl = "https://localhost:7131/api/v1/Order";

function makeOrders(order){
    const {orderNumber, deliveryTo, note, status, deliveryType, orderItems, createdAt} = order;

    const deliveryName = deliveryType.name;
    const statusName = status.name;
    
    const container = document.querySelector(".ordenes");

    const ordId = document.createElement("h4");
    ordId.className = 'orderID';
    ordId.textContent = `Order ID: ${orderNumber}`;

    const oDeliveryTo = document.createElement("p");
    oDeliveryTo.className = 'deliveryTo';
    oDeliveryTo.textContent = `Come en ${deliveryTo}`;

    const oNotes = document.createElement("p");
    oNotes.className = 'OrderNote';
    oNotes.textContent = `Nota: ${note}`;

    const oStatus = document.createElement("p");
    oStatus.className = 'status';
    oStatus.textContent = `status: ${statusName}`;

    const oDeliveryType = document.createElement("p");
    oDeliveryType.className = 'deliveryType';
    oDeliveryType.textContent = `Delivery type: ${deliveryName}`;

    const listOi = makeOrderItemns(orderItems, orderNumber);
    const divListOI = document.createElement('div');
    divListOI.className= 'divOI';

    const orderI = document.createElement('h4');
    orderI.id = 'orderI';
    orderI.textContent = 'Lista de platos:'

    divListOI.appendChild(orderI);
    divListOI.appendChild(listOi);

    const creDate = new Date(createdAt);
    const day = creDate.getDate().toString().padStart(2, '0');
    const month = creDate.getMonth().toString().padStart(2, '0');
    const hour = creDate.getHours().toString().padStart(2, '0');
    const minute = creDate.getMinutes().toString().padStart(2,'0');
    const oCreateDate = document.createElement("p");
    oCreateDate.className = 'createDate';
    oCreateDate.textContent = `${day}/${month} - ${hour}:${minute}`;

    const listOrder = document.createElement('div');
    listOrder.className = 'listOrd'
    listOrder.appendChild(ordId);
    listOrder.appendChild(oDeliveryTo);
    listOrder.appendChild(oNotes);
    listOrder.appendChild(oStatus);
    listOrder.appendChild(oDeliveryType);
    listOrder.appendChild(divListOI);
    listOrder.appendChild(oCreateDate);

    container.appendChild(listOrder);
}

function makeOrderItemns(orderItems, orderId){
    const OIDiv = document.createElement("div");
    
    for (let i = 0; i < orderItems.length; i++){
        const {id, quantity, notes, status, dish} = orderItems[i];

        const statusName = status.name;
        const statusId = status.id;
        const dishName = dish.name;

        const oiId = document.createElement('p')
        oiId.className = 'oiId'
        oiId.textContent = `Order Item: ${id}`

        const oiDishName = document.createElement('p');
        oiDishName.className = 'dishName';
        oiDishName.textContent = dishName;

        const oQuantity = document.createElement('p');
        oQuantity.className = 'oiQuantity';
        oQuantity.textContent = `Cantidad: ${quantity}`;

        const oNotes = document.createElement('p');
        oNotes.className = 'oiNote';
        oNotes.textContent = `Nota: ${notes}`;

        const oiStatus = document.createElement('p');
        oiStatus.className = 'oiStatus';
        oiStatus.textContent = `Status: ${statusName}`;

        const listOI = document.createElement('div');
        listOI.className = "ordenItems";
        listOI.appendChild(oiId);
        listOI.appendChild(oiDishName);
        listOI.appendChild(oNotes);
        listOI.appendChild(oiStatus);
        listOI.appendChild(oQuantity);

        const statusProgress = document.createElement('button')
        statusProgress.id = 'statusProgress'
        statusProgress.textContent = 'Actualizar Estado'

        statusProgress.addEventListener('click', async () => {
            await updateStatus(orderId, id, statusId)
        })

        OIDiv.appendChild(listOI);
        OIDiv.appendChild(statusProgress);
    }

    return OIDiv;
}

async function loadOrder(){
    document.getElementById('ordenes').innerHTML = "";

    const dateStart = document.getElementById("dateStart").value;
    const dateEnd = document.getElementById("dateEnd").value;
    const statusorder = document.getElementById("statusOrder").value;
    
    const param = new URLSearchParams();

    if(dateStart) { param.append("inicio", dateStart); }
    if(dateEnd) { param.append("fin", dateEnd); }
    if(statusorder) {param.append("statusId", statusorder); }

    let url = `${apiUrl}?${param.toString()}`;
    console.log(url);

    const res = await fetch(url);
    const orders = await res.json();

    for(let i = 0; i < orders.length; i++){
        makeOrders(orders[i]);
    }
}

async function updateStatus(orderId, orderItemId, statusId){
    console.log(`OrderId: ${orderId}, ItemId: ${orderItemId}, StatusId: ${statusId}`)
    try{
        const res = await fetch(`${apiUrl}/${orderId}/item/${orderItemId}`, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: statusId+1})
        });
        if (!res.ok) throw new Error(`Error al actualizar: ${res.status}`);
        alert("Estado actualizado correctamente");
        await loadOrder();
    } catch(err){
        console.error(err);
        alert("Error al actualizar el plato");
    }
}

document.getElementById('buttonFilter').addEventListener('click', loadOrder);

loadOrder();
