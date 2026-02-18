// ============================================
// KalaSetu Marketplace JavaScript
// ============================================

// Shopping Cart & Wishlist - Initialize from LocalStorage (used as cache/fallback)
let cart = JSON.parse(localStorage.getItem('kalasetu_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('kalasetu_wishlist')) || [];
let userProducts = JSON.parse(localStorage.getItem('kalasetu_user_products')) || [];
let currentUser = JSON.parse(localStorage.getItem('kalasetu_user')) || null;

// Store for Supabase products
let supabaseProducts = [];
let useSupabase = false;

function hasSupabaseAPI() {
    return !!window.SupabaseAPI;
}

function syncLocalCache() {
    localStorage.setItem('kalasetu_cart', JSON.stringify(cart));
    localStorage.setItem('kalasetu_wishlist', JSON.stringify(wishlist));
}

async function syncSupabaseProducts() {
    if (!hasSupabaseAPI()) return false;
    const products = await window.SupabaseAPI.fetchProducts();
    supabaseProducts = products;
    useSupabase = products.length > 0;
    return useSupabase;
}

async function syncSupabaseCart() {
    if (!hasSupabaseAPI()) return false;
    const cartItems = await window.SupabaseAPI.fetchCartItems();
    cart = cartItems;
    syncLocalCache();
    return true;
}

async function syncSupabaseWishlist() {
    if (!hasSupabaseAPI()) return false;
    const wishlistItems = await window.SupabaseAPI.fetchWishlistItems();
    wishlist = wishlistItems;
    syncLocalCache();
    return true;
}

// Combine default products with user-uploaded products
function getAllProducts() {
    if (useSupabase && supabaseProducts.length > 0) {
        return supabaseProducts;
    }
    const defaultProducts = window.products || [];
    return [...defaultProducts, ...userProducts];
}

// ============================================
// INITIALIZE PAGE
// ============================================
document.addEventListener('DOMContentLoaded', async function () {
    // Try to load products from Supabase
    if (hasSupabaseAPI()) {
        try {
            console.log('🔄 Loading products from Supabase...');
            await Promise.all([
                syncSupabaseProducts(),
                syncSupabaseCart(),
                syncSupabaseWishlist()
            ]);
            console.log(`✅ Loaded ${supabaseProducts.length} products from Supabase`);
        } catch (err) {
            console.warn('⚠️ Supabase unavailable, using local data:', err);
        }
    }

    // Determine which page we are on
    if (document.getElementById('productsGrid')) {
        displayProducts(getAllProducts());
    }

    await updateCartCount();
    updateUserUI();
    updateWishlistUI();

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ============================================
// DISPLAY PRODUCTS (Home/Shop)
// ============================================
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);">
                <div style="font-size: 4rem; margin-bottom: 1rem;"><i class="ph ph-magnifying-glass"></i></div>
                <h3>No products found</h3>
                <p>Try a different search or category</p>
            </div>
        `;
        return;
    }

    productsToDisplay.forEach((product, index) => {
        // ... (existing code)
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.style.animationDelay = `${index * 0.1}s`;

        const imgUrl = product.image || 'https://via.placeholder.com/300x300?text=KalaSetu';

        productCard.innerHTML = `
            <div class="product-image" onclick="viewProduct(${product.id})">
                <img src="${imgUrl}" alt="${product.name}" class="product-img" onerror="this.src='https://via.placeholder.com/300x300?text=Image+Not+Found'">
                <span class="product-badge">${product.isUserProduct ? 'New' : 'Featured'}</span>
                <span class="wishlist-btn" onclick="addToWishlist(${product.id}); event.stopPropagation();" title="Add to Wishlist">
                    <i class="ph ${isInWishlist(product.id) ? 'ph-heart-fill' : 'ph-heart'}" style="color: ${isInWishlist(product.id) ? '#e74c3c' : 'var(--text-light)'}"></i>
                </span>
            </div>
            <div class="product-info">
                <h3 onclick="viewProduct(${product.id})" style="cursor:pointer">${product.name}</h3>
                <p class="product-region"><i class="ph ph-map-pin"></i> ${product.region}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: auto;">
                    <p class="product-price">₹${product.price.toLocaleString()}</p>
                    <div style="font-size: 0.9rem; color: #f39c12; display: flex; gap: 2px;">${getStarRating(product.rating || 4.5)}</div>
                </div>
                
                <div class="product-actions">
                    <button class="btn-small btn-cart" onclick="addToCart(${product.id})"><i class="ph ph-shopping-cart-simple"></i> Add</button>
                    <button class="btn-small btn-view" onclick="viewProduct(${product.id})">View</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Helper for stars
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = '';

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="ph-fill ph-star"></i>';
    }
    if (hasHalf) {
        starsHtml += '<i class="ph-fill ph-star-half"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="ph ph-star"></i>';
    }

    return starsHtml;
}

// ...

function getCategoryIcon(category) {
    const icons = {
        paintings: 'ph-paint-brush',
        pottery: 'ph-vase',
        textiles: 'ph-scroll',
        jewelry: 'ph-diamond',
        handicrafts: 'ph-mask-happy'
    };
    return icons[category.toLowerCase()] || 'ph-star';
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        searchResults.innerHTML = '<p style="color: var(--text-light); text-align: center;">Type something to search...</p>';
        return;
    }

    const allProducts = getAllProducts();
    const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.region.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">😔</div>
                <p>No products found for "<strong>${query}</strong>"</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try searching for paintings, pottery, textiles, etc.</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = `<p style="margin-bottom: 1rem; color: var(--text-light);">Found ${results.length} product(s)</p>`;

    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.style.cssText = `
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            margin-bottom: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        resultItem.onmouseover = () => resultItem.style.background = '#f9f9f9';
        resultItem.onmouseout = () => resultItem.style.background = 'white';
        resultItem.onclick = () => {
            closeModal('searchModal');
            viewProduct(product.id);
        };

        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.25rem;">${product.name}</h4>
                <p style="font-size: 0.85rem; color: var(--text-light);">📍 ${product.region} • ${product.category}</p>
                <p style="font-weight: 600; color: var(--primary);">₹${product.price.toLocaleString()}</p>
            </div>
        `;
        searchResults.appendChild(resultItem);
    });
}

