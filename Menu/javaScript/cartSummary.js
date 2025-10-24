// --- Mostrar carrito local (si existe) como "Crear Pedido desde carrito" ---
const CART_KEY = 'restaurant_cart_v1';

const apiUrl = 'https://localhost:7131/api/Order'

function getLocalCart(){
    try{
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];  
    }catch(e){
        console.error('Error leyendo carrito local', e);
        return [];
    }
}

function renderCartSummary(){
    // crear una sección debajo de filtros para mostrar carrito
    const container = document.getElementById('shoppingCart');
    if(!container) return;

    const cart = getLocalCart();
    const section = document.createElement('div');
    section.className = 'local-cart-summary';

    const title = document.createElement('h3');
    title.className = 'resumeCart';
    title.textContent = 'Resumen del carrito';
    section.appendChild(title);

    if(cart.length === 0){
        const p = document.createElement('p');
        p.className = 'cartEmpty';
        p.textContent = 'No hay items en el carrito.';
        section.appendChild(p);
        container.prepend(section);
        return;
    }

    const list = document.createElement('div');
    let total = 0;
    cart.forEach((it, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-item';

        const img = document.createElement('img');
        img.className = 'imgDish';
        img.src = it.DishImg;

        const name = document.createElement('h3');
        name.className = 'dishName';
        name.textContent = `${it.DishName}`;
        
        const qty = document.createElement('p');
        qty.className = 'quantity';
        qty.textContent = `x${it.Quantity} `;
        
        const price = document.createElement('p');
        price.className = 'priceOrd';
        price.textContent = `$${it.OrderPrice}`;

        total += it.OrderPrice * it.Quantity;

        const note = document.createElement('p');
        note.className = 'noteOrder';
        note.textContent = it.note;

        row.appendChild(img);   
        row.appendChild(name);
        row.appendChild(note);
        row.appendChild(qty);
        row.appendChild(price);
        list.appendChild(row);
    });

    const noteOrd = document.createElement('textarea');
    noteOrd.className = 'noteOr'
    noteOrd.placeholder = 'Especificacion para el pedido o para la entrega';

    const deliveryType = document.createElement('select');
    deliveryType.className = 'delivery';

    const DT1 = new Option('Delivery', '1');
    const DT2 = new Option('Take Away', '2');
    const DT3 = new Option('Dine in', '3');

    deliveryType.append(DT1, DT2, DT3);

    const delTo = document.createElement('input');
    delTo.className = 'deliveryTo';
    delTo.type = 'text';
    delTo.placeholder = 'Escriba la direccion del pedido o mesa';

    const tot = document.createElement('p');
    tot.className ='totalPrice'
    tot.textContent = `Total estimado: $${total}`;
    section.appendChild(list);
    section.appendChild(deliveryType);
    section.appendChild(delTo);
    section.appendChild(noteOrd);
    section.appendChild(tot);

    // Botón para enviar
    const send = document.createElement('button');
    send.className = 'send'
    send.textContent = 'Crear pedido';

    send.addEventListener('click', async ()=>{
        const ord = {
            items: cart.map(item => ({
                DishId: item.DishId,
                Quantity: item.Quantity,
                Notes: item.Notes || 'Sin ninguna especificacion'
            })),
            delivery: {
                deliveryID: deliveryType.value,
                to: delTo.value || 'Sin especificaciones'
            },
            notes: noteOrd.value || 'Sin ninguna especificacion'
        };

        try{
            const response = await fetch(apiUrl, {
                method: "POST",
                headers:{
                    "content-type": "application/json"
                },
                body: JSON.stringify(ord)
            });

            if(!response.ok){
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`)
            }

            const data = await response.json();
            alert(
                `Pedido creado con éxito:\n\n` +
                `ID: ${data.orderId}\n Precio total: $${data.price}\n Fecha: ${new Date(data.createDate).toLocaleDateString()}`
            );
        } catch (error){
                console.error("Erro al crear el pedido: ",error);
                alert("Error al crear el pedido: "+ error.message);
            }
    });
    section.appendChild(send);

    container.prepend(section);
}

// Renderizar resumen al cargar la página
window.addEventListener('DOMContentLoaded', renderCartSummary);