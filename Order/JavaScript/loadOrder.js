const apiUrl = "https://localhost:7131/api/Order";

function makeOrders(order){
    const {orderId, price, deliveryTo, note, statusId, status, deliveryId, deliveryType, orderItems, createDate, updateDate} = order;
    
    const container = document.querySelector(".ordenes");

    const ordId = document.createElement("h4");
    ordId.className = 'orderID';
    ordId.textContent = `Order ID: ${orderId}`;

    const oPrice = document.createElement("p");
    oPrice.className = 'orderPrice';
    oPrice.textContent = `Precion: $${price}`;

    const oDeliveryTo = document.createElement("p");
    oDeliveryTo.className = 'deliveryTo';
    oDeliveryTo.textContent = `Come en ${deliveryTo}`;

    const oNotes = document.createElement("p");
    oNotes.className = 'OrderNote';
    oNotes.textContent = `Nota: ${note}`;

    const oStatusId = document.createElement("p");
    oStatusId.className = 'statusId';
    oStatusId.textContent = `statusId: ${statusId}`;

    const oStatus = document.createElement("p");
    oStatus.className = 'status';
    oStatus.textContent = `status: ${status}`;

    const oDeliveryId = document.createElement("p");
    oDeliveryId.className = 'deliveryID';
    oDeliveryId.textContent = `delivery Id: ${deliveryId}`;

    const oDeliveryType = document.createElement("p");
    oDeliveryType.className = 'deliveryType';
    oDeliveryType.textContent = `Delivery type: ${deliveryType}`;

    const listOi = makeOrderItemns(orderItems);
    const divListOI = document.createElement('div');
    divListOI.className= 'divOI';
    divListOI.appendChild(listOi);

    const creDate = new Date(createDate);
    const day = creDate.getDate().toString().padStart(2, '0');
    const month = creDate.getMonth().toString().padStart(2, '0');
    const hour = creDate.getHours().toString().padStart(2, '0');
    const minute = creDate.getMinutes().toString().padStart(2,'0');
    const oCreateDate = document.createElement("p");
    oCreateDate.className = 'createDate';
    oCreateDate.textContent = `${day}/${month} - ${hour}:${minute}`;

    const upDate = new Date(updateDate);
    const uDay = upDate.getDate().toString().padStart(2, '0');
    const uMonth = upDate.getMonth().toString().padStart(2, '0');
    const uHour = upDate.getHours().toString().padStart(2, '0');
    const uMinute = upDate.getMinutes().toString().padStart(2,'0');
    const oUpdateDate = document.createElement("p");
    oUpdateDate.className = 'updateDate';
    oUpdateDate.textContent = `${uDay}/${uMonth} - ${uHour}:${uMinute}`;

    const listOrder = document.createElement('div');
    listOrder.className = 'listOrd'
    listOrder.appendChild(ordId);
    listOrder.appendChild(oPrice);
    listOrder.appendChild(oDeliveryTo);
    listOrder.appendChild(oNotes);
    listOrder.appendChild(oStatusId);
    listOrder.appendChild(oStatus);
    listOrder.appendChild(oDeliveryId);
    listOrder.appendChild(oDeliveryType);
    listOrder.appendChild(divListOI);
    listOrder.appendChild(oCreateDate);
    listOrder.appendChild(oUpdateDate);

    container.appendChild(listOrder);
}

function makeOrderItemns(orderItems){
    const OIDiv = document.createElement("div");
    
    for (let i = 0; i < orderItems.length; i++){
        const {orderItemId, quantity, notes, oStatusId, oStatus, oDishId, oDishName, oDishImage} = orderItems[i];

        const oiOrderItemId = document.createElement('h4');
        oiOrderItemId.className = 'ordenItemId';
        oiOrderItemId.textContent = `Order item ID: ${orderItemId}`;

        const oQuantity = document.createElement('p');
        oQuantity.className = 'oiQuantity';
        oQuantity.textContent = `Cantidad: ${quantity}`;

        const oNotes = document.createElement('p');
        oNotes.className = 'oiNote';
        oNotes.textContent = `Nota: ${notes}`;

        const oiStatusId = document.createElement('p');
        oiStatusId.className = 'oiStatusid';
        oiStatusId.textContent = `Status ID: ${oStatusId}`;

        const oiStatus = document.createElement('p');
        oiStatus.className = 'oiStatusn';
        oiStatus.textContent = `Status: ${oStatus}`;

        const oiDishId = document.createElement('p');
        oiDishId.className = 'DishId';
        oiDishId.textContent = `Dish ID: ${oDishId}`;

        const oiDishName = document.createElement('p');
        oiDishName.className = 'dishName';
        oiDishName.textContent = oDishName;

        const oiDishImage = document.createElement('img');
        oiDishImage.className = 'dishImg';
        oiDishImage.src = oDishImage;

        const listOI = document.createElement('div');
        listOI.className = "ordenItems";
        listOI.appendChild(oiOrderItemId);
        listOI.appendChild(oQuantity);
        listOI.appendChild(oNotes);
        listOI.appendChild(oiStatusId);
        listOI.appendChild(oiStatus);
        listOI.appendChild(oiDishId);
        listOI.appendChild(oiDishName);
        listOI.appendChild(oiDishImage);

        OIDiv.appendChild(listOI);
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

document.getElementById('buttonFilter').addEventListener('click', loadOrder);

loadOrder();
