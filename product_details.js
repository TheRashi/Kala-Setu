// ============================================
// PRODUCT DETAIL PAGE JAVASCRIPT
// ============================================

// Enhanced Product Data with Full Details
const productDetails = {
    1: {
        id: 1,
        name: "Madhubani Painting",
        category: "paintings",
        region: "Bihar",
        price: 2500,
        originalPrice: 3125,
        discount: 20,
        icon: "🎨",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IoduPcrZUyI_cUdlTUyI9tqXmdf0e4Io4w&s",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IoduPcrZUyI_cUdlTUyI9tqXmdf0e4Io4w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IoduPcrZUyI_cUdlTUyI9tqXmdf0e4Io4w&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8IoduPcrZUyI_cUdlTUyI9tqXmdf0e4Io4w&s"
        ],
        description: "An exquisite Madhubani painting showcasing the traditional folk art of Bihar. This hand-painted masterpiece features intricate patterns and vibrant natural colors, depicting themes from nature and mythology. Each stroke tells a story passed down through generations of skilled artists.",
        materials: "Natural dyes, Handmade paper, Rice paste",
        dimensions: "30cm x 40cm",
        weight: "200g",
        artForm: "Madhubani Folk Art",
        deliveryTime: "5-7 business days",
        detailedDescription: "This stunning Madhubani painting is a testament to the rich artistic heritage of Bihar. Created using traditional techniques that have been preserved for centuries, this artwork features the characteristic double-line border and vibrant natural colors derived from plants and minerals. The intricate geometric patterns and detailed depictions make this piece a perfect addition to any art collection or home décor. Each painting is unique and reflects the artist's personal style while maintaining the authentic Madhubani tradition.",
        craftStory: "Madhubani art, also known as Mithila art, originated in the Mithila region of Bihar over 2500 years ago. Traditionally practiced by women, this art form was initially done on freshly plastered mud walls and floors of huts during festivals and special occasions. The paintings were characterized by their eye-catching geometrical patterns, symbolic content, and vibrant colors. Today, this ancient art form has evolved to canvas and paper, allowing artists to share their cultural heritage with the world while preserving traditional techniques and themes.",
        careInstructions: [
            "Frame under glass to protect from dust and moisture",
            "Keep away from direct sunlight to prevent color fading",
            "Avoid hanging in areas with high humidity",
            "Clean the glass gently with a soft, dry cloth",
            "Do not use water or chemical cleaners on the artwork"
        ],
        artisan: {
            name: "Sita Devi",
            avatar: "👩‍🎨",
            location: "Madhubani, Bihar",
            experience: "25+ years",
            products: 85,
            rating: 4.9,
            sales: 650,
            bio: "Sita Devi is a master Madhubani artist who learned this traditional art form from her mother and grandmother. With over 25 years of experience, she specializes in creating intricate Madhubani paintings that blend traditional themes with contemporary aesthetics. Her work has been exhibited in galleries across India and has won several awards for preserving this ancient art form.",
            specialization: "Madhubani Folk Painting, Natural Dye Techniques"
        }
    },
    2: {
        id: 2,
        name: "Terracotta Vase",
        category: "pottery",
        region: "West Bengal",
        price: 1200,
        originalPrice: 1500,
        discount: 20,
        icon: "🏺",
        image: "https://livingshapes.in/cdn/shop/files/LS0429GROUP.jpg?v=1756702721",
        images: [
            "https://livingshapes.in/cdn/shop/files/LS0429GROUP.jpg?v=1756702721",
            "https://livingshapes.in/cdn/shop/files/LS0429GROUP.jpg?v=1756702721",
            "https://livingshapes.in/cdn/shop/files/LS0429GROUP.jpg?v=1756702721"
        ],
        description: "A beautifully handcrafted terracotta vase from the renowned pottery workshops of West Bengal. This traditional earthenware piece showcases excellent craftsmanship with natural clay finish and elegant design, perfect for both decorative and functional use.",
        materials: "Natural terracotta clay, Eco-friendly glazing",
        dimensions: "Height: 25cm, Diameter: 15cm",
        weight: "800g",
        artForm: "Traditional Terracotta Pottery",
        deliveryTime: "5-7 business days",
        detailedDescription: "This stunning terracotta vase represents the finest tradition of West Bengal pottery. Handcrafted by skilled artisans using time-honored techniques, each vase is shaped on a traditional potter's wheel and fired in a kiln to achieve its distinctive reddish-brown color. The smooth finish and elegant form make it perfect for displaying fresh flowers or as a standalone decorative piece. The natural properties of terracotta also help keep water cool, making it ideal for both aesthetic and practical purposes.",
        craftStory: "Terracotta pottery in West Bengal has a history spanning thousands of years, with the craft being central to Bengali culture and daily life. The artisans of Kumartuli and other pottery villages have perfected their techniques over generations, creating everything from simple utility items to elaborate decorative pieces. The pottery is made from locally sourced clay, shaped using traditional methods, and fired in age-old kilns. This sustainable and eco-friendly craft continues to thrive, with artisans blending traditional designs with contemporary aesthetics.",
        careInstructions: [
            "Rinse with clean water before first use",
            "Hand wash gently with mild soap",
            "Avoid thermal shock - do not place hot items in cold vase",
            "Allow to dry completely before storing",
            "Handle with care as terracotta can be fragile"
        ],
        artisan: {
            name: "Ranjan Pal",
            avatar: "👨‍🎨",
            location: "Kumartuli, West Bengal",
            experience: "30+ years",
            products: 120,
            rating: 4.8,
            sales: 890,
            bio: "Ranjan Pal comes from a family of traditional potters in Kumartuli, Kolkata's famous pottery district. Learning the craft from his father at a young age, Ranjan has spent over three decades perfecting the art of terracotta pottery. His work is known for its elegant designs and superior quality, combining traditional techniques with modern aesthetics.",
            specialization: "Terracotta Pottery, Traditional Wheel Throwing"
        }
    },
    3: {
        id: 3,
        name: "Bandhani Saree",
        category: "textiles",
        region: "Gujarat",
        price: 3500,
        originalPrice: 4375,
        discount: 20,
        icon: "🧵",
        image: "https://www.aachho.co/cdn/shop/files/NRN_5337.jpg_1_1400x.jpg?v=1728303784",
        images: [
            "https://www.aachho.co/cdn/shop/files/NRN_5337.jpg_1_1400x.jpg?v=1728303784",
            "https://www.aachho.co/cdn/shop/files/NRN_5337.jpg_1_1400x.jpg?v=1728303784",
            "https://www.aachho.co/cdn/shop/files/NRN_5337.jpg_1_1400x.jpg?v=1728303784"
        ],
        description: "An authentic Bandhani saree featuring the traditional tie-dye technique of Gujarat. This handcrafted textile showcases thousands of tiny knots that create stunning patterns, making it a timeless piece of wearable art perfect for special occasions.",
        materials: "Pure cotton, Natural dyes, Traditional tie-dye",
        dimensions: "Length: 6.5 meters (with blouse piece)",
        weight: "450g",
        artForm: "Bandhani Tie-Dye",
        deliveryTime: "7-10 business days",
        detailedDescription: "This exquisite Bandhani saree is a masterpiece of traditional Gujarati craftsmanship. Each saree features thousands of tiny dots created through the ancient tie-dye technique, where fabric is tied into multiple knots before dyeing. The result is a mesmerizing pattern that is unique to each piece. Made from pure cotton with vibrant natural dyes, this saree offers both comfort and elegance. Perfect for weddings, festivals, and special celebrations, it comes with a matching blouse piece.",
        craftStory: "Bandhani, also known as Bandhej, is an ancient tie-dye textile art that has been practiced in Gujarat and Rajasthan for over 5000 years. The word 'Bandhani' comes from the Sanskrit word 'bandh' (to tie). The intricate process involves tying thousands of tiny points on the fabric with thread before dyeing, creating beautiful patterns. Traditionally worn by royalty and during auspicious occasions, Bandhani textiles are considered symbols of good fortune. Each piece can take weeks to create, with some elaborate designs requiring up to 500,000 individual ties.",
        careInstructions: [
            "Dry clean recommended for best results",
            "If hand washing, use cold water and mild detergent",
            "Wash separately to prevent color bleeding",
            "Avoid wringing; gently squeeze out excess water",
            "Dry in shade, away from direct sunlight",
            "Iron on medium heat while slightly damp"
        ],
        artisan: {
            name: "Lakshmi Ben Patel",
            avatar: "👩‍🎨",
            location: "Bhuj, Gujarat",
            experience: "20+ years",
            products: 95,
            rating: 4.9,
            sales: 420,
            bio: "Lakshmi Ben Patel is a renowned Bandhani artist from Bhuj, Gujarat. Coming from a family of traditional textile artisans, she has mastered the intricate tie-dye technique over two decades. Her work preserves the authentic Bandhani tradition while incorporating contemporary color combinations and patterns. Each of her creations tells a story of dedication, skill, and cultural heritage.",
            specialization: "Bandhani Tie-Dye, Traditional Textile Arts"
        }
    },
    4: {
        id: 4,
        name: "Silver Anklet",
        category: "jewelry",
        region: "Rajasthan",
        price: 1800,
        originalPrice: 2250,
        discount: 20,
        icon: "💍",
        image: "https://raajraani.com/cdn/shop/files/wank_1783.jpg?v=1738157315",
        images: [
            "https://raajraani.com/cdn/shop/files/wank_1783.jpg?v=1738157315",
            "https://raajraani.com/cdn/shop/files/wank_1783.jpg?v=1738157315",
            "https://raajraani.com/cdn/shop/files/wank_1783.jpg?v=1738157315"
        ],
        description: "An elegant sterling silver anklet handcrafted by skilled artisans of Rajasthan. This traditional piece features intricate designs with delicate bells, representing the rich jewelry-making heritage of India.",
        materials: "92.5% Sterling Silver, Traditional crafting",
        dimensions: "Length: 25cm (adjustable)",
        weight: "35g",
        artForm: "Traditional Silver Jewelry",
        deliveryTime: "5-7 business days",
        detailedDescription: "This beautiful silver anklet (payal) is a perfect blend of traditional craftsmanship and timeless elegance. Handcrafted from 92.5% pure sterling silver, it features intricate patterns and small bells that create a gentle chiming sound with movement. The design reflects the rich heritage of Rajasthani jewelry-making, where each piece is created with meticulous attention to detail. The anklet is adjustable to fit different sizes comfortably and comes with a secure clasp.",
        craftStory: "Silver jewelry making in Rajasthan dates back centuries, with the state being famous for its skilled silversmiths who have passed down their craft through generations. The artisans use traditional techniques like hand-hammering, wire-work, and detailed engraving to create intricate designs. Anklets hold special significance in Indian culture, traditionally worn by married women and considered auspicious. Each piece is unique, bearing the mark of the artisan's individual style while maintaining traditional motifs and patterns.",
        careInstructions: [
            "Clean regularly with a soft cloth to maintain shine",
            "Store in an airtight container when not in use",
            "Avoid contact with perfumes, lotions, and chemicals",
            "Remove before bathing or swimming",
            "Polish occasionally with silver cleaning solution",
            "Keep away from moisture to prevent tarnishing"
        ],
        artisan: {
            name: "Mohan Lal Solanki",
            avatar: "👨‍🎨",
            location: "Jaipur, Rajasthan",
            experience: "35+ years",
            products: 150,
            rating: 4.9,
            sales: 780,
            bio: "Mohan Lal Solanki is a master silversmith from Jaipur, known for his exceptional craftsmanship in traditional jewelry. Learning the art from his father and grandfather, he has over 35 years of experience in creating exquisite silver pieces. His work has been recognized nationally, and he takes pride in preserving the authentic techniques of Rajasthani silver jewelry making.",
            specialization: "Sterling Silver Jewelry, Traditional Rajasthani Designs"
        }
    },
    5: {
        id: 5,
        name: "Warli Art Frame",
        category: "paintings",
        region: "Maharashtra",
        price: 1500,
        originalPrice: 1875,
        discount: 20,
        icon: "🖼️",
        image: "https://i.pinimg.com/736x/f3/84/93/f38493779f8ea037f8507044a8f0a0cd.jpg",
        images: [
            "https://i.pinimg.com/736x/f3/84/93/f38493779f8ea037f8507044a8f0a0cd.jpg",
            "https://i.pinimg.com/736x/f3/84/93/f38493779f8ea037f8507044a8f0a0cd.jpg",
            "https://i.pinimg.com/736x/f3/84/93/f38493779f8ea037f8507044a8f0a0cd.jpg"
        ],
        description: "An authentic Warli art painting showcasing the tribal art form of Maharashtra. Created with simple geometric shapes and lines, this piece depicts scenes of daily life and celebrations in the traditional Warli style.",
        materials: "Natural pigments, Canvas, Bamboo stick painting",
        dimensions: "25cm x 35cm (framed)",
        weight: "350g",
        artForm: "Warli Tribal Art",
        deliveryTime: "5-7 business days",
        detailedDescription: "This captivating Warli painting brings to life the ancient tribal art of the Warli people from Maharashtra's Thane district. Using only white pigment made from rice paste on a contrasting background, the artist creates stunning depictions of daily life, festivals, and nature using basic geometric shapes - circles, triangles, and lines. The simplicity of the forms belies the complexity of the narratives they convey. This framed piece is ready to hang and adds a touch of tribal elegance to any space.",
        craftStory: "Warli painting is one of the oldest art forms in India, dating back to 2500-3000 BCE. This tribal art was traditionally created by the Warli tribe on the walls of their huts during weddings and harvest festivals. The paintings primarily use geometric shapes: triangles represent mountains and trees, circles and triangles represent humans, and squares represent sacred enclosures. Despite its apparent simplicity, Warli art is sophisticated in its ability to capture complex social ceremonies, harvest celebrations, and daily activities. The art form was relatively unknown until the 1970s when it gained recognition in urban India and internationally.",
        careInstructions: [
            "Keep framed artwork away from direct sunlight",
            "Hang in areas with moderate humidity",
            "Clean frame glass with a soft, lint-free cloth",
            "Avoid touching the artwork surface",
            "Store in a cool, dry place if not displayed"
        ],
        artisan: {
            name: "Jivya Soma Mashe Jr.",
            avatar: "👨‍🎨",
            location: "Ganjad Village, Maharashtra",
            experience: "18+ years",
            products: 110,
            rating: 4.8,
            sales: 520,
            bio: "Following in the footsteps of his legendary father, Jivya Soma Mashe Jr. is a renowned Warli artist who has been practicing this tribal art form for over 18 years. He learned the traditional techniques from his father and has helped bring Warli art to contemporary audiences while preserving its authentic style and cultural significance.",
            specialization: "Warli Tribal Art, Traditional Geometric Patterns"
        }
    },
    6: {
        id: 6,
        name: "Brass Diya Set",
        category: "handicrafts",
        region: "Tamil Nadu",
        price: 800,
        originalPrice: 1000,
        discount: 20,
        icon: "🪔",
        image: "https://i.pinimg.com/736x/26/4b/a1/264ba11eadef88a9810349b024d5304a.jpg",
        images: [
            "https://i.pinimg.com/736x/26/4b/a1/264ba11eadef88a9810349b024d5304a.jpg",
            "https://i.pinimg.com/736x/26/4b/a1/264ba11eadef88a9810349b024d5304a.jpg",
            "https://i.pinimg.com/736x/26/4b/a1/264ba11eadef88a9810349b024d5304a.jpg"
        ],
        description: "A beautiful set of handcrafted brass diyas (oil lamps) from Tamil Nadu. These traditional lamps feature intricate designs and are perfect for festivals, pujas, and home decoration, bringing divine light and positive energy.",
        materials: "Pure brass, Traditional hand-forging",
        dimensions: "Each diya: 8cm diameter, Set of 5",
        weight: "600g (complete set)",
        artForm: "Traditional Brass Craft",
        deliveryTime: "5-7 business days",
        detailedDescription: "This exquisite set of five brass diyas represents the finest tradition of South Indian metal craft. Each diya is individually handcrafted using traditional techniques, featuring elegant designs with a polished brass finish. The set includes five diyas of varying sizes, perfect for arranging in beautiful patterns during festivals like Diwali, or for daily worship. Brass diyas are considered auspicious in Hindu tradition and are believed to bring prosperity and positive energy to the home. The set comes in a decorative box, making it an ideal gift.",
        craftStory: "Brass craftsmanship in Tamil Nadu has a rich history spanning over a thousand years. The artisans, known as 'Kansaris', use traditional techniques of lost-wax casting and hand-hammering to create beautiful brass items. Diyas hold immense religious and cultural significance in Indian tradition, with the ritual of lighting lamps symbolizing the victory of light over darkness and knowledge over ignorance. The craft has been passed down through generations, with each artisan adding their unique touch while maintaining traditional designs and quality.",
        careInstructions: [
            "Clean with tamarind juice or lemon to restore shine",
            "Dry thoroughly after cleaning to prevent oxidation",
            "Polish regularly with brass cleaner for best results",
            "Store in a dry place when not in use",
            "Use cotton wicks and pure oil for lighting",
            "Handle with care to maintain the finish"
        ],
        artisan: {
            name: "Venkatesh Iyer",
            avatar: "👨‍🎨",
            location: "Kumbakonam, Tamil Nadu",
            experience: "28+ years",
            products: 200,
            rating: 4.7,
            sales: 950,
            bio: "Venkatesh Iyer is a master brass craftsman from Kumbakonam, a town famous for its traditional metal work. Coming from a family of artisans, he learned the craft at a young age and has perfected it over 28 years. His brass diyas are known for their quality, durability, and intricate designs that blend traditional motifs with contemporary aesthetics.",
            specialization: "Brass Craftsmanship, Traditional Metal Work"
        }
    },
    7: {
        id: 7,
        name: "Blue Pottery Bowl",
        category: "pottery",
        region: "Rajasthan",
        price: 950,
        originalPrice: 1188,
        discount: 20,
        icon: "🥣",
        image: "https://i.pinimg.com/1200x/5d/33/2a/5d332af16500120c22d64b1d2e9c9c04.jpg",
        images: [
            "https://i.pinimg.com/1200x/5d/33/2a/5d332af16500120c22d64b1d2e9c9c04.jpg",
            "https://i.pinimg.com/1200x/5d/33/2a/5d332af16500120c22d64b1d2e9c9c04.jpg",
            "https://i.pinimg.com/1200x/5d/33/2a/5d332af16500120c22d64b1d2e9c9c04.jpg"
        ],
        description: "A stunning Jaipur blue pottery bowl featuring the characteristic turquoise blue glaze and intricate floral patterns. This handcrafted piece is perfect for serving or as a decorative item.",
        materials: "Quartz stone powder, Multani mitti, Glass, Natural dyes",
        dimensions: "Diameter: 20cm, Height: 8cm",
        weight: "400g",
        artForm: "Jaipur Blue Pottery",
        deliveryTime: "5-7 business days",
        detailedDescription: "This exquisite blue pottery bowl showcases the unique art form that made Jaipur famous worldwide. Unlike traditional pottery, blue pottery doesn't use clay but is made from quartz stone powder, Multani mitti (fuller's earth), and glass. The signature turquoise blue color comes from copper oxide, and the intricate floral and geometric patterns are hand-painted by skilled artisans. This decorative bowl can be used for serving dry fruits, potpourri, or simply as an elegant display piece. Each piece is unique, with slight variations that add to its handmade charm.",
        craftStory: "Blue pottery is a traditional craft that traces its origins to Turko-Persian heritage, brought to Jaipur by craftsmen from Persia and Central Asia in the 14th century. The art form flourished under royal patronage in Jaipur and became synonymous with the city. What makes it unique is that it's low-fired and doesn't use clay. The distinctive blue dye is derived from copper oxide, and the patterns are inspired by Mughal and Persian motifs featuring flowers, birds, and geometric designs. Despite facing near extinction in the 20th century, dedicated artisans have revived this beautiful craft.",
        careInstructions: [
            "Hand wash gently with mild soap and warm water",
            "Not suitable for microwave or dishwasher",
            "Avoid sudden temperature changes",
            "Dry immediately with soft cloth",
            "Best used for dry serving or decoration",
            "Handle with care as the glaze can be delicate"
        ],
        artisan: {
            name: "Kripal Singh Shekhawat",
            avatar: "👨‍🎨",
            location: "Jaipur, Rajasthan",
            experience: "22+ years",
            products: 180,
            rating: 4.8,
            sales: 640,
            bio: "Kripal Singh Shekhawat learned blue pottery from the legendary master Kripal Singh Shekhawat (his grandfather) and has dedicated over 22 years to preserving and promoting this unique art form. His workshop in Jaipur creates authentic blue pottery using traditional methods, and he has trained numerous young artisans to keep this heritage craft alive.",
            specialization: "Jaipur Blue Pottery, Traditional Glazing Techniques"
        }
    },
    8: {
        id: 8,
        name: "Pattachitra Scroll",
        category: "paintings",
        region: "Odisha",
        price: 3200,
        originalPrice: 4000,
        discount: 20,
        icon: "📜",
        image: "https://i.pinimg.com/736x/1d/f6/d0/1df6d04a904677d23053e5aad2ee5f51.jpg",
        images: [
            "https://i.pinimg.com/736x/1d/f6/d0/1df6d04a904677d23053e5aad2ee5f51.jpg",
            "https://i.pinimg.com/736x/1d/f6/d0/1df6d04a904677d23053e5aad2ee5f51.jpg",
            "https://i.pinimg.com/736x/1d/f6/d0/1df6d04a904677d23053e5aad2ee5f51.jpg"
        ],
        description: "An authentic Pattachitra scroll painting depicting mythological narratives in the traditional Odisha style. Hand-painted with natural colors on treated cloth, featuring intricate details and vibrant hues.",
        materials: "Treated cloth canvas, Natural mineral colors, Stone gum",
        dimensions: "45cm x 60cm",
        weight: "300g",
        artForm: "Pattachitra Scroll Painting",
        deliveryTime: "7-10 business days",
        detailedDescription: "This magnificent Pattachitra painting is a masterpiece of one of India's oldest art forms. Created on specially treated cloth using natural stone colors, it depicts mythological stories with intricate details and bold, vibrant colors. The painting follows traditional Pattachitra characteristics including elaborate borders, bold outlines, and rich iconography. The canvas is first prepared with a mixture of chalk and gum, then polished to create a smooth surface. Artists use handmade brushes and natural colors derived from minerals and plants. This scroll is ready to frame and makes a stunning addition to any art collection.",
        craftStory: "Pattachitra, literally meaning 'cloth picture', is a centuries-old art form from Odisha and West Bengal. Dating back to the 5th century BCE, these paintings were traditionally created as wall hangings in the Jagannath Temple of Puri. The art form depicts Hindu mythological narratives, particularly stories of Lord Jagannath and Krishna. The entire process, from preparing the canvas to creating the natural colors and painting intricate details, is done by hand using age-old techniques. Pattachitra artists, known as chitrakars, often belong to families that have practiced this art for generations. The themes are deeply rooted in Hindu mythology, folklore, and religious texts.",
        careInstructions: [
            "Frame under glass to protect from dust and humidity",
            "Keep away from direct sunlight to preserve colors",
            "Avoid hanging in damp or humid areas",
            "Do not fold or roll the painting",
            "Clean only the glass surface, never the painting",
            "Store flat if not displayed"
        ],
        artisan: {
            name: "Raghunath Mahapatra",
            avatar: "👨‍🎨",
            location: "Raghurajpur, Odisha",
            experience: "32+ years",
            products: 95,
            rating: 4.9,
            sales: 380,
            bio: "Raghunath Mahapatra hails from Raghurajpur, Odisha's heritage crafts village, where every household practices traditional arts. A National Award-winning Pattachitra artist with over 32 years of experience, he has exhibited his work internationally and is dedicated to training young artists in this ancient art form. His paintings are known for their exceptional detail and adherence to traditional iconography.",
            specialization: "Pattachitra Scroll Painting, Traditional Natural Colors"
        }
    },
    9: {
        id: 9,
        name: "Kashmiri Pashmina",
        category: "textiles",
        region: "Jammu & Kashmir",
        price: 5500,
        originalPrice: 6875,
        discount: 20,
        icon: "🧣",
        image: "https://i.pinimg.com/736x/69/bd/1d/69bd1d4fc79442157c7bef53cfaa7753.jpg",
        images: [
            "https://i.pinimg.com/736x/69/bd/1d/69bd1d4fc79442157c7bef53cfaa7753.jpg",
            "https://i.pinimg.com/736x/69/bd/1d/69bd1d4fc79442157c7bef53cfaa7753.jpg",
            "https://i.pinimg.com/736x/69/bd/1d/69bd1d4fc79442157c7bef53cfaa7753.jpg"
        ],
        description: "An authentic Kashmiri Pashmina shawl hand-woven from the finest cashmere wool. This luxurious piece features traditional Kashmiri embroidery and offers unparalleled softness and warmth.",
        materials: "100% Pure Pashmina (Cashmere), Traditional hand-weaving",
        dimensions: "200cm x 100cm",
        weight: "180g",
        artForm: "Kashmiri Pashmina Weaving",
        deliveryTime: "7-10 business days",
        detailedDescription: "This exquisite Pashmina shawl represents the pinnacle of Kashmiri craftsmanship. Made from the finest grade of cashmere wool obtained from the Changthangi goats of Ladakh, this shawl is incredibly soft, lightweight, and warm. Each piece is hand-woven on traditional looms by skilled Kashmiri weavers who have inherited this craft through generations. The delicate embroidery work adds to its elegance, making it a timeless piece that can be passed down as an heirloom. This genuine Pashmina comes with a certificate of authenticity.",
        craftStory: "Pashmina weaving in Kashmir dates back over 500 years, introduced during the reign of Sultan Zain-ul-Abidin in the 15th century. The word 'Pashmina' comes from 'Pashm', meaning soft gold in Persian. The finest Pashmina comes from the undercoat of Changthangi goats that live at altitudes of 14,000 feet in Ladakh's Changthang region. The wool is incredibly fine (12-15 microns) and is hand-spun and woven on traditional handlooms. A single shawl can take weeks or even months to complete. True Kashmiri Pashmina is considered one of the world's finest luxury fabrics and has been prized by royalty and nobility for centuries.",
        careInstructions: [
            "Dry clean only for best results",
            "If hand washing, use cold water with mild wool detergent",
            "Never wring or twist; gently squeeze excess water",
            "Dry flat on a clean towel, away from direct heat or sunlight",
            "Store folded in a breathable cotton bag",
            "Use mothballs to protect from insects",
            "Iron on low heat with a cloth between iron and Pashmina"
        ],
        artisan: {
            name: "Abdul Rashid",
            avatar: "👨‍🎨",
            location: "Srinagar, Jammu & Kashmir",
            experience: "40+ years",
            products: 65,
            rating: 5.0,
            sales: 290,
            bio: "Abdul Rashid belongs to a family of master weavers in Srinagar who have been creating authentic Pashmina shawls for over four generations. With more than 40 years of experience, he is recognized as one of the finest Pashmina artisans in Kashmir. His work has been commissioned by international buyers and he takes immense pride in preserving the authentic traditional techniques of Pashmina weaving.",
            specialization: "Pashmina Hand-Weaving, Traditional Kashmiri Embroidery"
        }
    },
    10: {
        id: 10,
        name: "Temple Jewelry Set",
        category: "jewelry",
        region: "Tamil Nadu",
        price: 2200,
        originalPrice: 2750,
        discount: 20,
        icon: "💎",
        image: "https://i.pinimg.com/736x/36/a3/ce/36a3ced9d579d0589822850bd40173c3.jpg",
        images: [
            "https://i.pinimg.com/736x/36/a3/ce/36a3ced9d579d0589822850bd40173c3.jpg",
            "https://i.pinimg.com/736x/36/a3/ce/36a3ced9d579d0589822850bd40173c3.jpg",
            "https://i.pinimg.com/736x/36/a3/ce/36a3ced9d579d0589822850bd40173c3.jpg"
        ],
        description: "An elegant temple jewelry set featuring traditional South Indian designs. This complete set includes necklace, earrings, and tikka, crafted with intricate detailing and gold-plated finish.",
        materials: "Brass base, 22K gold plating, Semi-precious stones",
        dimensions: "Necklace: 40cm, Earrings: 6cm",
        weight: "150g (complete set)",
        artForm: "Temple Jewelry Crafting",
        deliveryTime: "5-7 business days",
        detailedDescription: "This stunning temple jewelry set is a perfect representation of South Indian traditional ornaments. Inspired by the jewelry adorning deities in ancient temples, this set features intricate designs with gold plating and semi-precious stone embellishments. The set includes a statement necklace with deity motifs, matching long earrings, and a beautiful tikka (forehead ornament). Each piece is handcrafted by skilled artisans using traditional techniques. Perfect for weddings, classical dance performances, or festive occasions, this jewelry set adds a touch of divine elegance to any traditional outfit.",
        craftStory: "Temple jewelry has its origins in the magnificent temples of South India, where such ornaments adorned the statues of deities. The art form dates back over a thousand years, with the Chola dynasty (9th-13th century) being particularly known for patronizing this craft. Traditional temple jewelry features depictions of gods, goddesses, temple architecture, and religious symbols. The jewelry was originally made in pure gold for temple deities and royalty. Today's artisans recreate these timeless designs using gold-plated brass, making them accessible while maintaining the traditional aesthetic and craftsmanship.",
        careInstructions: [
            "Store in a jewelry box wrapped in soft cloth",
            "Keep away from perfumes, cosmetics, and chemicals",
            "Clean gently with a soft, dry cloth after use",
            "Avoid contact with water and moisture",
            "Remove before bathing, swimming, or exercising",
            "Re-polish if gold plating dulls over time"
        ],
        artisan: {
            name: "Meenakshi Sundaram",
            avatar: "👨‍🎨",
            location: "Kumbakonam, Tamil Nadu",
            experience: "26+ years",
            products: 140,
            rating: 4.8,
            sales: 560,
            bio: "Meenakshi Sundaram is a master craftsman specializing in traditional temple jewelry. Learning the art from his father, he has over 26 years of experience in creating intricate jewelry pieces that blend ancient temple designs with contemporary wearability. His work is sought after by classical dancers and brides across South India and abroad.",
            specialization: "Temple Jewelry, Traditional Gold Work"
        }
    },
    11: {
        id: 11,
        name: "Bamboo Basket",
        category: "handicrafts",
        region: "Assam",
        price: 600,
        originalPrice: 750,
        discount: 20,
        icon: "🧺",
        image: "https://i.pinimg.com/1200x/d1/e3/28/d1e328e4decea649aaeafd994b12cde3.jpg",
        images: [
            "https://i.pinimg.com/1200x/d1/e3/28/d1e328e4decea649aaeafd994b12cde3.jpg",
            "https://i.pinimg.com/1200x/d1/e3/28/d1e328e4decea649aaeafd994b12cde3.jpg",
            "https://i.pinimg.com/1200x/d1/e3/28/d1e328e4decea649aaeafd994b12cde3.jpg"
        ],
        description: "A beautifully handwoven bamboo basket from Assam, showcasing traditional weaving techniques. This eco-friendly, durable basket is perfect for storage, shopping, or home decoration.",
        materials: "100% Natural bamboo, Eco-friendly weaving",
        dimensions: "Diameter: 35cm, Height: 20cm",
        weight: "400g",
        artForm: "Traditional Bamboo Craft",
        deliveryTime: "5-7 business days",
        detailedDescription: "This exquisite bamboo basket represents the rich tradition of Assamese bamboo craftsmanship. Handwoven using sustainable bamboo harvested from the forests of Northeast India, each basket is a testament to the skill and patience of the artisan. The tight weaving ensures durability while the natural bamboo gives it a rustic, organic appeal. This versatile basket can be used for storing fruits, vegetables, household items, or as a decorative piece. The natural variations in bamboo color and texture make each basket unique. Being completely eco-friendly and biodegradable, it's a perfect sustainable choice for conscious consumers.",
        craftStory: "Bamboo craft is an integral part of Assamese culture and has been practiced for thousands of years. The abundant bamboo forests in Assam and Northeast India have made bamboo the primary material for creating a wide range of utilitarian and decorative items. Traditional bamboo weaving is done entirely by hand without any machinery, with techniques passed down through generations. Different tribes in Assam have their own unique weaving patterns and styles. The craft not only provides livelihood to thousands of artisans but also represents a sustainable, eco-friendly alternative to plastic and synthetic materials.",
        careInstructions: [
            "Clean with a damp cloth and dry immediately",
            "Avoid prolonged exposure to water",
            "Keep in a well-ventilated area to prevent mold",
            "Apply vegetable oil occasionally to maintain suppleness",
            "Store in a dry place when not in use",
            "Avoid placing in direct sunlight for extended periods"
        ],
        artisan: {
            name: "Biren Gogoi",
            avatar: "👨‍🎨",
            location: "Jorhat, Assam",
            experience: "24+ years",
            products: 220,
            rating: 4.7,
            sales: 890,
            bio: "Biren Gogoi is a skilled bamboo craftsman from Jorhat, Assam, who has dedicated over 24 years to perfecting the art of bamboo weaving. Coming from a family of traditional basket weavers, he creates functional and decorative bamboo products that showcase the versatility of this sustainable material. His work promotes eco-friendly living while preserving traditional Assamese craftsmanship.",
            specialization: "Bamboo Weaving, Traditional Basket Making"
        }
    },
    12: {
        id: 12,
        name: "Dhokra Horse",
        category: "handicrafts",
        region: "Chhattisgarh",
        price: 1400,
        originalPrice: 1750,
        discount: 20,
        icon: "🐴",
        image: "https://i.pinimg.com/736x/6c/32/72/6c327293f73bf9b430391737c5c612e9.jpg",
        images: [
            "https://i.pinimg.com/736x/6c/32/72/6c327293f73bf9b430391737c5c612e9.jpg",
            "https://i.pinimg.com/736x/6c/32/72/6c327293f73bf9b430391737c5c612e9.jpg",
            "https://i.pinimg.com/736x/6c/32/72/6c327293f73bf9b430391737c5c612e9.jpg"
        ],
        description: "An authentic Dhokra horse figurine crafted using the ancient lost-wax casting technique. This tribal metal art piece showcases the primitive beauty and cultural heritage of Chhattisgarh's tribal artisans.",
        materials: "Brass and copper alloy, Lost-wax casting technique",
        dimensions: "Height: 15cm, Length: 18cm",
        weight: "650g",
        artForm: "Dhokra Metal Casting",
        deliveryTime: "5-7 business days",
        detailedDescription: "This remarkable Dhokra horse is a stunning example of India's oldest metal casting tradition. Created using the lost-wax technique that dates back over 4,000 years, each piece is unique and cannot be replicated. The artisan first creates a clay core, covers it with wax to form the design, then coats it with clay. When heated, the wax melts away (hence 'lost-wax'), and molten metal is poured into the mold. The final piece has a distinctive primitive, folk art aesthetic with a rustic antique finish. This decorative piece adds cultural depth to any space and makes an excellent collector's item or gift.",
        craftStory: "Dhokra is a 4,000-year-old craft practiced by tribal artisans in the states of Chhattisgarh, Jharkhand, West Bengal, and Odisha. The name comes from the Dhokra Damar tribes, traditional metal workers. This non-ferrous metal casting technique using the lost-wax method is the same process used to create the famous Dancing Girl of Mohenjo-Daro. Each Dhokra piece is one-of-a-kind as the clay mold is broken to extract the casting. The art form has been recognized with GI (Geographical Indication) tags in several states. Traditional motifs include tribal deities, animals, and everyday objects, each carrying cultural significance.",
        careInstructions: [
            "Dust regularly with a soft, dry cloth",
            "Apply a thin coat of oil to maintain the finish",
            "Keep away from moisture to prevent oxidation",
            "Polish gently with brass cleaner if needed",
            "Handle with care as it may have delicate details",
            "Display away from direct sunlight for best preservation"
        ],
        artisan: {
            name: "Sukra Manjhi",
            avatar: "👨‍🎨",
            location: "Kondagaon, Chhattisgarh",
            experience: "30+ years",
            products: 175,
            rating: 4.9,
            sales: 430,
            bio: "Sukra Manjhi belongs to the Ghadwa tribal community, known for their exceptional Dhokra metal craft. With over 30 years of experience, he has mastered the ancient lost-wax technique passed down through his family for generations. His work has been exhibited nationally and internationally, earning recognition for preserving this ancient tribal art form. Each of his creations is a labor of love, taking days to complete.",
            specialization: "Dhokra Lost-Wax Casting, Tribal Metal Art"
        }
    }
};

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id')) || 1;
}

