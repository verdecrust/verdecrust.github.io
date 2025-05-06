// Cart functionality
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM elements
const cartIcon = document.getElementById('cart-icon');
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeButtons = document.querySelectorAll('.close');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutForm = document.getElementById('checkout-form');

// Open cart modal
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
    updateCartDisplay();
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartModal.style.display = 'none';
        checkoutModal.style.display = 'none';
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
});

// Add to cart functionality
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                quantity: 1
            });
        }
        
        cartCount += 1;
        cartTotal += price;
        
        updateCartCount();
        showAddToCartFeedback(button);
    });
});

// Update cart count display
function updateCartCount() {
    cartCountElement.textContent = cartCount;
}

// Show feedback when item is added to cart
function showAddToCartFeedback(button) {
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '#2e8b57';
    }, 1000);
}

// Update cart items display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotalElement.textContent = 'Total: $0.00';
        return;
    }
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    cartTotalElement.textContent = `Total: $${cartTotal.toFixed(2)}`;
}

// Proceed to checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
});

// Form submission
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here we'll later add the Firebase and payment gateway integration
    alert('Order placed successfully! (This will be replaced with actual functionality)');
    
    // Reset cart
    cart = [];
    cartCount = 0;
    cartTotal = 0;
    updateCartCount();
    checkoutModal.style.display = 'none';
});

// About Page Functionality
const aboutLink = document.querySelector('a[href="#about"]');
const aboutModal = document.getElementById('about-modal');

if (aboutLink && aboutModal) {
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.style.display = 'block';
    });
    
    // Close button (using existing close class)
    aboutModal.querySelector('.close').addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
}

// Smooth scroll to about section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        }
    });
});