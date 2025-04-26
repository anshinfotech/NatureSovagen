const mainImage = document.getElementById('main-product-image');
const mainName = document.getElementById('main-product-name');
const mainPrice = document.getElementById('main-product-price');
const productThumbs = document.getElementById('product-thumbs');
const favoriteBtn = document.getElementById('favorite-btn');
const cartBtn = document.getElementById('cart-btn');
const viewBtn = document.getElementById('view-btn');
const cartNotification = document.getElementById('cart-notification');
const qtyInput = document.getElementById('qty-input');
const increaseQtyBtn = document.getElementById('increase-qty');
const decreaseQtyBtn = document.getElementById('decrease-qty');

// Cart data
const cart = [];

// Event listeners
favoriteBtn.addEventListener('click', toggleFavorite);
cartBtn.addEventListener('click', addToCart);
viewBtn.addEventListener('click', viewProduct);
productThumbs.addEventListener('click', handleThumbClick);
increaseQtyBtn.addEventListener('click', increaseQuantity);
decreaseQtyBtn.addEventListener('click', decreaseQuantity);

// Functions
function toggleFavorite() {
    favoriteBtn.classList.toggle('active');
}

function addToCart() {
    const product = {
        name: mainName.textContent,
        price: parseFloat(mainPrice.textContent.replace('$', '')),
        quantity: parseInt(qtyInput.value),
        image: mainImage.src
    };
    
    cart.push(product);
    
    // Show notification
    cartNotification.textContent = `${product.name} added to cart!`;
    cartNotification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        cartNotification.classList.remove('show');
    }, 3000);
    
    console.log('Cart updated:', cart);
}

function viewProduct() {
    // In a real implementation, this could open a modal with more product details
    alert(`Viewing details for ${mainName.textContent}`);
}

function handleThumbClick(e) {
    const thumbItem = e.target.closest('.thumb-item');
    if (!thumbItem) return;
    
    const image = thumbItem.dataset.image;
    const name = thumbItem.dataset.name;
    const price = thumbItem.dataset.price;
    
    // Update main product display
    mainImage.src = image;
    mainName.textContent = name;
    mainPrice.textContent = `$${price}`;
    
    // Reset quantity
    qtyInput.value = 1;
    
    // Reset favorite button
    favoriteBtn.classList.remove('active');
}

function increaseQuantity() {
    qtyInput.value = parseInt(qtyInput.value) + 1;
}

function decreaseQuantity() {
    const currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
    }
}

// Initialize with zoom effect for main image
document.addEventListener('DOMContentLoaded', () => {
    // Add product hover animations
    const thumbItems = document.querySelectorAll('.thumb-item');
    thumbItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});