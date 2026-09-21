const products = [
    {
        id: 1,
        name: "سماعات لاسلكية",
        description: "سماعات مريحة بجودة صوت ممتازة.",
        price: 149,
        category: "electronics",
        image: "🎧"
    },
    {
        id: 2,
        name: "ساعة ذكية",
        description: "ساعة عصرية للاستخدام اليومي.",
        price: 299,
        category: "electronics",
        image: "⌚"
    },
    {
        id: 3,
        name: "قميص أساسي",
        description: "قميص بسيط ومريح.",
        price: 89,
        category: "clothes",
        image: "👕"
    },
    {
        id: 4,
        name: "حذاء رياضي",
        description: "حذاء مريح للحركة اليومية.",
        price: 199,
        category: "clothes",
        image: "👟"
    },
    {
        id: 5,
        name: "نظارة شمسية",
        description: "تصميم عصري وخفيف.",
        price: 79,
        category: "accessories",
        image: "🕶️"
    },
    {
        id: 6,
        name: "حقيبة ظهر",
        description: "حقيبة عملية للاستخدام اليومي.",
        price: 129,
        category: "accessories",
        image: "🎒"
    },
    {
        id: 7,
        name: "لوحة مفاتيح",
        description: "لوحة مفاتيح مناسبة للعمل والألعاب.",
        price: 219,
        category: "electronics",
        image: "⌨️"
    },
    {
        id: 8,
        name: "قبعة",
        description: "قبعة بسيطة بتصميم عصري.",
        price: 59,
        category: "clothes",
        image: "🧢"
    }
];

let cart = [];

const productsGrid = document.getElementById("productsGrid");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const searchInput = document.getElementById("searchInput");


function renderProducts(list = products) {

    productsGrid.innerHTML = "";

    if (list.length === 0) {

        productsGrid.innerHTML = `
            <p style="grid-column:1/-1;text-align:center;padding:50px;color:#777;">
                لم يتم العثور على منتجات.
            </p>
        `;

        return;
    }

    list.forEach(product => {

        const productElement = document.createElement("div");

        productElement.className = "product";

        productElement.innerHTML = `
            <div class="product-image">
                ${product.image}
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="price">
                    ${product.price} ر.س
                </div>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})"
                >
                    إضافة للسلة
                </button>

            </div>
        `;

        productsGrid.appendChild(productElement);

    });
}


function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    if (!product) return;

    cart.push(product);

    updateCart();

    alert("تمت إضافة المنتج إلى السلة 🛒");
}


function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


function updateCart() {

    cartCount.textContent = cart.length;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div style="text-align:center;padding:50px;color:#777;">
                السلة فارغة 🛒
            </div>
        `;

        cartTotal.textContent = "0 ر.س";

        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-image">
                    ${product.image}
                </div>

                <div>

                    <strong>
                        ${product.name}
                    </strong>

                    <div style="color:#777;margin-top:5px;">
                        ${product.price} ر.س
                    </div>

                </div>

            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})"
            >
                حذف
            </button>
        `;

        cartItems.appendChild(item);

    });

    cartTotal.textContent = `${total} ر.س`;
}


function openCart() {

    cartOverlay.classList.add("active");

    updateCart();
}


function closeCart() {

    cartOverlay.classList.remove("active");
}


function checkout() {

    if (cart.length === 0) {

        alert("السلة فارغة.");

        return;
    }

    alert(
        "هذه نسخة تجريبية من المتجر. سيتم إضافة الدفع الحقيقي لاحقاً."
    );
}


function filterProducts(category) {

    if (category === "all") {

        renderProducts(products);

        return;
    }

    const filtered = products.filter(
        product => product.category === category
    );

    renderProducts(filtered);
}


function searchProducts() {

    const search = searchInput.value
        .trim()
        .toLowerCase();

    if (!search) {

        renderProducts(products);

        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
    );

    renderProducts(filtered);
}


cartOverlay.addEventListener("click", function(event) {

    if (event.target === cartOverlay) {

        closeCart();
    }

});


renderProducts();
updateCart();