// Simple cart manager usando localStorage
const CART_KEY = 'restaurant_cart_v1';

function getCart(){
    try{
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch(e){
        console.error('Error leyendo carrito', e);
        return [];
    }
}

function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Normaliza y devuelve el id que venga en DishId o dishId
function resolveDishId(item){
    if(!item) return undefined;
    return item.DishId ?? item.dishId ?? item.id ?? item.ID;
}

// item esperado: { DishId, Notes, Quantity }
function addToCart(item){
    const id = resolveDishId(item);
    if(typeof id === 'undefined') return;
    
    const name = item.DishName || '';
    const img = item.DishImg || '';
    const price = item.OrderPrice || '';
    const notes = item.Notes || item.notes || 'Sin ninguna especificacion';
    const qty = item.Quantity || item.quantity || 1;
    const cName  = item.categoryName;

    const cart = getCart();
    // Si hay la misma dishId y la misma nota, sumamos cantidades; si la nota difiere, creamos otra línea
    const existing = cart.find(i => String(i.DishId) === String(id) && (i.Notes || '') === notes);
    if(existing){
        existing.Quantity = (existing.Quantity || 1) + qty;
    } else {
        cart.push({ DishId: id, DishName: name, DishImg: img, OrderPrice: price,Notes: notes, Quantity: qty });
    }
    saveCart(cart);
}

function removeFromCart(index){
    const cart = getCart();
    if(index >=0 && index < cart.length){
        cart.splice(index,1);
        saveCart(cart);
    }
}

function updateQuantity(index, qty){
    const cart = getCart();
    if(index >=0 && index < cart.length){
        const q = parseInt(qty, 10) || 0;
        if(q <= 0){
            cart.splice(index,1);
        } else {
            cart[index].Quantity = q;
        }
        saveCart(cart);
    }
}

function updateNotes(index, notes){
    const cart = getCart();
    if(index >=0 && index < cart.length){
        cart[index].Notes = notes || '';
        saveCart(cart);
    }
}

function clearCart(){
    saveCart([]);
}

// Render del mini carrito dentro de Menu/index.html en el div #createOrder
function renderMiniCart(){
    const container = document.getElementById('createOrder');
    if(!container) return;

    container.innerHTML = '';
    const cart = getCart();

    const title = document.createElement('h3');
    title.textContent = 'Carrito';
    container.appendChild(title);

    if(cart.length === 0){
        const empty = document.createElement('p');
        empty.textContent = 'El carrito está vacío.';
        container.appendChild(empty);
        return;
    }

    const list = document.createElement('div');
    cart.forEach((item, idx) => {
        const row = document.createElement('div');
        row.className = 'cart-row';

        const img = document.createElement('img');
        img.className = 'imgDish';
        img.src = item.DishImg;

        const textName = document.createElement('p');
        textName.className = 'nameDish';
        textName.textContent = `DishName: ${item.DishName} `;

        const ordPrice = document.createElement('p');
        ordPrice.className = 'price'
        ordPrice.textContent = `Precio: $${item.OrderPrice}`;

        const qty = document.createElement('p');
        qty.className = 'quantity';
        qty.textContent = `Cant: ${item.Quantity}`;

        const notes = document.createElement('p');
        notes.className = 'noteOrder'
        notes.textContent = item.notes;

        const remove = document.createElement('button');
        remove.className = 'delete'
        remove.textContent = 'Eliminar';
        remove.addEventListener('click', ()=>{
            removeFromCart(idx);
            renderMiniCart();
        });

        row.appendChild(img);
        row.appendChild(textName);
        row.appendChild(ordPrice)
        row.appendChild(qty);
        row.appendChild(notes);
        row.appendChild(remove);
        list.appendChild(row);
    });

    container.appendChild(list);

    const actions = document.createElement('div');
    actions.className = 'cart-actions';

    const clearBtn = document.createElement('button');
    clearBtn.className = 'clear';
    clearBtn.textContent = 'Vaciar carrito';
    clearBtn.addEventListener('click', ()=>{ clearCart(); renderMiniCart(); });

    const goOrder = document.createElement('a');
    goOrder.href = '/buyCart/index.html';
    goOrder.textContent = 'Ir a Crear Pedido';
    goOrder.className = 'go-order';

    actions.appendChild(clearBtn);
    actions.appendChild(goOrder);

    container.appendChild(actions);
}

// Inicializamos mini cart al cargar
window.addEventListener('DOMContentLoaded', renderMiniCart);
