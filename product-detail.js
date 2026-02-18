// ============================================
// PRODUCT DETAIL PAGE JAVASCRIPT
// ============================================

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Get all products including user-uploaded ones (local fallback)
function getAllProductsDetail() {
    if (typeof getAllProducts === 'function') {
        return getAllProducts();
    }
    const userProducts = JSON.parse(localStorage.getItem('kalasetu_user_products')) || [];
    return [...(window.products || []), ...userProducts];
}

// Load product details when page loads
document.addEventListener('DOMContentLoaded', async function () {
    const productId = getProductIdFromURL();

    // Try Supabase first
    if (window.SupabaseAPI) {
        try {
            const product = await SupabaseAPI.fetchProductById(productId);
            if (product) {
                loadProductDetailsFromData(product);
                if (typeof updateCartCount === 'function') updateCartCount();
                return;
            }
        } catch (err) {
            console.warn('⚠️ Supabase unavailable, using local data:', err);
        }
    }

    // Fallback to local data
    loadProductDetails(productId);
    if (typeof updateCartCount === 'function') updateCartCount();
});

// Load from local data (fallback)
function loadProductDetails(productId) {
    const allProducts = getAllProductsDetail();
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
        alert('Product not found!');
        window.location.href = 'index.html';
        return;
    }
    loadProductDetailsFromData(product);
}

// Load product details from data object (works with both Supabase and local)
function loadProductDetailsFromData(product) {

    if (!product) {
        alert('Product not found!');
        window.location.href = 'index.html';
        return;
    }

    // Update page title
    document.getElementById('pageTitle').textContent = `${product.name} - KalaSetu`;

    // Update breadcrumb
    document.getElementById('breadcrumbCategory').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('breadcrumbProduct').textContent = product.name;

    // Update main image and thumbnails
    const mainImg = document.getElementById('mainImage');
    mainImg.src = product.image;
    mainImg.alt = product.name;

    // Update product info
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productRegion').innerHTML = `<i class="ph ph-map-pin"></i> ${product.region}`;
    document.getElementById('productCategory').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('productPrice').textContent = `₹${product.price.toLocaleString()}`;

    if (product.originalPrice) {
        document.getElementById('originalPrice').textContent = `₹${product.originalPrice.toLocaleString()}`;
    }
    document.getElementById('discountBadge').textContent = `${product.discount || 20}% OFF`;

    // Rating
    const rating = product.rating || 4.5;
    document.getElementById('productRating').innerHTML = getStarRating(rating);
    document.getElementById('reviewCount').textContent = `(${product.reviews || 0} reviews)`;

    // Description
    document.getElementById('productDescription').textContent = product.detailedDescription || product.description;

    // Specifications
    document.getElementById('specMaterials').textContent = product.materials || 'Handmade materials';
    document.getElementById('specDimensions').textContent = product.dimensions || 'Contact seller';
    document.getElementById('specArtForm').textContent = product.artForm || 'Traditional Art';
    document.getElementById('specDelivery').textContent = product.deliveryTime || '5-7 business days';

    // Artisan info
    if (product.artisan) {
        document.getElementById('artisanName').textContent = product.artisan.name;
        document.getElementById('artisanLocation').innerHTML = `<i class="ph ph-map-pin"></i> ${product.artisan.location}`;
        document.getElementById('artisanBio').textContent = product.artisan.bio;
        // Check if avatar is emoji or class
        const avatar = product.artisan.avatar || 'ph-user-circle';
        if (avatar.startsWith('ph-')) {
            document.getElementById('artisanAvatar').innerHTML = `<i class="${avatar}" style="font-size: 2rem;"></i>`;
        } else {
            document.getElementById('artisanAvatar').textContent = avatar;
        }
        document.getElementById('artisanProducts').textContent = product.artisan.products || 1;
        document.getElementById('artisanSales').textContent = product.artisan.sales || 0;
        document.getElementById('artisanRating').textContent = product.artisan.rating || 5.0;
    }

    // Setup thumbnails
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = '';
    const imagesToUse = product.images || [product.image, product.image, product.image];

    imagesToUse.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        thumb.className = index === 0 ? 'thumbnail active' : 'thumbnail';
        thumb.onerror = () => thumb.src = 'https://via.placeholder.com/80x80?text=Image';
        thumb.onclick = () => {
            mainImg.src = imgSrc;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        };
        thumbnailContainer.appendChild(thumb);
    });
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) starsHtml += '<i class="ph-fill ph-star"></i>';
    if (hasHalf) starsHtml += '<i class="ph-fill ph-star-half"></i>';
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="ph ph-star"></i>';
    return starsHtml;
}