// ============================================
// PRODUCT UPLOAD FUNCTIONALITY
// ============================================
async function handleUploadProduct(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const region = document.getElementById('productRegion').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const image = document.getElementById('productImage').value.trim();
    const materials = document.getElementById('productMaterials').value.trim();
    const dimensions = document.getElementById('productDimensions').value.trim();
    const artisanName = document.getElementById('artisanName').value.trim();
    const artisanLocation = document.getElementById('artisanLocation').value.trim();

    const uploadPayload = {
        name: name,
        category: category,
        region: region,
        price: price,
        description: description,
        image: image,
        materials: materials,
        dimensions: dimensions,
        artisanName: artisanName,
        artisanLocation: artisanLocation
    };

    // Prefer Supabase upload
    if (hasSupabaseAPI()) {
        try {
            const createdProduct = await window.SupabaseAPI.uploadProduct(uploadPayload);
            if (createdProduct) {
                await syncSupabaseProducts();
                document.getElementById('uploadProductForm').reset();
                closeModal('sellModal');
                showNotification('🎉 Your product has been listed successfully!');
                displayProducts(getAllProducts());
                return;
            }
        } catch (err) {
            console.warn('⚠️ Supabase upload failed, using local fallback:', err);
        }
    }

    // Create local fallback product object
    const newProduct = {
        id: Date.now(), // Unique ID based on timestamp
        name: name,
        category: category,
        region: region,
        price: price,
        originalPrice: Math.round(price * 1.25),
        discount: 20,
        rating: 5.0,
        reviews: 0,
        icon: getCategoryIcon(category),
        image: image,
        images: [image, image, image],
        description: description,
        materials: materials || 'Handmade materials',
        dimensions: dimensions || 'Contact seller',
        artForm: `Traditional ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        deliveryTime: '7-10 business days',
        detailedDescription: description,
        craftStory: `This beautiful ${name} is a handcrafted piece made by ${artisanName} from ${artisanLocation}.`,
        careInstructions: ['Handle with care', 'Keep away from moisture', 'Store properly'],
        isUserProduct: true,
        artisan: {
            name: artisanName,
            avatar: 'ph-user-circle',
            location: artisanLocation,
            experience: 'Skilled artisan',
            products: 1,
            rating: 5.0,
            sales: 0,
            bio: `${artisanName} is a skilled artisan from ${artisanLocation}, creating beautiful handmade products.`,
            specialization: `${category.charAt(0).toUpperCase() + category.slice(1)} Crafts`
        }
    };

    // Add to user products array
    userProducts.push(newProduct);
    localStorage.setItem('kalasetu_user_products', JSON.stringify(userProducts));

    // Reset form
    document.getElementById('uploadProductForm').reset();

    // Close modal and show success
    closeModal('sellModal');
    showNotification('🎉 Your product has been listed successfully!');

    // Refresh products display
    displayProducts(getAllProducts());
}

// Duplicate function removed - now using the one defined earlier

// ============================================
// LOGIN / SIGNUP FUNCTIONALITY
// ============================================
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check stored users (simple localStorage-based auth for MVP)
    const users = JSON.parse(localStorage.getItem('kalasetu_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('kalasetu_user', JSON.stringify(user));
        closeModal('loginModal');
        showNotification(`👋 Welcome back, ${user.name}!`);
        updateUserUI();
    } else {
        // For MVP demo, create a quick session if user doesn't exist
        const demoUser = { name: email.split('@')[0], email: email, role: 'buyer' };
        currentUser = demoUser;
        localStorage.setItem('kalasetu_user', JSON.stringify(demoUser));
        closeModal('loginModal');
        showNotification(`👋 Welcome, ${demoUser.name}!`);
        updateUserUI();
    }
}

function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    const newUser = { name, email, phone, password, role, createdAt: new Date().toISOString() };

    // Store user
    const users = JSON.parse(localStorage.getItem('kalasetu_users')) || [];
    users.push(newUser);
    localStorage.setItem('kalasetu_users', JSON.stringify(users));

    // Log in the new user
    currentUser = newUser;
    localStorage.setItem('kalasetu_user', JSON.stringify(newUser));

    closeModal('loginModal');
    showNotification(`🎉 Welcome to KalaSetu, ${name}!`);
    updateUserUI();
}

function updateUserUI() {
    // Update UI based on login status (can be expanded)
    if (currentUser) {
        console.log('User logged in:', currentUser.name);
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('kalasetu_user');
    showNotification('👋 You have been logged out.');
    updateUserUI();
}

// ============================================
// NAVIGATION & ACTIONS
// ============================================
function viewProduct(productId) {
    window.location.href = `product_detail.html?id=${productId}`;
}

async function addToCart(productId) {
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);

    if (hasSupabaseAPI()) {
        try {
            await window.SupabaseAPI.addCartItem(productId, 1);
            await syncSupabaseCart();
            await updateCartCount();
            showNotification('✅ Added to cart!');

            const cartModal = document.getElementById('cartModal');
            if (cartModal && cartModal.style.display === 'flex') {
                await displayCartItems();
            }
            return;
        } catch (err) {
            console.warn('⚠️ Supabase cart add failed, using local fallback:', err);
        }
    }

    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        syncLocalCache();

        await updateCartCount();
        showNotification('✅ Added to cart!');

        const cartModal = document.getElementById('cartModal');
        if (cartModal && cartModal.style.display === 'flex') {
            await displayCartItems();
        }
    }
}

async function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        if (hasSupabaseAPI()) {
            try {
                await syncSupabaseCart();
            } catch (err) {
                console.warn('⚠️ Cart sync failed:', err);
            }
        }
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// ============================================
// FILTERING
// ============================================
function filterProducts(category) {
    const allProducts = getAllProducts();

    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }

    // Smooth scroll to products section
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// MODALS & NOTIFICATIONS
// ============================================
async function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        if (modalId === 'cartModal') {
            await displayCartItems();
        }
        if (modalId === 'wishlistModal') {
            await displayWishlistItems();
        }
        if (modalId === 'searchModal') {
            setTimeout(() => {
                const searchInput = document.getElementById('searchInput');
                if (searchInput) searchInput.focus();
            }, 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2C3E50, #34495E);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        z-index: 3000;
        font-weight: 500;
        font-size: 1rem;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.getElementById('notificationStyles')) {
        const style = document.createElement('style');
        style.id = 'notificationStyles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// ============================================
// CART LOGIC
// ============================================
async function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (!cartItemsContainer) return;

    if (hasSupabaseAPI()) {
        try {
            await syncSupabaseCart();
        } catch (err) {
            console.warn('⚠️ Cart refresh failed:', err);
        }
    }

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align:center; padding:3rem; color: var(--text-light)">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some beautiful artworks to get started!</p>
            </div>
        `;
        if (cartTotalElement) cartTotalElement.textContent = '₹0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.style.cssText = 'display:flex; gap:1rem; padding:1rem; border:1px solid #eee; border-radius:12px; margin-bottom:0.75rem; align-items:center;';

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width:70px; height:70px; object-fit:cover; border-radius:8px;">
            <div style="flex:1">
                <h4 style="margin-bottom:0.25rem; font-size: 1rem;">${item.name}</h4>
                <p style="font-size:0.85rem; color: var(--text-light);">📍 ${item.region}</p>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                    <button onclick="updateCartQuantity(${item.id}, -1)" style="border:none; background:#f0f0f0; width:25px; height:25px; border-radius:5px; cursor:pointer;">-</button>
                    <span style="font-weight: 600;">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" style="border:none; background:#f0f0f0; width:25px; height:25px; border-radius:5px; cursor:pointer;">+</button>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight:700; color: var(--primary); font-size: 1.1rem;">₹${itemTotal.toLocaleString()}</div>
                <button onclick="removeFromCart(${item.id})" style="border:none; background:none; cursor:pointer; font-size:0.85rem; color:#e74c3c; margin-top: 0.5rem;">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    if (cartTotalElement) cartTotalElement.textContent = `₹${total.toLocaleString()}`;
}

async function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            await removeFromCart(productId);
        } else {
            if (hasSupabaseAPI() && item.cartItemId) {
                try {
                    await window.SupabaseAPI.updateCartItemQuantity(item.cartItemId, newQuantity);
                    await syncSupabaseCart();
                } catch (err) {
                    console.warn('⚠️ Supabase cart update failed, using local fallback:', err);
                    item.quantity = newQuantity;
                    syncLocalCache();
                }
            } else {
                item.quantity = newQuantity;
                syncLocalCache();
            }

            await displayCartItems();
            await updateCartCount();
        }
    }
}

