// Selecionando elementos do DOM
const elements = {
    menu: document.getElementById("menu"),
    cartBtn: document.getElementById("cart-bnt"),
    cartModal: document.getElementById("cart-modal"),
    cartItemsContainer: document.getElementById("cart-items"),
    cartTotal: document.getElementById("cart-total"),
    closeModalBtn: document.getElementById("close-modal-btn"),
    cartCounter: document.getElementById("cart-count"),
    whatsLink: document.querySelector(".whats-link"),
    commentModal: document.getElementById("comment-modal"),
    commentInput: document.getElementById("comment-input"),
    confirmAddToCartBtn: document.getElementById("confirm-add-to-cart-btn"),
    cancelAddToCartBtn: document.getElementById("cancel-add-to-cart-btn"),
    closeCommentModalBtn: document.getElementById("close-comment-modal"),
};

window.addEventListener('load', function() {
    // Adiciona um delay de 2 segundos (2000 milissegundos) antes de esconder a tela de carregamento
    setTimeout(function() {
        // Esconde a tela de carregamento
        document.getElementById('loading-screen').style.display = 'none';
        
        // Mostra o conteúdo da página
        document.getElementById('content').style.display = 'block';
    }, 500); // Aumente o valor para o tempo desejado, 2000 = 2 segundos
});


const addressWarn = document.getElementById("address-warn");
const addressInput = document.getElementById("address");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = [];
let selectedItem = { name: null, price: null, size: null };

// Lista de preços
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
        "Água s/ Gás": { "price": 4.00, },
        "Água c/ Gás": { "price": 4.00 },
        "Coca-Cola": { "price": 7.00 },
        "Coca-Cola Zero": { "price": 7.00 },
        "Laranjinha": { "price": 7.00 },
        "Fanta Laranja": { "price": 7.00 },
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
        "Mini Pasteis Especiais/Gourmet (4 un.)": { "price": 24.00 },
        "Mini Pasteis Tradicionais (8 un.)": { "price": 30.00 },
        "Mini Pasteis Especiais/Gourmet (8 un.)": { "price": 37.00 },
        "Bolinho de Feijão (5 un.)": { "price": 20.00 },
        "Mini Pão de Queijo (10 un.)": { "price": 16.00 },
        "Raquete de Frango (500g)": { "price": 24.00 },
        "Fritas (500g)": { "price": 20.00 },
        "Combo Mini Gourmet": { "price": 31.00 },
        "Combo Mini Tradicionais": { "price": 26.00 },
    },
};

// Carrega o DOM
document.addEventListener("DOMContentLoaded", () => elements.whatsLink.classList.remove("hidden"));

// Abrir modal do carrinho
elements.cartBtn.addEventListener("click", () => {
    updateCartModal();
    elements.cartModal.style.display = "flex";
    toggleWhatsLink(true);
});

// Fechar o modal do carrinho
[elements.cartModal, elements.closeModalBtn].forEach(el =>
    el.addEventListener("click", (e) => {
        if (e.target === elements.cartModal || e.target === elements.closeModalBtn) closeCartModal();
    })
);

function closeCartModal() {
    elements.cartModal.style.display = "none";
    toggleWhatsLink(false);
}

// Adicionar item ao carrinho
elements.menu.addEventListener("click", (event) => {
    const btn = event.target.closest(".add-to-cart-btn");
    if (!btn) return;

    const itemName = btn.getAttribute("data-name");
    const item = prices.Tradicionais[itemName] || prices.Bebidas[itemName] || prices.Porções[itemName];
    
    if (!item) return;

    selectedItem.name = itemName;

    // Verifica se é um item de Bebidas ou Porções, que não têm tamanho
    if (prices.Bebidas[itemName]) {
        // Adiciona bebida diretamente ao carrinho
        addToCart(itemName, item.price);
    } else if (prices.Porções[itemName]) {
        // Para Porções, abrir o modal de comentário
        selectedItem.price = item.price;
        openCommentModal(); // Abre o modal de comentários para porções
    } else {
        // Para Tradicionais, verificar se o tamanho foi selecionado
        selectedItem.size = btn.closest('.cart-item').querySelector('input[type="radio"]:checked')?.value;
        if (selectedItem.size) {
            selectedItem.price = item[selectedItem.size];
            openCommentModal(); // Abre o modal de comentários para Tradicionais
        }
    }
});