// Load product details when page loads
document.addEventListener('DOMContentLoaded', function() {
    const productId = getProductIdFromURL();
    loadProductDetails(productId);
    loadSimilarProducts(productId);
    updateCartCount();
});

// Load product details
function loadProductDetails(productId) {
    const product = productDetails[productId];
    
    if (!product) {
        alert('Product not found!');
        window.location.href = 'shop.html';
        return;
    }

    // Update page title
    document.getElementById('pageTitle').textContent = `${product.name} - KalaSetu`;
    
    // Update breadcrumb
    document.getElementById('breadcrumbCategory').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('breadcrumbProduct').textContent = product.name;

    // Update main image
    document.getElementById('mainImage').src = product.image;
    document.getElementById('mainImage').alt = product.name;

    // Update thumbnails
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = '';
    product.images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `${product.name} ${index + 1}`;
        thumb.className = index === 0 ? 'thumbnail active' : 'thumbnail';
        thumb.onclick = () => changeMainImage(img, thumb);
        thumbnailContainer.appendChild(thumb);
    });

    // Update product info
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productRegion').textContent = `📍 ${product.region}`;
    document.getElementById('productCategory').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('productPrice').textContent = `₹${product.price.toLocaleString()}`;
    document.getElementById('originalPrice').textContent = `₹${product.originalPrice.toLocaleString()}`;
    document.getElementById('discountBadge').textContent = `${product.discount}% OFF`;
    document.getElementById('productDescription').textContent = product.description;

    // Update specifications
    document.getElementById('productMaterials').textContent = product.materials;
    document.getElementById('productDimensions').textContent = product.dimensions;
    document.getElementById('productWeight').textContent = product.weight;
    document.getElementById('productArtForm').textContent = product.artForm;
    document.getElementById('deliveryTime').textContent = product.deliveryTime;

    // Update detailed description and tabs
    document.getElementById('detailedDescription').textContent = product.detailedDescription;
    document.getElementById('craftStory').textContent = product.craftStory;
    
    // Update care instructions
    const careList = document.getElementById('careInstructions');
    careList.innerHTML = '';
    product.careInstructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        careList.appendChild(li);
    });

    // Update artisan info
    document.getElementById('artisanAvatar').textContent = product.artisan.avatar;
    document.getElementById('artisanName').textContent = product.artisan.name;
    document.getElementById('artisanLocation').textContent = `📍 ${product.artisan.location}`;
    document.getElementById('artisanExperience').textContent = `Experience: ${product.artisan.experience}`;
    document.getElementById('artisanProducts').textContent = `${product.artisan.products}+`;
    document.getElementById('artisanRating').textContent = product.artisan.rating;
    document.getElementById('artisanSales').textContent = `${product.artisan.sales}+`;
    document.getElementById('artisanBio').textContent = product.artisan.bio;
    document.getElementById('artisanSpecialization').textContent = product.artisan.specialization;
}