async function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        const item = cart[index];
        if (hasSupabaseAPI() && item.cartItemId) {
            try {
                await window.SupabaseAPI.removeCartItem(item.cartItemId);
                await syncSupabaseCart();
            } catch (err) {
                console.warn('⚠️ Supabase cart remove failed, using local fallback:', err);
                cart.splice(index, 1);
                syncLocalCache();
            }
        } else {
            cart.splice(index, 1);
            syncLocalCache();
        }

        await displayCartItems();
        await updateCartCount();
        showNotification('🗑️ Item removed from cart');
    }
}

async function checkout() {
    if (cart.length === 0) {
        showNotification('❌ Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Show checkout confirmation
    const confirmed = confirm(`🎉 Order Summary\n\nItems: ${itemCount}\nTotal: ₹${total.toLocaleString()}\n\nProceed with payment?`);

    if (confirmed) {
        showNotification('🎉 Order placed successfully! Thank you for supporting Indian artisans!');
        if (hasSupabaseAPI()) {
            try {
                await window.SupabaseAPI.clearCart();
                await syncSupabaseCart();
            } catch (err) {
                console.warn('⚠️ Supabase clear cart failed, using local fallback:', err);
                cart = [];
                localStorage.removeItem('kalasetu_cart');
            }
        } else {
            cart = [];
            localStorage.removeItem('kalasetu_cart');
        }
        await updateCartCount();
        closeModal('cartModal');
    }
}

// ============================================
// WISHLIST FUNCTIONALITY
// ============================================

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

async function addToWishlist(productId) {
    const allProducts = getAllProducts();
    const product = allProducts.find(p => p.id === productId);

    if (hasSupabaseAPI()) {
        try {
            const isAdded = await window.SupabaseAPI.toggleWishlistItem(productId);
            await syncSupabaseWishlist();
            showNotification(isAdded ? '❤️ Added to wishlist' : '💔 Removed from wishlist');
        } catch (err) {
            console.warn('⚠️ Supabase wishlist toggle failed, using local fallback:', err);
            if (!product) return;
            const index = wishlist.findIndex(item => item.id === productId);
            if (index === -1) {
                wishlist.push(product);
                showNotification('❤️ Added to wishlist');
            } else {
                wishlist.splice(index, 1);
                showNotification('💔 Removed from wishlist');
            }
            syncLocalCache();
        }
    } else {
        if (!product) return;
        const index = wishlist.findIndex(item => item.id === productId);
        if (index === -1) {
            wishlist.push(product);
            showNotification('❤️ Added to wishlist');
        } else {
            wishlist.splice(index, 1);
            showNotification('💔 Removed from wishlist');
        }
        syncLocalCache();
    }

    updateWishlistUI();

    // Refresh UI
    displayProducts(getAllProducts()); // To update heart icons on cards
    const wishlistModal = document.getElementById('wishlistModal');
    if (wishlistModal && wishlistModal.style.display === 'flex') {
        await displayWishlistItems();
    }
}

function updateWishlistUI() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        if (wishlist.length > 0) {
            wishlistCount.style.display = 'flex';
        } else {
            wishlistCount.style.display = 'none'; // Optional: hide if 0
        }
    }
}

