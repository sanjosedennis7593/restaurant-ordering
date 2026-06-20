'use client';

import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import { ArrowLeft, Minus, Plus, Trash2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getAllProducts } from '@/lib/products';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onAddToCart: (product: any, quantity: number) => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onProceedToCheckout,
  onAddToCart,
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Get related products (all products except those in cart)
  const relatedProducts = useMemo(() => {
    const allProducts = getAllProducts();
    const cartIds = items.map((item) => item.id);
    return allProducts.filter((p) => !cartIds.includes(p.id)).slice(0, 6);
  }, [items]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center justify-center rounded-lg p-2 hover:bg-secondary transition-colors"
              aria-label="Back to shopping"
            >
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Your Order
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        {items.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Add items to get started with your order
            </p>
            <Button
              onClick={onContinueShopping}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-border bg-white p-6 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-foreground">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.unit}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-base font-semibold text-accent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex flex-col items-end justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="rounded p-1 hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5 text-foreground" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded p-1 hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5 text-foreground" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="inline-flex items-center gap-1 rounded p-1 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Button
                onClick={onContinueShopping}
                variant="outline"
                className="mt-6 w-full border-border text-foreground hover:bg-secondary"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </div>



            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border border-border bg-white p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/80">Subtotal</span>
                    <span className="text-sm font-medium text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/80">Tax (8%)</span>
                    <span className="text-sm font-medium text-foreground">
                      ${tax.toFixed(2)}
                    </span>
                  </div>

                  {/* Delivery Note */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/80">Delivery</span>
                    <span className="text-xs font-medium text-accent">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6 flex justify-between items-center">
                  <span className="text-base font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={onProceedToCheckout}
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-lg h-12"
                >
                  Proceed to Checkout
                </Button>

                {/* Info */}
                <p className="mt-6 text-xs text-muted-foreground text-center leading-relaxed">
                  Order by 2 PM for next-business-day delivery. Questions? Contact support@supplyco.com
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-1 mt-20">
          {/* Related Products */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-white p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Add More Items</h3>
              <div className="space-y-3">
                {relatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-lg border border-border/50 hover:border-border/80 transition-all group"
                  >
                    <div className="flex gap-2.5 items-start justify-between">
                      <div className="flex gap-2.5 items-start flex-1 min-w-0">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-secondary">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground line-clamp-2">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            ${product.price.toFixed(2)}
                          </p>
                          {product.stock === 0 ? (
                            <div className="flex items-center gap-1 mt-1.5">
                              <AlertCircle className="h-3 w-3 text-destructive" />
                              <span className="text-xs font-medium text-destructive">Out of Stock</span>
                            </div>
                          ) : product.stock < 5 ? (
                            <span className="text-xs text-amber-600 font-medium mt-1.5 block">
                              Only {product.stock} left
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground mt-1.5 block">
                              {product.stock} in stock
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => onAddToCart(product, 1)}
                        disabled={product.stock === 0}
                        className="flex-shrink-0 ml-2 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors bg-accent text-accent-foreground hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
