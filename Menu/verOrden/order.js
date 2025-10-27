const apiUrl = `https://localhost:7131/api/v1/Order`
const orderId = localStorage.getItem('orderId');

function makeOrder(order){
    const {orderNumber, totalAmount, deliveryTo, note, status, deliveryType, orderItems, createdAt, updatedAt} = order;

    const deliveryName = deliveryType.name;
    const statusName = status.name;

    const container = document.getElementById('Order');

    const ordId = document.createElement('h4');
    ordId.className = 'orderId';
    ordId.textContent = `order Number: ${orderNumber}`;

    const oPrice = document.createElement("p");
    oPrice.className = 'orderPrice';
    oPrice.textContent = `Precio: $${totalAmount}`;

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

    const listOi = makeOrderItemns(orderItems);
    const divListOI = document.createElement('div');
    divListOI.className= 'divOI';
    divListOI.appendChild(listOi);

    const creDate = new Date(createdAt);
    const day = creDate.getDate().toString().padStart(2, '0');
    const month = creDate.getMonth().toString().padStart(2, '0');
    const hour = creDate.getHours().toString().padStart(2, '0');
    const minute = creDate.getMinutes().toString().padStart(2,'0');
    const oCreateDate = document.createElement("p");
    oCreateDate.className = 'createDate';
    oCreateDate.textContent = `${day}/${month} - ${hour}:${minute}`;

    const upDate = new Date(updatedAt);
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
    listOrder.appendChild(oStatus);
    listOrder.appendChild(oDeliveryType);
    listOrder.appendChild(divListOI);
    listOrder.appendChild(oCreateDate);
    listOrder.appendChild(oUpdateDate);

    container.appendChild(listOrder);
}

function makeOrderItemns(orderItems){
    const OIDiv = document.createElement("div");
    
    for (let i = 0; i < orderItems.length; i++){
        const {id, quantity, notes, status, dish} = orderItems[i];

        const statusName = status.name;

        const dishId = dish.id;
        const dishName = dish.name;
        const dishImage = dish.image;

        const oiOrderItemId = document.createElement('h4');
        oiOrderItemId.className = 'ordenItemId';
        oiOrderItemId.textContent = `Order item ID: ${id}`;

        const oQuantity = document.createElement('p');
        oQuantity.className = 'oiQuantity';
        oQuantity.textContent = `Cantidad: ${quantity}`;

        const oNotes = document.createElement('p');
        oNotes.className = 'oiNote';
        oNotes.textContent = `Nota: ${notes}`;

        const oiStatus = document.createElement('p');
        oiStatus.className = 'oiStatus';
        oiStatus.textContent = `Status: ${statusName}`;

        const oiDishId = document.createElement('p');
        oiDishId.className = 'DishId';
        oiDishId.textContent = `Dish ID: ${dishId}`;

        const oiDishName = document.createElement('p');
        oiDishName.className = 'dishName';
        oiDishName.textContent = dishName;

        const oiDishImage = document.createElement('img');
        oiDishImage.className = 'dishImg';
        oiDishImage.src = dishImage;

        const listOI = document.createElement('div');
        listOI.className = "ordenItems";
        listOI.appendChild(oiOrderItemId);
        listOI.appendChild(oQuantity);
        listOI.appendChild(oNotes);
        listOI.appendChild(oiStatus);
        listOI.appendChild(oiDishId);
        listOI.appendChild(oiDishName);
        listOI.appendChild(oiDishImage);

        OIDiv.appendChild(listOI);
    }

    return OIDiv;
}

async function loadOrderById(id) {
    document.getElementById('Order').innerHTML = '';

    let url = `${apiUrl}/${id}`;

    const response = await fetch(url);
    const order = await response.json();

    makeOrder(order);
}

loadOrderById(orderId);