async function displayWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlistItems');
    if (!wishlistItemsContainer) return;

    if (hasSupabaseAPI()) {
        try {
            await syncSupabaseWishlist();
        } catch (err) {
            console.warn('⚠️ Wishlist refresh failed:', err);
        }
    }

    wishlistItemsContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="ph ph-heart-break" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Your wishlist is empty</p>
                <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="closeModal('wishlistModal')">Start Exploring</button>
            </div>
        `;
        return;
    }

    wishlist.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item fade-in'; // Reuse cart item styles
        itemElement.style.cssText = 'display: flex; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee; align-items: center;';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.25rem;">${item.name}</h4>
                <p style="color: var(--primary); font-weight: 600;">₹${item.price.toLocaleString()}</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn-small" onclick="addToCart(${item.id}); removeFromWishlist(${item.id});" title="Move to Cart">
                    <i class="ph ph-shopping-cart-simple"></i>
                </button>
                <button class="btn-small" style="background: #fee; color: #e74c3c; border: none;" onclick="removeFromWishlist(${item.id})" title="Remove">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
        `;
        wishlistItemsContainer.appendChild(itemElement);
    });
}

async function removeFromWishlist(productId) {
    const index = wishlist.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (hasSupabaseAPI()) {
            try {
                await window.SupabaseAPI.removeWishlistItem(productId);
                await syncSupabaseWishlist();
            } catch (err) {
                console.warn('⚠️ Supabase wishlist remove failed, using local fallback:', err);
                wishlist.splice(index, 1);
                syncLocalCache();
            }
        } else {
            wishlist.splice(index, 1);
            syncLocalCache();
        }

        updateWishlistUI();
        await displayWishlistItems();
        displayProducts(getAllProducts()); // Update hearts on grid
    }
}

