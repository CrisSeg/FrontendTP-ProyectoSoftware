function OrdById(){
    document.getElementById('orderId').addEventListener('click', (Event) => {
        Event.preventDefault();

        if(document.getElementById('orderIdDiv')) return;

        const divId = document.createElement('div');
        divId.id = 'orderIdDiv';
        divId.className = 'orderIdDiv';

        const id = document.createElement('input');
        id.type = 'text';
        id.id = 'idOrder';
        id.className = 'idOrder';
        id.placeholder = 'Ingrese el id de su orden';

        const sendId = document.createElement('button');
        sendId.id = 'sendId';
        sendId.className = 'sendID';
        sendId.textContent = 'Ver Orden';

        divId.appendChild(id);
        divId.appendChild(sendId);

        document.getElementById('orderId').appendChild(divId);
        seeOrderId(id);
    });
}

function seeOrderId(id){
    document.getElementById('sendId').addEventListener('click', () => {
        window.open('/Menu/verOrden/index.html');

        localStorage.setItem('orderId', id.value)
    }
    )
}

OrdById();