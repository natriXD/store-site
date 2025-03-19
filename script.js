const products = [
    { 
        id: 1, 
        title: 'Футболка Oversize', 
        price: 1490, 
        image: 'https://via.placeholder.com/400x500', 
        sizes: ['S', 'M', 'L', 'XL'], 
        details: '100% хлопок, свободный крой' 
    },
    

{ 
id: 2, 
title: 'Худи с капюшоном', 
price: 3490, 
image: 'https://via.placeholder.com/400x500?text=Hoodie', 
sizes: ['M', 'L', 'XL'], 
details: 'Флисовая подкладка, карман кенгуру' 
},
{ 
id: 3, 
title: 'Скинни джинсы', 
price: 2990, 
image: 'https://via.placeholder.com/400x500?text=Jeans', 
sizes: ['28', '30', '32', '34'], 
details: 'Ультра-стрейч, 98% хлопок' 
},
{ 
id: 4, 
title: 'Кожаная косуха', 
price: 8990, 
image: 'https://via.placeholder.com/400x500?text=Jacket', 
sizes: ['S', 'M', 'L'], 
details: 'Натуральная кожа, кнопки' 
},
{ 
id: 5, 
title: 'Платье-миди', 
price: 2590, 
image: 'https://via.placeholder.com/400x500?text=Dress', 
sizes: ['XS', 'S', 'M'], 
details: 'Хлопковый трикотаж, пояс на талии' 
},
{ 
id: 6, 
title: 'Кардиган крупной вязки', 
price: 2790, 
image: 'https://via.placeholder.com/400x500?text=Cardigan', 
sizes: ['S', 'M', 'L'], 
details: 'Объемный силуэт, шерсть 70%' 
},
{ 
id: 7, 
title: 'Бомбер', 
price: 4290, 
image: 'https://via.placeholder.com/400x500?text=Bomber', 
sizes: ['M', 'L', 'XL'], 
details: 'Нейлоновая ткань, светоотражающие элементы' 
},
{ 
id: 8, 
title: 'Юбка-карандаш', 
price: 1990, 
image: 'https://via.placeholder.com/400x500?text=Skirt', 
sizes: ['S', 'M', 'L'], 
details: 'Классическая длина до колена' 
},
{ 
id: 9, 
title: 'Рубашка оверсайз', 
price: 2290, 
image: 'https://via.placeholder.com/400x500?text=Shirt', 
sizes: ['S', 'M', 'L'], 
details: 'Хлопок 100%, свободный крой' 
},
{ 
id: 10, 
title: 'Спортивные шорты', 
price: 1590, 
image: 'https://via.placeholder.com/400x500?text=Shorts', 
sizes: ['S', 'M', 'L'], 
details: 'Быстросохнущий материал' 
},
{ 
id: 11, 
title: 'Ветровка', 
price: 3690, 
image: 'https://via.placeholder.com/400x500?text=Windbreaker', 
sizes: ['S', 'M', 'L'], 
details: 'Водоотталкивающая ткань' 
},
{ 
id: 12, 
title: 'Комбинезон', 
price: 4990, 
image: 'https://via.placeholder.com/400x500?text=Jumpsuit', 
sizes: ['XS', 'S', 'M'], 
details: 'Хлопковый деним, регулируемый пояс' 
}
];

let cart = [];
let selectedProduct = null;
let selectedSize = null;

function init() {
    renderProducts();
    updateCartCount();
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="cursor-pointer" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.title}" 
                 class="w-full h-64 object-cover rounded-lg">
            <div class="mt-2">
                <h3 class="font-semibold">${product.title}</h3>
                <p class="text-gray-600">${product.price}₽</p>
            </div>
        </div>
    `).join('');
}

function openProductModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    selectedSize = null;
    
    document.getElementById('modal-title').textContent = selectedProduct.title;
    document.getElementById('modal-price').textContent = `${selectedProduct.price}₽`;
    document.getElementById('modal-image').src = selectedProduct.image;
    document.getElementById('modal-details').textContent = selectedProduct.details;
    
    const sizeButtons = document.getElementById('size-buttons');
    sizeButtons.innerHTML = selectedProduct.sizes.map(size => `
        <button onclick="selectSize('${size}')" 
                class="px-4 py-2 rounded transition-colors ${
                    selectedSize === size 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }">
            ${size}
        </button>
    `).join('');
    
    document.getElementById('product-modal').classList.remove('hidden');
}

function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('#size-buttons button').forEach(btn => {
        const isSelected = btn.textContent.trim() === size;
        btn.classList.toggle('bg-black', isSelected);
        btn.classList.toggle('text-white', isSelected);
    });
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    selectedProduct = null;
    selectedSize = null;
}

function addToCart() {
    if (!selectedSize) {
        alert('Выберите размер!');
        return;
    }
    const existing = cart.find(item => 
        item.id === selectedProduct.id && item.size === selectedSize
    );
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...selectedProduct, size: selectedSize, quantity: 1});
    }
    showNotification();
    updateCart();
    closeProductModal();
}

function updateCart() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.length ? cart.map(item => `
        <div class="flex items-center justify-between py-3 border-b">
            <div class="flex items-center gap-4">
                <img src="${item.image}" class="w-16 h-16 object-cover rounded">
                <div>
                    <h4 class="font-semibold">${item.title}</h4>
                    <p class="text-sm">Размер: ${item.size}</p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="changeQuantity(${item.id}, '${item.size}', -1)" 
                        class="px-3 py-1 bg-gray-100 rounded">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, '${item.size}', 1)" 
                        class="px-3 py-1 bg-gray-100 rounded">+</button>
                <button onclick="removeItem(${item.id}, '${item.size}')" 
                        class="text-red-500 ml-2">×</button>
            </div>
            <p class="font-semibold">${item.price * item.quantity}₽</p>
        </div>
    `).join('') : '<p class="text-gray-500">Корзина пуста</p>';
    document.getElementById('cart-total').textContent = `${calculateTotal()}₽`;
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    setTimeout(() => notification.classList.add('hidden'), 2000);
}

function toggleCartModal() {
    document.getElementById('cart-modal').classList.toggle('hidden');
}

function toggleCheckoutModal() {
    document.getElementById('checkout-modal').classList.toggle('hidden');
}

async function submitOrder(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const order = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        delivery: formData.get('delivery'),
        payment: formData.get('payment'),
        cart: cart,
        total: calculateTotal()
    };
    
    const botToken = 'ВАШ_ТОКЕН_БОТА';
    const chatId = 'ВАШ_CHAT_ID';
    const text = `Новый заказ!\n${JSON.stringify(order, null, 2)}`;

    try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });
        alert('Заказ успешно оформлен!');
        cart = [];
        updateCart();
        toggleCheckoutModal();
    } catch (error) {
        alert('Ошибка оформления заказа');
    }
}

 // Добавляем недостающие функции для работы с корзиной
 function changeQuantity(id, size, delta) {
    const item = cart.find(item => item.id === id && item.size === size);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i !== item);
        }
        updateCart();
    }
}

function removeItem(id, size) {
    cart = cart.filter(item => !(item.id === id && item.size === size));
    updateCart();
}

// Обновляем функцию выбора размера
function selectSize(size) {
    selectedSize = size;
    document.querySelectorAll('#size-buttons button').forEach(btn => {
        const isSelected = btn.textContent.trim() === size;
        btn.classList.toggle('size-selected', isSelected);
        btn.classList.toggle('bg-gray-100', !isSelected);
    });
}

// Остальной код остаётся без изменений
// ... (остальные функции) ...

window.onload = init;