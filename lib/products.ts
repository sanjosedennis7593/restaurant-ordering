export interface Product {
    id: string;
    name: string;
    price: number;
    unit: string;
    category: string;
    description: string;
    image: string;
    stock: number;
    details?: string[];
    specifications?: { [key: string]: string };
    bestseller?: boolean;
}

export const productsDatabase: { [key: string]: Product } = {
    'organic-tomatoes': {
        id: 'organic-tomatoes',
        name: 'Organic Roma Tomatoes',
        price: 24.99,
        unit: 'per case (25 lbs)',
        category: 'Produce',
        description: 'Fresh, vine-ripened organic roma tomatoes sourced from certified local farms. Perfect for sauces, soups, and fresh preparations.',
        details: [
            'Certified organic, no pesticides',
            'Vine-ripened for maximum flavor',
            'Consistent sizing and quality',
            'Ships within 24 hours of harvest',
            'Typical shelf life: 5-7 days when refrigerated',
        ],
        specifications: {
            'Origin': 'California',
            'Certification': 'USDA Organic',
            'Packaging': 'Returnable wooden crate',
            'Minimum Order': '1 case',
            'Delivery Window': 'Next business day',
        },
        image: 'https://buybc.gov.bc.ca/app/uploads/sites/386/2024/03/Tomatoes_190495029.png',
        stock: 24,
        bestseller: true,
    },
    'fresh-basil': {
        id: 'fresh-basil',
        name: 'Fresh Organic Basil',
        price: 12.50,
        unit: 'per bunch (6 oz)',
        category: 'Herbs',
        description: 'Vibrant, aromatic organic basil with rich flavor. Perfect for Italian dishes and fresh preparations.',
        details: [
            'Organic, pesticide-free',
            'Hand-harvested at peak flavor',
            'Bright, aromatic leaves',
            'Ideal for fresh dishes and sauces',
            'Shelf life: 3-5 days refrigerated',
        ],
        specifications: {
            'Origin': 'California',
            'Certification': 'USDA Organic',
            'Packaging': 'Plastic-free box',
            'Minimum Order': '1 bunch',
            'Delivery Window': 'Next business day',
        },
        image: 'https://pindotlang.com/cdn/shop/products/FreshBasil_a383616c-b552-41d5-8267-261b25abfb83.jpg?v=1610704350&width=3840',
        stock: 0,
        bestseller: true,
    },
    'wild-mushrooms': {
        id: 'wild-mushrooms',
        name: 'Wild Mushroom Mix',
        price: 28.50,
        unit: 'per case (5 lbs)',
        category: 'Produce',
        description: 'Assorted gourmet wild mushrooms including shiitake, oyster, and cremini varieties.',
        details: [
            'Mix of shiitake, oyster, and cremini',
            'Sustainably foraged and farmed',
            'Premium grade and size',
            'Rich, complex umami flavor',
            'Shelf life: 5-7 days refrigerated',
        ],
        specifications: {
            'Origin': 'Pacific Northwest',
            'Certification': 'Sustainable',
            'Packaging': 'Ventilated case',
            'Minimum Order': '1 case',
            'Delivery Window': 'Next business day',
        },
        image: 'https://thumbs.dreamstime.com/b/freshly-foraged-wild-mushrooms-white-plate-close-up-raw-brown-fungi-scaly-caps-mycology-natural-food-top-down-412442689.jpg?w=576',
        stock: 8,
    },
    'free-range-eggs': {
        id: 'free-range-eggs',
        name: 'Free-Range Eggs',
        price: 18.99,
        unit: 'per case (30 count)',
        category: 'Dairy & Eggs',
        description: 'Grade A free-range eggs from pasture-raised hens. Rich, vibrant yolks.',
        details: [
            'Grade A premium quality',
            'Pasture-raised hens',
            'Rich, golden yolks',
            'No antibiotics or added hormones',
            'Fresh eggs: collected within 48 hours',
        ],
        specifications: {
            'Origin': 'Northern California',
            'Certification': 'Free-Range Certified',
            'Packaging': 'Recyclable cardboard',
            'Minimum Order': '1 case',
            'Delivery Window': 'Next business day',
        },
        image: 'https://cdn.qvm.com.au/wp-content/uploads/2023/04/Eggceptional_850g-600x600.png',
        stock: 45,
        bestseller: true,
    },
    'aged-parmesan': {
        id: 'aged-parmesan',
        name: 'Aged Parmesan',
        price: 42.00,
        unit: 'per block (2 lbs)',
        category: 'Cheese & Dairy',
        description: '24-month aged Parmigiano-Reggiano with complex nutty flavors and perfect crumble texture.',
        details: [
            '24-month aged Parmigiano-Reggiano',
            'PDO protected origin',
            'Complex nutty and caramel notes',
            'Perfect for grating and plating',
            'Vacuum-sealed for freshness',
        ],
        specifications: {
            'Origin': 'Reggio Emilia, Italy',
            'Certification': 'PDO Protected',
            'Packaging': 'Vacuum-sealed block',
            'Minimum Order': '1 block',
            'Delivery Window': 'Next business day',
        },
        image: 'https://www.tastebologna.net/uploads/2/1/6/4/21643804/_900xAUTO_crop_top-center_90_none_ns/879/parmigiano-reggiano-cheese_orig.webp',
        stock: 12,
    },
    'olive-oil': {
        id: 'olive-oil',
        name: 'Extra Virgin Olive Oil',
        price: 34.99,
        unit: 'per bottle (750ml)',
        category: 'Oils & Vinegars',
        description: 'Premium cold-pressed extra virgin olive oil from Sicily. First press harvest.',
        details: [
            'Cold-pressed first extraction',
            'Early harvest olives',
            'Fresh, peppery finish',
            'PDO Sicily protected origin',
            'Best used for finishing dishes',
        ],
        specifications: {
            'Origin': 'Sicily, Italy',
            'Certification': 'PDO Protected',
            'Packaging': 'Dark glass bottle',
            'Minimum Order': '1 bottle',
            'Delivery Window': 'Next business day',
        },
        image: 'https://shop.bench.com.ph/cdn/shop/files/CPQ3110A_FL_F_ZA_2048x2048.jpg?v=1750140067',
        stock: 18,
    },
    'garlic-heads': {
        id: 'garlic-heads',
        name: 'Organic Garlic Heads',
        price: 16.50,
        unit: 'per case (10 lbs)',
        category: 'Produce',
        description: 'Plump, aromatic organic garlic with excellent storage life and deep flavor.',
        details: [
            'Certified organic',
            'Hand-harvested and air-dried',
            'Excellent storage life',
            'Deep, complex flavor',
            'Shelf life: 2-3 months in cool storage',
        ],
        specifications: {
            'Origin': 'California',
            'Certification': 'USDA Organic',
            'Packaging': 'Ventilated mesh bag',
            'Minimum Order': '1 case',
            'Delivery Window': 'Next business day',
        },
        image: 'https://keeneorganics.com/wp-content/uploads/2019/06/amish-rocambole-organic-planting-garlic-bulbs-with-cloves-keene-garlic.jpg',
        stock: 32,
    },
};

export function getAllProducts(): Product[] {
    return Object.values(productsDatabase);
}

export function getProductsByCategory(category: string): Product[] {
    return Object.values(productsDatabase).filter((p) => p.category === category);
}

export function getRelatedProducts(excludeIds: string[]): Product[] {
    return Object.values(productsDatabase).filter((p) => !excludeIds.includes(p.id));
}