async function addAllWishlistToCart() {
    if (wishlist.length === 0) {
        showNotification('Your wishlist is empty!');
        return;
    }

    if (hasSupabaseAPI()) {
        try {
            for (const item of wishlist) {
                await window.SupabaseAPI.addCartItem(item.id, 1);
            }
            await syncSupabaseCart();
        } catch (err) {
            console.warn('⚠️ Supabase bulk add failed, using local fallback:', err);
            wishlist.forEach(item => {
                const inCart = cart.find(c => c.id === item.id);
                if (!inCart) {
                    cart.push({ ...item, quantity: 1 });
                } else {
                    inCart.quantity += 1;
                }
            });
            syncLocalCache();
        }
    } else {
        wishlist.forEach(item => {
            const inCart = cart.find(c => c.id === item.id);
            if (!inCart) {
                cart.push({ ...item, quantity: 1 });
            } else {
                inCart.quantity += 1;
            }
        });
        syncLocalCache();
    }

    await updateCartCount();
    showNotification(`✅ Added ${wishlist.length} item(s) to cart!`);

    // Optional: Clear wishlist after moving? The user request didn't specify, but usually you keep them or ask. 
    // I'll keep them in wishlist for now as "saved items".
    closeModal('wishlistModal');
    await openModal('cartModal');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistUI();
});
