'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailProps {
  productId: string;
  onAddToCart: (product: any, quantity: number) => void;
  cartCount: number;
  onViewCart: () => void;
  onBackToList: () => void;
}

export function ProductDetail({ productId, onAddToCart, cartCount, onViewCart, onBackToList }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  // Products database
  const productsDatabase: { [key: string]: any } = {
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
    }
  };

  const product = productsDatabase[productId] || productsDatabase['organic-tomatoes'];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={onBackToList}
            className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            aria-label="Back to products"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
            <span className="text-sm font-medium text-foreground hidden sm:inline">Back</span>
          </button>
          <div className="text-xl font-semibold tracking-tight text-foreground">
            Supply Co.
          </div>
          <button
            onClick={onViewCart}
            className="relative inline-flex items-center justify-center rounded-lg p-2 hover:bg-secondary transition-colors"
            aria-label="View cart"
          >
            <ShoppingCart className="h-6 w-6 text-foreground" />
            {cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-secondary">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Category Badge */}
            <div>
              <span className="inline-block rounded-md bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-4">
                {product.category}
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-6">
                {product.unit}
              </p>
              <div className="mb-8">
                <div className="text-5xl font-semibold text-accent">
                  ${product.price}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-foreground/80 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Key Details */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {product.details.map((detail:any, index:number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg bg-secondary p-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {key}
                  </p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* Add to Cart Section */}
            <div className="flex gap-4 flex-row sm:items-center">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-white p-2">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="rounded p-1 hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4 text-foreground" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-12 text-center font-semibold text-foreground bg-transparent border-0 outline-none"
                  min="1"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="rounded p-1 hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4 text-foreground" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 gap-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base h-12 sm:flex-initial sm:px-8"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Info Text */}
            <p className="text-xs text-muted-foreground mt-4">
              Order by 2 PM for next-business-day delivery. Minimum order: 1 case.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
