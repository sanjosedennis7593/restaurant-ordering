'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  description: string;
  image: string;
}

interface ProductListProps {
  onSelectProduct: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  cartCount: number;
  onViewCart: () => void;
}

export function ProductList({
  onSelectProduct,
  onAddToCart,
  cartCount,
  onViewCart,
}: ProductListProps) {
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  // Sample products data
  const products: Product[] = [
    {
      id: 'organic-tomatoes',
      name: 'Organic Roma Tomatoes',
      price: 24.99,
      unit: 'per case (25 lbs)',
      category: 'Produce',
      description: 'Fresh, vine-ripened organic roma tomatoes sourced from certified local farms.',
      image: 'https://buybc.gov.bc.ca/app/uploads/sites/386/2024/03/Tomatoes_190495029.png',
    },
    {
      id: 'fresh-basil',
      name: 'Fresh Organic Basil',
      price: 12.50,
      unit: 'per bunch (6 oz)',
      category: 'Herbs',
      description: 'Vibrant, aromatic organic basil with rich flavor. Perfect for Italian dishes and fresh preparations.',
      image: 'https://pindotlang.com/cdn/shop/products/FreshBasil_a383616c-b552-41d5-8267-261b25abfb83.jpg?v=1610704350&width=3840',
    },
    {
      id: 'wild-mushrooms',
      name: 'Wild Mushroom Mix',
      price: 28.50,
      unit: 'per case (5 lbs)',
      category: 'Produce',
      description: 'Assorted gourmet wild mushrooms including shiitake, oyster, and cremini varieties.',
      image: 'https://thumbs.dreamstime.com/b/freshly-foraged-wild-mushrooms-white-plate-close-up-raw-brown-fungi-scaly-caps-mycology-natural-food-top-down-412442689.jpg?w=576',
    },
    {
      id: 'free-range-eggs',
      name: 'Free-Range Eggs',
      price: 18.99,
      unit: 'per case (30 count)',
      category: 'Dairy & Eggs',
      description: 'Grade A free-range eggs from pasture-raised hens. Rich, vibrant yolks.',
      image: 'https://cdn.qvm.com.au/wp-content/uploads/2023/04/Eggceptional_850g-600x600.png',
    },
    {
      id: 'aged-parmesan',
      name: 'Aged Parmesan',
      price: 42.00,
      unit: 'per block (2 lbs)',
      category: 'Cheese & Dairy',
      description: '24-month aged Parmigiano-Reggiano with complex nutty flavors and perfect crumble texture.',
      image: 'https://www.tastebologna.net/uploads/2/1/6/4/21643804/_900xAUTO_crop_top-center_90_none_ns/879/parmigiano-reggiano-cheese_orig.webp',
    },
    {
      id: 'olive-oil',
      name: 'Extra Virgin Olive Oil',
      price: 34.99,
      unit: 'per bottle (750ml)',
      category: 'Oils & Vinegars',
      description: 'Premium cold-pressed extra virgin olive oil from Sicily. First press harvest.',
      image: 'https://shop.bench.com.ph/cdn/shop/files/CPQ3110A_FL_F_ZA_2048x2048.jpg?v=1750140067',
    },
    {
      id: 'garlic-heads',
      name: 'Organic Garlic Heads',
      price: 16.50,
      unit: 'per case (10 lbs)',
      category: 'Produce',
      description: 'Plump, aromatic organic garlic with excellent storage life and deep flavor.',
      image: 'https://keeneorganics.com/wp-content/uploads/2019/06/amish-rocambole-organic-planting-garlic-bulbs-with-cloves-keene-garlic.jpg',
    }
  ];

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    setAddingToCart(product.id);
    onAddToCart(product, 1);
    setTimeout(() => setAddingToCart(null), 800);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Supply Co.</h1>
            <p className="text-sm text-muted-foreground">Premium Food Supply Distributor</p>
          </div>
          <button
            onClick={onViewCart}
            className="relative rounded-lg bg-accent px-4 py-2 text-accent-foreground hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            <span className="font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-foreground mb-2">Fresh Supplies</h2>
          <p className="text-muted-foreground">Browse our selection of premium ingredients and supplies</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-accent/50 cursor-pointer"
              onClick={() => onSelectProduct(product.id)}
            >
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Unit Info */}
                <p className="text-xs text-muted-foreground mb-3">{product.unit}</p>

                {/* Price and Action */}
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={(e) => handleQuickAdd(e, product)}
                    disabled={addingToCart === product.id}
                    className={`flex-shrink-0 rounded-lg p-2 transition-all ${
                      addingToCart === product.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-accent text-accent-foreground hover:bg-accent/90'
                    }`}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
