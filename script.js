// Selecionando elementos do DOM
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-bnt");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressWarn = document.getElementById("address-warn");
const addressInput = document.getElementById("address");
const whatsLink = document.querySelector(".whats-link");

let cart = [];

// Preços dos itens
const prices = {
    "Tradicionais": {
        "Caldo de Cana": { "P": 10.00, "G": 12.00 },
        "Pastel de Carne": { "P": 12.00, "G": 16.00 },
        "Pastel de Frango": { "P": 12.00, "G": 16.00 },
        "Pastel de Queijo": { "P": 12.00, "G": 16.00 },
        "Pastel de Banana": { "P": 12.00, "G": 16.00 },
        "Carne com Bacon": { "P": 13.00, "G": 20.00 },
        "Carne com Queijo": { "P": 13.00, "G": 20.00 },
        "Portuguesa": { "P": 13.00, "G": 20.00 },
        "Calabresa": { "P": 13.00, "G": 20.00 },
        "Frango com Palmito": { "P": 13.00, "G": 20.00 },
        "Frango com Requeijão": { "P": 13.00, "G": 20.00 },    
        "Frango com Calabresa": { "P": 13.00, "G": 20.00 },
        "Frango com Queijo": { "P": 13.00, "G": 20.00 },
        "Queijo com Milho": { "P": 13.00, "G": 20.00 },
        "Queijo com Bacon": { "P": 13.00, "G": 20.00 },
        "Queijo, Ovo, Tomate Seco e Orégano": { "P": 13.00, "G": 20.00 },
        "Pastel De Pizza": { "P": 13.00, "G": 20.00 },
        "Palmito c/ Alho Poró e Requeijão": { "P": 13.00, "G": 20.00 },
        "Brócolis": { "P": 13.00, "G": 20.00 },
        "Frango com Bacon e Queijo": { "P": 13.00, "G": 20.00 },
        "Prestígio": { "P": 13.00, "G": 20.00 },
        "Chocolate Preto com Morango": { "P": 13.00, "G": 20.00 },
        "Chocolate Branco com Morango": { "P": 13.00, "G": 20.00 },
        "Chocolate Preto e Branco": { "P": 13.00, "G": 20.00 },
        "Romeu e Julieta": { "P": 13.00, "G": 20.00 },
        "Banana com Chocolate Preto": { "P": 13.00, "G": 20.00 },
        "Banana com Chocolate Branco": { "P": 13.00, "G": 20.00 },
        "Banoff": { "P": 13.00, "G": 20.00 },
        "Berbigão": { "P": 15.00, "G": 24.00 },
        "Camarão": { "P": 15.00, "G": 24.00 },
        "Camarão com Requeijão": { "P": 15.00, "G": 24.00 },
        "Camarão com Palmito": { "P": 15.00, "G": 24.00 },
        "Linguiça Blumenau": { "P": 15.00, "G": 24.00 },
        "Quatro Queijos": { "P": 15.00, "G": 24.00 },
        "Paçoca de Pinhão": { "P": 15.00, "G": 24.00 },
        "Siri": { "P": 15.00, "G": 24.00 },
    },
    "Bebidas": {
        "Água s/ Gás": { "price": 4.00 },
        "Água c/ Gás": { "price": 4.00 },
        "Coca-Cola": { "price": 7.00 },
        "Coca-Cola Zero": { "price": 7.00 },
        "Fanta Laranja": { "price": 7.00 },
        "Laranjinha": { "price": 7.00 },
        "Guaraná Zero": { "price": 7.00 },
        "Guaraná": { "price": 7.00 },
        "Pepsi": { "price": 7.00 },
        "Schweppes": { "price": 7.00 },
        "Ice Tea Limão": { "price": 8.00 },
        "Ice Tea Pêssego": { "price": 8.00 },
        "Del Valle Pêssego": { "price": 8.00 },
        "Del Valle Uva": { "price": 8.00 },
        "Choco-Leite": { "price": 8.00 },
        "Amstel Lata": { "price": 8.00 },
        "Brahma Lata": { "price": 8.00 },
        "Amstel Long Neck": { "price": 12.00 },
        "Amstel Ultra Long Neck": { "price": 12.00 },
        "Budweiser Long Neck": { "price": 12.00 },
        "Eisenbahn Long Neck": { "price": 12.00 },
        "Heineken Long Neck": { "price": 14.00 },
        "Heineken Long Neck Zero": { "price": 14.00 },
        "Michelob Long Neck": { "price": 14.00 },
        "Sol Long Neck": { "price": 12.00 },
        "Stella Long Neck": { "price": 14.00 },
        "Caipirinha de Caldo de Cana": { "price": 17.00 },
        "Mini Pasteis Tradicionais (4 un.)": { "price": 19.00 },
        "Mini Pasteis Especiais/Gourmets (4 un.)": { "price": 24.00 },
        "Mini Pasteis Tradicionais (8 un.)": { "price": 30.00 },
        "Mini Pasteis Especiais/Gourmets (8 un.)": { "price": 37.00 },
        "Bolinho de Feijão (5 un.)": { "price": 20.00 },
        "Mini Pão de Queijo (10 un.)": { "price": 16.00 },
        "Raquete de Frango (500g)": { "price": 24.00 },
        "Fritas (500g)": { "price": 20.00 },
    }
};

// Quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function() {
    whatsLink.classList.remove("hidden");
});

// Ação ao clicar no botão do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
    whatsLink.classList.add("hidden");
    document.body.classList.add("overflow-hidden");
});

// Ação ao clicar fora do modal do carrinho
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        closeCartModal();
        document.body.classList.remove("overflow-hidden");
    }
});

// Ação ao fechar o modal do carrinho
closeModalBtn.addEventListener("click", closeCartModal);

// Função para fechar o modal do carrinho
function closeCartModal() {
    cartModal.style.display = "none";
    whatsLink.classList.remove("hidden");
    document.body.classList.remove("overflow-hidden");
}

// Ação ao clicar nos itens do menu
menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        let price;
        let size;

        if (prices["Bebidas"][name]) {
            price = prices["Bebidas"][name]["price"];
            size = null;
        } else if (prices["Tradicionais"][name]) {
            size = parentButton.closest('.cart-item').querySelector('input[type="radio"]:checked')?.value;
            if (size) {
                price = prices["Tradicionais"][name][size];
            }
        }

        if (price !== undefined) {
            addToCart(name, price, size);
        }
    }
});

// Função para adicionar item ao carrinho
function addToCart(name, price, size) {
    const existingItem = cart.find(item => item.name === name && item.size === size);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1, size });
    }
    updateCartCounter();
}

// Função para atualizar o contador de itens no carrinho
function updateCartCounter() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalQuantity;
}

// Função para atualizar o modal do carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        const sizeText = item.size ? `(${item.size})` : '';
        cartItem.innerHTML = `
        <div class="flex items-center justify-between cart-item">
            <div>
                <p class="font-medium">${item.name} ${sizeText}</p>
                <p>Qtd: ${item.quantity}</p>
                <p class="font-medium mt-2 border-gray-300 pb-4">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}" data-size="${item.size || ''}">
                Remover
            </button>
        </div>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    addRemoveButtonListeners();
}

// Função para adicionar listeners aos botões de remoção
function addRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const size = this.getAttribute('data-size') || null;
            removeFromCart(name, size);
        });
    });
}

// Função para remover item do carrinho
function removeFromCart(name, size) {
    const itemIndex = cart.findIndex(item => item.name === name && item.size === size);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        updateCartCounter();
        updateCartModal();
    }
}

checkoutBtn.addEventListener("click", function() {
    const address = addressInput.value.trim();
    const isOpen = checkRestauranteOpen();

    // Verificar se o restaurante está aberto
    if (!isOpen) {
        Toastify({
            text: "Ops, O restaurante está fechado!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#44BEBF",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        return; // Impede o prosseguimento se o restaurante estiver fechado
    }

    // Verifica se o endereço foi preenchido
    if (!address) {
        addressWarn.classList.remove("hidden");
        return;
    } else {
        addressWarn.classList.add("hidden");
    }
    if (cart.length === 0){
        Toastify({
            text: "Ops, Parece que seu carrinho está vazio!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#44BEBF",
            },
            onClick: function(){} // Callback after click
          }).showToast();
        return; // Impede o prosseguimento se o restaurante estiver fechado
    }


    // Formata a mensagem para o WhatsApp
    const message = cart.map(item => {
        const sizeText = item.size ? `(${item.size})` : '';
        return `*${item.name}* tamanho *${sizeText}* qtd: *${item.quantity}*`;
    }).join("%0A");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalMessage = `*Pedido*%0A${message}%0A*Total:* R$ ${total.toFixed(2)}%0A*Endereço:* ${address}`;

    // Gera o link do WhatsApp
    const whatsappLink = `https://api.whatsapp.com/send?phone=5547996870409&text=${finalMessage}`;
    window.open(whatsappLink);
});


// Adiciona um listener de entrada ao campo de endereço
addressInput.addEventListener("input", function() {
    if (!addressWarn.classList.contains("hidden")) {
        addressWarn.classList.add("hidden");
    }
});

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        button.classList.add("clicked");
        setTimeout(() => {
            button.classList.remove("clicked");
        }, 200);
    });
});



function checkRestauranteOpen() {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    return (hora >= 16 || (hora === 16 && minutos >= 0)) && (hora < 23 || (hora === 23 && minutos <= 30));
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestauranteOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}