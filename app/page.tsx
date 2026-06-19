'use client';

import { useState } from 'react';
import { ProductList } from '@/components/product-list';
import { ProductDetail } from '@/components/product-detail';
import { Cart } from '@/components/cart';
import { Checkout } from '@/components/checkout';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'list' | 'detail' | 'cart' | 'checkout'>('list');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleAddToCart = (product: any, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setCurrentPage('cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('detail');
  };

  const handleProceedToCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setCurrentPage('list');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="bg-background">
      {currentPage === 'list' && (
        <ProductList
          onSelectProduct={handleSelectProduct}
          onAddToCart={handleAddToCart}
          cartCount={cartCount}
          onViewCart={() => setCurrentPage('cart')}
        />
      )}
      {currentPage === 'detail' && selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onAddToCart={handleAddToCart}
          cartCount={cartCount}
          onViewCart={() => setCurrentPage('cart')}
          onBackToList={() => setCurrentPage('list')}
        />
      )}
      {currentPage === 'cart' && (
        <Cart
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onContinueShopping={() => setCurrentPage('list')}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}
      {currentPage === 'checkout' && (
        <Checkout
          items={cartItems}
          onBackToCart={() => setCurrentPage('cart')}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </main>
  );
}