// Change main image when thumbnail is clicked
function changeMainImage(imageSrc, thumbElement) {
    document.getElementById('mainImage').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbElement.classList.add('active');
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
function addToCartFromDetail() {
    const productId = getProductIdFromURL();
    const quantity = parseInt(document.getElementById('quantity').value);
    
    for (let i = 0; i < quantity; i++) {
        addToCart(productId);
    }
    
    showNotification(`✅ ${quantity} item(s) added to cart!`);
}

// Buy now function
function buyNow() {
    addToCartFromDetail();
    window.location.href = 'checkout.html';
}

// Add to wishlist
function addToWishlist() {
    const productId = getProductIdFromURL();
    const product = productDetails[productId];
    showNotification(`❤️ ${product.name} added to wishlist!`);
}

// View artisan profile
function viewArtisanProfile() {
    alert('Artisan profile page coming soon!');
}

// Tab switching
function switchTab(tabName) {
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// Load similar products
function loadSimilarProducts(currentProductId) {
    const currentProduct = productDetails[currentProductId];
    const similarProductsContainer = document.getElementById('similarProducts');
    
    // Get products from same category
    const similarProducts = Object.values(productDetails).filter(p => 
        p.category === currentProduct.category && p.id !== currentProductId
    ).slice(0, 4);
    
    // If not enough products in same category, add random products
    if (similarProducts.length < 4) {
        const remainingProducts = Object.values(productDetails).filter(p => 
            p.id !== currentProductId && !similarProducts.includes(p)
        ).slice(0, 4 - similarProducts.length);
        similarProducts.push(...remainingProducts);
    }
    
    // Display similar products
    similarProductsContainer.innerHTML = '';
    similarProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.onclick = () => window.location.href = `product-detail.html?id=${product.id}`;
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img">
                <span class="product-badge">Featured</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-region">📍 ${product.region}</p>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
                <div class="product-actions">
                    <button class="btn-small btn-cart" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-small btn-view">View</button>
                </div>
            </div>
        `;
        similarProductsContainer.appendChild(productCard);
    });
}