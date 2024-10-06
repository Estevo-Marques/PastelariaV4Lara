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
const commentModal = document.getElementById("comment-modal");
const commentInput = document.getElementById("comment-input");
const confirmAddToCartBtn = document.getElementById("confirm-add-to-cart-btn");
const cancelAddToCartBtn = document.getElementById("cancel-add-to-cart-btn");
const closeCommentModalBtn = document.getElementById("close-comment-modal");

let cart = [];
let selectedItemName;
let selectedItemPrice;
let selectedItemSize;

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
        "Água s/ Gás": { "price": 4.00, "P": null, "G": null },
        "Água c/ Gás": { "price": 4.00 },
        "Coca-Cola": { "price": 7.00 },
        "Coca-Cola Zero": { "price": 7.00 },
        "Laranjinha": { "price": 7.00 },
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
            },
    "Porções": {
        "Caipirinha de Caldo de Cana": { "price": 17.00 },
        "Mini Pasteis Tradicionais (4 un.)": { "price": 19.00 },
        "Mini Pasteis Especiais/Gourmets (4 un.)": { "price": 24.00 },
        "Mini Pasteis Tradicionais (8 un.)": { "price": 30.00 },
        "Mini Pasteis Especiais/Gourmets (8 un.)": { "price": 37.00 },
        "Bolinho de Feijão (5 un.)": { "price": 20.00 },
        "Mini Pão de Queijo (10 un.)": { "price": 16.00 },
        "Raquete de Frango (500g)": { "price": 24.00 },
        "Fritas (500g)": { "price": 20.00 },
    },
};

// Carregando o DOM
document.addEventListener("DOMContentLoaded", function() {
    whatsLink.classList.remove("hidden");
});

// Abrir modal do carrinho
cartBtn.addEventListener("click", function() {
    updateCartModal();
    cartModal.style.display = "flex";
    whatsLink.classList.add("hidden");
    document.body.classList.add("overflow-hidden");
});


// Fechar o modal do carrinho
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        closeCartModal();
        document.body.classList.remove("overflow-hidden");
    }
});

closeModalBtn.addEventListener("click", closeCartModal);

function closeCartModal() {
    cartModal.style.display = "none";
    whatsLink.classList.remove("hidden");
    document.body.classList.remove("overflow-hidden");
}

// Evento de clique no botão "Add to Cart"
menu.addEventListener("click", function(event) {
    const parentButton = event.target.closest(".add-to-cart-btn");
    if (parentButton) {
        selectedItemName = parentButton.getAttribute("data-name");
        let price;
        let size;

        if (prices["Bebidas"][selectedItemName]){ 
            price = prices["Bebidas"][selectedItemName]["price"];
            size = null;

            // Adiciona a bebida diretamente ao carrinho
            addToCart(selectedItemName, price, size, null);
            return; // Sai da função para não abrir o modal
        }if (prices["Porções"][selectedItemName]) {
            price = prices["Porções"][selectedItemName]["price"];
            size = null;

            commentModal.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        } else if (prices["Tradicionais"][selectedItemName]) {
            size = parentButton.closest('.cart-item').querySelector('input[type="radio"]:checked')?.value;
            if (size) {
                price = prices["Tradicionais"][selectedItemName][size];
            }
        }

        if (price !== undefined) {
            selectedItemPrice = price;
            selectedItemSize = size;

            // Abre o modal para adicionar observações
            commentModal.classList.remove("hidden");
            document.body.classList.add("overflow-hidden");
        }
    }
});

//asdasdasdasdasd



// Fechar o modal de comentários
closeCommentModalBtn.addEventListener("click", closeCommentModal);
cancelAddToCartBtn.addEventListener("click", closeCommentModal);

// Função para fechar o modal
function closeCommentModal() {
    commentModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    commentInput.value = ""; // Limpa o campo de texto
}

// Adiciona item ao carrinho com observação
confirmAddToCartBtn.addEventListener("click", function() {
    const comment = commentInput.value.trim();
    addToCart(selectedItemName, selectedItemPrice, selectedItemSize, comment);
    closeCommentModal();
});


// Adiciona item ao carrinho
function addToCart(name, price, size, comment) {
    // Verifica se o item já existe no carrinho
    const existingItem = cart.find(item => item.name === name && item.size === size && item.comment === comment);
    if (existingItem) {
        // Se existir, aumenta a quantidade
        existingItem.quantity += 1;
    } else {
        // Se não existir, adiciona novo item
        cart.push({ name, price: parseFloat(price), quantity: 1, size, comment });
    }
    updateCartCounter();
}


// Atualiza o contador do carrinho
function updateCartCounter() {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalQuantity;
}

// Atualiza o modal do carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    addRemoveButtonListeners();
    addQuantityButtonListeners(); // Adiciona os ouvintes para os botões de quantidade
}


function addQuantityButtonListeners() {
    const increaseButtons = document.querySelectorAll('.increase-quantity-btn');
    const decreaseButtons = document.querySelectorAll('.decrease-quantity-btn');

    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const size = this.getAttribute('data-size') || null;
            const comment = this.getAttribute('data-comment') || ''; // Pegando o comentário
            changeCartItemQuantity(name, size, 1, comment); // Passando o comentário
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const size = this.getAttribute('data-size') || null;
            const comment = this.getAttribute('data-comment') || ''; // Pegando o comentário
            changeCartItemQuantity(name, size, -1, comment); // Passando o comentário
        });
    });
}