// Quantity controls
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Add to cart from detail page
async function addToCartFromDetail() {
    const productId = getProductIdFromURL();
    const quantity = parseInt(document.getElementById('quantity').value);
    const allProducts = getAllProductsDetail();
    const product = allProducts.find(p => p.id === productId);

    if (window.SupabaseAPI) {
        try {
            await window.SupabaseAPI.addCartItem(productId, quantity);
            if (typeof updateCartCount === 'function') await updateCartCount();
            showNotification(`✅ ${quantity} item(s) added to cart!`);
            return;
        } catch (err) {
            console.warn('⚠️ Supabase add-to-cart failed, using local fallback:', err);
        }
    }

    if (product) {
        let cart = JSON.parse(localStorage.getItem('kalasetu_cart')) || [];
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }

        localStorage.setItem('kalasetu_cart', JSON.stringify(cart));
        if (typeof updateCartCount === 'function') await updateCartCount();
        showNotification(`✅ ${quantity} item(s) added to cart!`);
    }
}

async function addToWishlist() {
    const productId = getProductIdFromURL();
    const allProducts = getAllProductsDetail();
    const product = allProducts.find(p => p.id === productId);

    if (window.SupabaseAPI) {
        try {
            const isAdded = await window.SupabaseAPI.toggleWishlistItem(productId);
            if (typeof updateWishlistUI === 'function') updateWishlistUI();
            showNotification(isAdded ? `❤️ ${product ? product.name : 'Product'} added to wishlist!` : `💔 Removed from wishlist!`);
            return;
        } catch (err) {
            console.warn('⚠️ Supabase wishlist failed, using local fallback:', err);
        }
    }

    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('kalasetu_wishlist')) || [];

    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('kalasetu_wishlist', JSON.stringify(wishlist));
        showNotification(`❤️ ${product.name} added to wishlist!`);
    } else {
        showNotification(`💔 ${product.name} is already in your wishlist!`);
    }
}

// Search functionality for detail page
function handleSearchDetail(event) {
    if (event.key === 'Enter') {
        performSearchDetail();
    }
}

function performSearchDetail() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        searchResults.innerHTML = '<p style="color: var(--text-light); text-align: center;">Type something to search...</p>';
        return;
    }

    const allProducts = getAllProductsDetail();
    const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.region.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        searchResults.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <p>No products found for "<strong>${query}</strong>"</p>
            </div>
        `;
        return;
    }

    searchResults.innerHTML = `<p style="margin-bottom: 1rem; color: var(--text-light);">Found ${results.length} product(s)</p>`;

    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.style.cssText = `
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid #eee;
            border-radius: 12px;
            margin-bottom: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        resultItem.onmouseover = () => resultItem.style.background = '#f9f9f9';
        resultItem.onmouseout = () => resultItem.style.background = 'white';
        resultItem.onclick = () => {
            window.location.href = `product_detail.html?id=${product.id}`;
        };

        resultItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.25rem;">${product.name}</h4>
                <p style="font-size: 0.85rem; color: #7f8c8d;">📍 ${product.region}</p>
                <p style="font-weight: 600; color: #D35400;">₹${product.price.toLocaleString()}</p>
            </div>
        `;
        searchResults.appendChild(resultItem);
    });
}

// Login handler for detail page
function handleLoginDetail(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const demoUser = { name: email.split('@')[0], email: email };
    localStorage.setItem('kalasetu_user', JSON.stringify(demoUser));
    closeModal('loginModal');
    showNotification(`👋 Welcome, ${demoUser.name}!`);
}