elements.confirmAddToCartBtn.addEventListener("click", () => {
    const comment = elements.commentInput.value.trim();
    addToCart(selectedItem.name, selectedItem.price, selectedItem.size, comment, quantityModal); // Use quantityModal diretamente
    closeCommentModal();
    quantityModal = 1;  // Reinicia a quantidade para o valor padrão
    updateQuantityDisplayModal();  // Atualiza o display de quantidade
});


// Fechar modal de comentário
[elements.closeCommentModalBtn, elements.cancelAddToCartBtn].forEach(btn =>
    btn.addEventListener("click", closeCommentModal)
);

function addToCart(name, price, size = null, comment = "", quantity = 1) {
    // Certifique-se de que a quantidade é sempre maior que zero
    if (quantity <= 0) return;

    const existingItem = cart.find(item => item.name === name && item.size === size && item.comment === comment);
    if (existingItem) {
        existingItem.quantity += quantity; // Adiciona a quantidade selecionada
    } else {
        cart.push({ name, price: parseFloat(price), quantity: quantity, size, comment });
    }
    updateCartCounter();
}



function updateCartCounter() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartCounter.textContent = totalItems;
}

function updateCartModal() {
    elements.cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item flex items-center justify-between border-b border-gray-500 border-opacity-10 pb-4 mx-4";
        const sizeText = item.size ? `(${item.size})` : '';
        const commentText = item.comment ? `Observação: ${item.comment}` : '';

        cartItem.innerHTML = `
            <div>
                <p class="font-bold" >${item.name} ${sizeText}</p>
                <p class="break-word" >${commentText}</p>
                <p class="font-semibold" >R$ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="flex items-center gap-4">
                <button class="decrease-quantity-btn" data-name="${item.name}" data-size="${item.size || ''}" data-comment="${item.comment || ''}"><i class="fas fa-minus"></i></button>
                <span class="font-bold text-lg">${item.quantity}</span>
                <button class="increase-quantity-btn" data-name="${item.name}" data-size="${item.size || ''}" data-comment="${item.comment || ''}"><i class="fas fa-plus"></i></button>
            </div>
        `;
        elements.cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    elements.cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    addQuantityButtonListeners();
}

function addQuantityButtonListeners() {
    document.querySelectorAll(".increase-quantity-btn, .decrease-quantity-btn").forEach(btn =>
        btn.addEventListener("click", function() {
            const name = this.getAttribute("data-name");
            const size = this.getAttribute("data-size") || null;
            const comment = this.getAttribute("data-comment") || '';
            const change = this.classList.contains("increase-quantity-btn") ? 1 : -1;
            changeCartItemQuantity(name, size, change, comment);
        })
    );
}

function changeCartItemQuantity(name, size, amount, comment = "") {
    const item = cart.find(i => i.name === name && i.size === size && i.comment === comment.trim());
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) removeFromCart(name, size, comment);
        updateCartCounter();
        updateCartModal();
    }
}

function removeFromCart(name, size, comment = "") {
    cart = cart.filter(item => !(item.name === name && item.size === size && item.comment === comment.trim()));
    updateCartCounter();
    updateCartModal();
}

function openCommentModal() {
    elements.commentModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}

function closeCommentModal() {
    elements.commentModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    elements.commentInput.value = "";
}

function toggleWhatsLink(hide) {
    elements.whatsLink.classList.toggle("hidden", hide);
}



// Obtendo elementos relevantes
const deliveryOptionYes = document.querySelector("input[name='ParaEntrega'][value='Sim']");
const deliveryOptionNo = document.querySelector("input[name='ParaEntrega'][value='Não']");
const addressDiv = document.getElementById("endereçodeentrega"); // Div do endereço de entrega