function changeCartItemQuantity(name, size, amount, comment = "") {
    // Normalizando o comentário para evitar problemas de comparação
    comment = comment.trim().toLowerCase(); // Remover espaços extras e transformar em lowercase

    const item = cart.find(item => 
        item.name === name && 
        item.size === size && 
        (item.comment?.trim().toLowerCase() === comment)
    );

    if (item) {
        item.quantity += amount;

        // Se a quantidade chegar a 0, remover o item do carrinho
        if (item.quantity <= 0) {
            removeFromCart(name, size, comment);
        } else {
            updateCartCounter();
            updateCartModal();
        }
    }
}





// Adiciona ouvintes para botões de remoção
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

// Remove item do carrinho
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

// Checkout
checkoutBtn.addEventListener("click", function() {
    const address = addressInput.value.trim();
    const isOpen = checkRestauranteOpen();

    if (!isOpen) {
        showToast("Ops, O restaurante está fechado!");
        return;
    }

    // Verifica se o endereço foi preenchido
    if (!address) {
        addressWarn.classList.remove("hidden");
        return;
    } else {
        addressWarn.classList.add("hidden");
    }

    if (cart.length === 0){
        showToast("Ops, Parece que seu carrinho está vazio!");
        return; 
    }
//asdasdasdasdasdasdasd

    const message = cart.map(item => {
        // Verifica se o item tem tamanho e formata o texto adequadamente
        const sizeText = item.size ? `(${item.size})` : ''; 
        const formattedSizeText = sizeText ? ` tamanho *${sizeText}*` : ''; // Inclui apenas se sizeText não estiver vazio

        return `*${item.name}*${formattedSizeText} *qtd: (${item.quantity}*)` + (item.comment ? ` - ${item.comment}` : '');
    }).join("%0A");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const finalMessage = `*Pedido*%0A${message}%0A*Total:* R$ ${total.toFixed(2)}%0A*Endereço:* ${address}`;

    const whatsappLink = `https://api.whatsapp.com/send?phone=5547996870409&text=${finalMessage}`;
    window.open(whatsappLink);
});

//asdasdasdasdasdasda


// Função para exibir mensagens de aviso
function showToast(text) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` ou `bottom`
        position: "left", // `left`, `center` ou `right`
        stopOnFocus: true, // Previne o fechamento do toast ao passar o mouse
        style: {
            background: "#44BEBF",
        },
        onClick: function() {} 
    }).showToast();
}

// Verifica se o restaurante está aberto
function checkRestauranteOpen() {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    return (hora >= 16 || (hora === 16 && minutos >= 0)) && (hora < 23 || (hora === 23 && minutos <= 30));
}

// Atualiza a cor do indicador de horário
const spanItem = document.getElementById("date-span");
const isOpen = checkRestauranteOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => { 
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item flex items-center justify-between"; // Certifique-se que 'cart-item' tenha display flex
        
        const sizeText = item.size ? `(${item.size})` : '';
        const commentText = item.comment ? `Observação: ${item.comment}` : '';
    
        // Verifica se a quantidade é 1, se for, usa o ícone de lixeira
        const decreaseButtonHTML = item.quantity === 1 
            ? `<button class="remove-from-cart-btn" data-name="${item.name}" data-size="${item.size || ''}" data-comment="${item.comment || ''}">
                <i class="fas fa-trash-alt"></i>
               </button>`
            : `<button class="decrease-quantity-btn" data-name="${item.name}" data-size="${item.size || ''}" data-comment="${item.comment || ''}"><i class="fas fa-minus"></i></button>`;
    
        // Definindo o conteúdo do item do carrinho
        cartItem.innerHTML = `
        <div>
            <p class="font-medium">${item.name} ${sizeText}</p>
            <p>${commentText}</p>
            <p class="font-medium mt-2 border-gray-300 pb-4">R$ ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div class="flex items-center justify-end space-x-2 ml-auto">
            ${decreaseButtonHTML}
            <span>Qtd: ${item.quantity}</span>
            <button class="increase-quantity-btn" data-name="${item.name}" data-size="${item.size || ''}" data-comment="${item.comment || ''}">
                <i class="fas fa-plus"></i>
            </button>
        </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    

    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    addRemoveButtonListeners();
    addQuantityButtonListeners();
}
function addRemoveButtonListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-cart-btn');

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const size = this.getAttribute('data-size') || null;
            const comment = this.getAttribute('data-comment') || ''; // Pegando o comentário
            removeFromCart(name, size, comment); // Função para remover o item do carrinho
        });
    });
}
function removeFromCart(name, size, comment = "") {
    comment = comment.trim().toLowerCase();

    // Filtra o carrinho para remover o item correspondente
    cart = cart.filter(item => 
        !(item.name === name && item.size === size && (item.comment?.trim().toLowerCase() === comment))
    );

    updateCartCounter();
    updateCartModal();
}
