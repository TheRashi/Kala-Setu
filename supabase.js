// ============================================
// SUPABASE CLIENT - KalaSetu Backend
// ============================================

const SUPABASE_URL = 'https://agkfyofuuvrpjzaowggu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFna2Z5b2Z1dXZycGp6YW93Z2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDYxMDYsImV4cCI6MjA4NjE4MjEwNn0.dZrwR9oorj9TibHS4oXyODscj8FLrQd1oFnBxEcHL64';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Generate or retrieve a session ID for anonymous users
function getSessionId() {
    let sessionId = localStorage.getItem('kalasetu_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem('kalasetu_session_id', sessionId);
    }
    return sessionId;
}

// ============================================
// PRODUCTS API
// ============================================

/**
 * Fetch all products with their artisan info from Supabase
 */
async function fetchProducts() {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            artisan:artisans (*)
        `)
        .order('id', { ascending: true });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    // Transform data to match existing frontend format
    return data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        region: product.region,
        price: product.price,
        originalPrice: product.original_price,
        discount: product.discount,
        rating: parseFloat(product.rating),
        reviews: product.reviews,
        icon: product.icon,
        image: product.image,
        images: product.images,
        description: product.description,
        materials: product.materials,
        dimensions: product.dimensions,
        weight: product.weight,
        artForm: product.art_form,
        deliveryTime: product.delivery_time,
        detailedDescription: product.detailed_description,
        craftStory: product.craft_story,
        careInstructions: product.care_instructions,
        isUserProduct: product.is_user_product,
        artisan: product.artisan ? {
            name: product.artisan.name,
            avatar: product.artisan.avatar,
            location: product.artisan.location,
            experience: product.artisan.experience,
            products: product.artisan.products_count,
            rating: parseFloat(product.artisan.rating),
            sales: product.artisan.sales,
            bio: product.artisan.bio,
            specialization: product.artisan.specialization
        } : null
    }));
}

/**
 * Fetch a single product by ID
 */
async function fetchProductById(productId) {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            artisan:artisans (*)
        `)
        .eq('id', productId)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return {
        id: data.id,
        name: data.name,
        category: data.category,
        region: data.region,
        price: data.price,
        originalPrice: data.original_price,
        discount: data.discount,
        rating: parseFloat(data.rating),
        reviews: data.reviews,
        icon: data.icon,
        image: data.image,
        images: data.images,
        description: data.description,
        materials: data.materials,
        dimensions: data.dimensions,
        weight: data.weight,
        artForm: data.art_form,
        deliveryTime: data.delivery_time,
        detailedDescription: data.detailed_description,
        craftStory: data.craft_story,
        careInstructions: data.care_instructions,
        isUserProduct: data.is_user_product,
        artisan: data.artisan ? {
            name: data.artisan.name,
            avatar: data.artisan.avatar,
            location: data.artisan.location,
            experience: data.artisan.experience,
            products: data.artisan.products_count,
            rating: parseFloat(data.artisan.rating),
            sales: data.artisan.sales,
            bio: data.artisan.bio,
            specialization: data.artisan.specialization
        } : null
    };
}

/**
 * Upload a new product (user-submitted)
 */