// Função para atualizar a visibilidade da div de endereço
function updateAddressVisibility() {
    if (deliveryOptionYes.checked) {
        addressDiv.classList.remove("hidden");
    } else {
        addressDiv.classList.add("hidden");
        addressWarn.classList.add("hidden"); // Esconde aviso de endereço, se visível
        addressInput.value = ""; // Limpa o campo de endereço se não for necessário
    }
}

// Adicionando eventos de mudança nos inputs de entrega
deliveryOptionYes.addEventListener("change", updateAddressVisibility);
deliveryOptionNo.addEventListener("change", updateAddressVisibility);

// Função de checkout com verificação de entrega
checkoutBtn.addEventListener("click", function() {
    const address = addressInput.value.trim();
    const isOpen = checkRestauranteOpen();
    const isDelivery = deliveryOptionYes.checked; // Checa se é para entrega

    if (!isOpen) {
        showToast("Ops, O restaurante está fechado!");
        return;
    }

    // Se for para entrega e o endereço estiver vazio, mostra aviso
    if (isDelivery && !address) {
        addressWarn.classList.remove("hidden");
        return;
    } else {
        addressWarn.classList.add("hidden");
    }

    if (cart.length === 0) {
        showToast("Ops, Parece que seu carrinho está vazio!");
        return;
    }

    const message = cart.map(item => {
        const sizeText = item.size ? `(${item.size})` : ''; 
        const formattedSizeText = sizeText ? ` tamanho *${sizeText}*` : ''; 

        return `*${item.name}*${formattedSizeText} *qtd: (${item.quantity}*)` + (item.comment ? ` - ${item.comment}` : '');
    }).join("%0A");

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Se for para entrega, inclui o endereço; caso contrário, omite
    const finalMessage = `*Pedido*%0A${message}%0A*Total:* R$ ${total.toFixed(2)}` +
                         (isDelivery ? `%0A*Endereço:* ${address}` : "");

    const whatsappLink = `https://api.whatsapp.com/send?phone=5547996624439&text=${finalMessage}`;
    
    window.open(whatsappLink);
});


// Inicializa visibilidade da div de endereço
updateAddressVisibility();


function showToast(text) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "https://wa.me/5547996624439",
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


function checkRestauranteOpen() {
    const data = new Date();
    const hora = data.getHours();
    const minutos = data.getMinutes();
    return (hora >= 16 || (hora === 16 && minutos >= 0)) && (hora < 23 || (hora === 23 && minutos <= 30));
}


const spanItem = document.getElementById("date-span");
const isOpen = checkRestauranteOpen();

spanItem.classList.toggle("bg-green-600", isOpen);
spanItem.classList.toggle("bg-red-500", !isOpen);



let quantityModal = 1; 


function updateQuantityDisplayModal() {
    document.getElementById('quantity-display-modal').textContent = quantityModal;
}


document.getElementById('increase-quantity-modal-btn').addEventListener('click', () => {
    quantityModal++;
    updateQuantityDisplayModal();
});

document.getElementById('decrease-quantity-modal-btn').addEventListener('click', () => {
    quantityModal = quantityModal > 1 ? quantityModal - 1 : quantityModal;
        updateQuantityDisplayModal();
    }
);


elements.confirmAddToCartBtn.addEventListener("click", () => {
    const comment = elements.commentInput.value.trim();
    addToCart(selectedItem.name, selectedItem.price, selectedItem.size, comment, quantityModal - 1); 
    closeCommentModal();
    quantityModal = 1;  
    updateQuantityDisplayModal();  
});


const commentInput = document.getElementById('comment-input');
const charCount = document.getElementById('charCount');
const maxLength = 140;

commentInput.addEventListener('input', () => {
    const currentLength = commentInput.value.length;
    charCount.textContent = `${currentLength}/${maxLength}`;
    
    if (currentLength > maxLength) {
        commentInput.value = commentInput.value.slice(0, maxLength);
    }
});