// Guardamos la ruta base del endpoint que devuelve los platos
const apiUrl = "https://localhost:7131/api/v1/Dish";


function makeMenu(dish){
    const {id, name, description, price, image, isActive, category} = dish;
    const categoryName = category.name;

    const container = document.querySelector(".menu");

    const dishName = document.createElement("h4");
    dishName.textContent = name;

    const dishDescription = document.createElement("p");
    dishDescription.textContent = description;

    const dishPrice = document.createElement("p");
    dishPrice.textContent = `Precio: $${price}`;

    const dishAvialable = document.createElement("p");
    dishAvialable.textContent = `Disponibilidad: ${isActive}`;

    const dishImage = document.createElement("img");
    dishImage.src = image;

    const dishCategory = document.createElement("p");
    dishCategory.textContent = `Categoria: ${categoryName}`;

    const menuD = document.createElement("div");
    menuD.className = 'menu-item';
    menuD.dataset.name = name;
    menuD.dataset.price = price;
    menuD.dataset.description = description || '';

    menuD.appendChild(dishName);
    menuD.appendChild(dishDescription);
    menuD.appendChild(dishPrice);
    menuD.appendChild(dishAvialable);
    menuD.appendChild(dishImage);
    menuD.appendChild(dishCategory);

        // input para cantidad y textarea para agregar notas
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = 1;
        qtyInput.value = 1;

        const note = document.createElement('textarea');
        note.id = 'textNote'
        note.placeholder = 'Escribe una nota';

        const priceOrder = price * parseInt(qtyInput.value,10 || 1);

    // Botón para agregar al carrito
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Añadir al carrito';
    addBtn.className = 'add-to-cart';
    addBtn.addEventListener('click', () => {
        // Intentar usar funciones de cart.js si existen
        try {
                const dishObj = { 
                    DishId: id, 
                    DishName: name,
                    DishImg: image, 
                    OrderPrice: priceOrder, 
                    Notes: note.value || '', 
                    Quantity: parseInt(qtyInput.value,10) || 1 };
            if (typeof addToCart === 'function') {
                addToCart(dishObj);
            } else {
                console.warn('addToCart no está definido');
            }
            renderMiniCart();
        } catch (err) {
            console.error(err);
        }
    });

        menuD.appendChild(qtyInput);
        menuD.appendChild(note);
        menuD.appendChild(addBtn);

    container.appendChild(menuD);
}


async function loadDishes(){
    // Limpiamos el div de algun filtro anterior
    document.getElementById('menu').innerHTML = "";

    // Leemos los datos que escribio o selecciono el usuario
    const name = document.getElementById("searchName").value;
    const category = document.getElementById("category").value;
    const order = document.getElementById("price").value
    const available = document.getElementById("available").checked

    const param = new URLSearchParams();

    if(name) { param.append("name", name); }
    if(category) { param.append("categoryId", category); }
    if(order) { param.append("orderByAsc", order); }
    if(available) { param.append("avialable", available); }


    // Armar la URL con los filtros
    let url = `${apiUrl}?${param.toString()}`;
    console.log(url);
    
    const res = await fetch(url);
    const dishes = await res.json();

    for(let i = 0; i < dishes.length; i++){
        makeMenu(dishes[i]);
    }
}

// vinculamos el boton del filter con la funcion js
document.getElementById('buttonFilter').addEventListener('click', loadDishes);

loadDishes();