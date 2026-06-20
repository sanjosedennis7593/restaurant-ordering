'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Search, ChevronDown, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getAllProducts, Product } from '@/lib/products';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');

  const products = getAllProducts();

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [searchQuery, sortBy]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};
    
    filteredAndSortedProducts.forEach((product) => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });

    return groups;
  }, [filteredAndSortedProducts]);

  // Get bestsellers
  const bestsellers = useMemo(() => {
    return filteredAndSortedProducts.filter((p) => p.bestseller);
  }, [filteredAndSortedProducts]);

  // Category order
  const categoryOrder = ['Herbs', 'Produce', 'Dairy & Eggs', 'Cheese & Dairy', 'Oils & Vinegars'];
  const sortedCategories = categoryOrder.filter((cat) => groupedProducts[cat]);

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

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price-low' | 'price-high')}
              className="appearance-none px-4 py-2 pr-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Best Sellers Section */}
        {bestsellers.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <div className="inline-block">
                <h3 className="text-2xl font-semibold text-foreground mb-1">⭐ Best Sellers</h3>
                <div className="h-1 w-24 bg-accent rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bestsellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addingToCart={addingToCart}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={handleQuickAdd}
                  isBestseller={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Categorized Sections */}
        {sortedCategories.map((category) => (
          <div key={category} className="mb-12">
            <div className="mb-6">
              <div className="inline-block">
                <h3 className="text-2xl font-semibold text-foreground mb-1">{category}</h3>
                <div className="h-1 w-16 bg-accent rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupedProducts[category].map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addingToCart={addingToCart}
                  onSelectProduct={onSelectProduct}
                  onQuickAdd={handleQuickAdd}
                />
              ))}
            </div>
          </div>
        ))}

        {/* No Results */}
        {Object.keys(groupedProducts).length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your search.</p>
          </div>
        )}
      </main>

      {/* Product Card Component */}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  addingToCart: string | null;
  onSelectProduct: (productId: string) => void;
  onQuickAdd: (e: React.MouseEvent, product: Product) => void;
  isBestseller?: boolean;
}

function ProductCard({
  product,
  addingToCart,
  onSelectProduct,
  onQuickAdd,
  isBestseller,
}: ProductCardProps) {
  return (
    <div
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
        <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
          {isBestseller && (
            <span className="inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs font-bold text-yellow-800">
              ⭐ Bestseller
            </span>
          )}
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
        <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>

        {/* Stock Status */}
        <div className="mb-3">
          {product.stock === 0 ? (
            <div className="flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 text-destructive" />
              <span className="text-xs font-medium text-destructive">Out of Stock</span>
            </div>
          ) : product.stock < 5 ? (
            <span className="text-xs font-medium text-amber-600">
              Only {product.stock} left
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">
              {product.stock} in stock
            </span>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={(e) => onQuickAdd(e, product)}
            disabled={addingToCart === product.id || product.stock === 0}
            className={`flex-shrink-0 rounded-lg p-2 transition-all ${
              addingToCart === product.id
                ? 'bg-green-100 text-green-700'
                : product.stock === 0
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-accent text-accent-foreground hover:bg-accent/90'
            }`}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
