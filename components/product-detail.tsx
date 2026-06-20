'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, ArrowLeft, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { productsDatabase } from '@/lib/products';
import { wholeNumberFormatter } from '@/lib/utils';

interface ProductDetailProps {
  productId: string;
  onAddToCart: (product: any, quantity: number) => void;
  cartCount: number;
  onViewCart: () => void;
  onBackToList: () => void;
}

export function ProductDetail({ productId, onAddToCart, cartCount, onViewCart, onBackToList }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

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
                  {wholeNumberFormatter.format(product.price)}
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
                {product.details && product.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-8 grid grid-cols-2 gap-4 rounded-lg bg-secondary p-4">
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {key}
                  </p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>

            {/* Add to Cart Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
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
