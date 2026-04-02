import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Star, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Smartphone',
    description: 'Latest flagship smartphone with advanced camera system and all-day battery life.',
    price: 4500,
    category: 'Phones',
    image: '/images/product_phone.jpg',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Pro Laptop',
    description: 'High-performance laptop for professionals with stunning display and powerful processor.',
    price: 8500,
    category: 'Laptops',
    image: '/images/product_laptop.jpg',
    stock: 8,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Premium noise-cancelling earbuds with crystal clear sound and long battery life.',
    price: 800,
    category: 'Accessories',
    image: '/images/product_earbuds.jpg',
    stock: 25,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking and health monitoring with elegant design.',
    price: 1200,
    category: 'Accessories',
    image: '/images/product_watch.jpg',
    stock: 20,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with powerful bass and waterproof design.',
    price: 600,
    category: 'Accessories',
    image: '/images/product_speaker.jpg',
    stock: 30,
    rating: 4.5
  },
  {
    id: '6',
    name: 'Tablet Pro',
    description: 'Versatile tablet perfect for work and entertainment with stunning display.',
    price: 3200,
    category: 'Tablets',
    image: '/images/product_tablet.jpg',
    stock: 12,
    rating: 4.8
  }
];

const categories = ['All', 'Phones', 'Laptops', 'Tablets', 'Accessories'];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart, getCartCount } = useCart();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.product-card');
      
      if (cards) {
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [filteredProducts]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <main className="min-h-screen bg-[#D8D8D0] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-2">
              Electronics Shop
            </h1>
            <p className="text-[#3d5266]">
              Browse our selection of quality gadgets and electronics
            </p>
          </div>
          
          {/* Cart Badge */}
          <Link
            to="/cart"
            className="flex items-center gap-2 px-5 py-3 bg-white rounded-xl card-shadow w-fit hover:shadow-md transition-shadow"
          >
            <ShoppingCart className="w-5 h-5 text-[#1D2F42]" />
            <span className="font-semibold text-[#1D2F42]">{getCartCount()} items</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-[#1D2F42]"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#1D2F42] text-white'
                    : 'bg-white text-[#1D2F42] hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card bg-white rounded-[24px] overflow-hidden card-shadow card-border group hover:translate-y-[-4px] transition-all"
              >
                {/* Image */}
                <Link to={`/shop/${product.id}`} className="block relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1D2F42] text-white text-xs font-semibold rounded-full">
                    {product.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <Link to={`/shop/${product.id}`}>
                    <h3 className="font-bold text-[#1D2F42] mb-2 hover:text-[#1D2F42] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-[#3d5266] mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-[#3d5266] ml-1">({product.rating})</span>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-black text-[#1D2F42]">
                        GH₵ {product.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-[#3d5266]">{product.stock} in stock</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-12 h-12 bg-[#1D2F42] text-white rounded-xl flex items-center justify-center hover:bg-[#1D2F42] transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-[#3d5266]">No products found</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-3 bg-[#1D2F42] text-white rounded-xl font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

