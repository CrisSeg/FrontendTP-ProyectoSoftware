function OrdById(){
    document.getElementById('orderId').addEventListener('click', (Event) => {
        Event.preventDefault();

        if(document.getElementById('orderIdDiv')) return;

        const divId = document.createElement('div');
        divId.id = 'orderIdDiv';
        divId.className = 'orderIdDiv';

        divId.appendChild(sendId);

        document.getElementById('orderId').appendChild(divId);
        seeOrderId();
    });
}

function seeOrderId(){
    document.getElementById('sendId').addEventListener('click', () => {
        window.open('/Menu/verOrden/index.html');
    }
    )
}

OrdById();