async function uploadProduct(productData) {
    // First create the artisan record
    const { data: artisanData, error: artisanError } = await supabase
        .from('artisans')
        .insert({
            name: productData.artisanName,
            location: productData.artisanLocation,
            experience: 'Skilled artisan',
            bio: `${productData.artisanName} is a skilled artisan from ${productData.artisanLocation}.`
        })
        .select()
        .single();

    if (artisanError) {
        console.error('Error creating artisan:', artisanError);
        return null;
    }

    // Then create the product
    const { data, error } = await supabase
        .from('products')
        .insert({
            name: productData.name,
            category: productData.category,
            region: productData.region,
            price: productData.price,
            original_price: Math.round(productData.price * 1.25),
            discount: 20,
            icon: getCategoryIconForUpload(productData.category),
            image: productData.image,
            images: [productData.image, productData.image, productData.image],
            description: productData.description,
            materials: productData.materials || 'Handmade materials',
            dimensions: productData.dimensions || 'Contact seller',
            art_form: `Traditional ${productData.category.charAt(0).toUpperCase() + productData.category.slice(1)}`,
            delivery_time: '7-10 business days',
            detailed_description: productData.description,
            craft_story: `This beautiful ${productData.name} is a handcrafted piece made by ${productData.artisanName} from ${productData.artisanLocation}.`,
            care_instructions: ['Handle with care', 'Keep away from moisture', 'Store properly'],
            artisan_id: artisanData.id,
            is_user_product: true
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        return null;
    }

    return data;
}

function getCategoryIconForUpload(category) {
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
// CART API (Supabase-backed)
// ============================================

/**
 * Fetch cart items for the current session
 */
async function fetchCartItems() {
    const sessionId = getSessionId();
    const { data, error } = await supabase
        .from('cart_items')
        .select(`
            *,
            product:products (*)
        `)
        .eq('session_id', sessionId);

    if (error) {
        console.error('Error fetching cart:', error);
        return [];
    }

    return data.map(item => ({
        ...transformProduct(item.product),
        quantity: item.quantity,
        cartItemId: item.id
    }));
}

/**
 * Add item to cart in Supabase
 */
async function addCartItem(productId, quantity = 1) {
    const sessionId = getSessionId();
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

    // Check if already in cart
    const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('session_id', sessionId)
        .eq('product_id', productId)
        .single();

    if (existing) {
        // Update quantity
        const { error } = await supabase
            .from('cart_items')
            .update({ quantity: existing.quantity + qtyToAdd })
            .eq('id', existing.id);

        if (error) console.error('Error updating cart:', error);
    } else {
        // Insert new
        const { error } = await supabase
            .from('cart_items')
            .insert({ session_id: sessionId, product_id: productId, quantity: qtyToAdd });

        if (error) console.error('Error adding to cart:', error);
    }
}

/**
 * Remove item from cart in Supabase
 */
async function removeCartItem(cartItemId) {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

    if (error) console.error('Error removing from cart:', error);
}

/**
 * Update cart item quantity
 */
async function updateCartItemQuantity(cartItemId, newQuantity) {
    if (newQuantity <= 0) {
        return removeCartItem(cartItemId);
    }

    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', cartItemId);

    if (error) console.error('Error updating cart quantity:', error);
}

/**
 * Clear entire cart
 */
async function clearCart() {
    const sessionId = getSessionId();
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId);

    if (error) console.error('Error clearing cart:', error);
}

/**
 * Get cart count
 */
async function getCartCount() {
    const sessionId = getSessionId();
    const { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('session_id', sessionId);

    if (error) return 0;
    return data.reduce((sum, item) => sum + item.quantity, 0);
}

// ============================================
// WISHLIST API (Supabase-backed)
// ============================================

/**
 * Fetch wishlist items
 */
async function fetchWishlistItems() {
    const sessionId = getSessionId();
    const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
            *,
            product:products (*)
        `)
        .eq('session_id', sessionId);

    if (error) {
        console.error('Error fetching wishlist:', error);
        return [];
    }

    return data.map(item => ({
        ...transformProduct(item.product),
        wishlistItemId: item.id
    }));
}

/**
 * Toggle wishlist item
 */
async function toggleWishlistItem(productId) {
    const sessionId = getSessionId();

    // Check if already in wishlist
    const { data: existing } = await supabase
        .from('wishlist_items')
        .select('id')
        .eq('session_id', sessionId)
        .eq('product_id', productId)
        .single();

    if (existing) {
        // Remove
        const { error } = await supabase
            .from('wishlist_items')
            .delete()
            .eq('id', existing.id);

        if (error) console.error('Error removing from wishlist:', error);
        return false; // Not in wishlist anymore
    } else {
        // Add
        const { error } = await supabase
            .from('wishlist_items')
            .insert({ session_id: sessionId, product_id: productId });

        if (error) console.error('Error adding to wishlist:', error);
        return true; // Now in wishlist
    }
}

/**
 * Check if product is in wishlist
 */
async function checkWishlist(productId) {
    const sessionId = getSessionId();
    const { data } = await supabase
        .from('wishlist_items')
        .select('id')
        .eq('session_id', sessionId)
        .eq('product_id', productId)
        .single();

    return !!data;
}

/**
 * Get wishlist count
 */
async function getWishlistCount() {
    const sessionId = getSessionId();
    const { count, error } = await supabase
        .from('wishlist_items')
        .select('*', { count: 'exact', head: true })
        .eq('session_id', sessionId);

    if (error) return 0;
    return count;
}

/**
 * Remove from wishlist by product ID
 */
async function removeWishlistItem(productId) {
    const sessionId = getSessionId();
    const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);

    if (error) console.error('Error removing from wishlist:', error);
}

// ============================================
// HELPER: Transform DB row to frontend format
// ============================================
function transformProduct(product) {
    if (!product) return null;
    return {
        id: product.id,
        name: product.name,
        category: product.category,
        region: product.region,
        price: product.price,
        originalPrice: product.original_price,
        discount: product.discount,
        rating: parseFloat(product.rating),
        reviews: product.reviews,
        icon: product.icon,
        image: product.image,
        images: product.images,
        description: product.description,
        materials: product.materials,
        dimensions: product.dimensions,
        weight: product.weight,
        artForm: product.art_form,
        deliveryTime: product.delivery_time,
        detailedDescription: product.detailed_description,
        craftStory: product.craft_story,
        careInstructions: product.care_instructions,
        isUserProduct: product.is_user_product
    };
}

// Export for global use
window.SupabaseAPI = {
    fetchProducts,
    fetchProductById,
    uploadProduct,
    fetchCartItems,
    addCartItem,
    removeCartItem,
    updateCartItemQuantity,
    clearCart,
    getCartCount,
    fetchWishlistItems,
    toggleWishlistItem,
    checkWishlist,
    getWishlistCount,
    removeWishlistItem,
    getSessionId
};

console.log('✅ Supabase backend connected successfully!');
