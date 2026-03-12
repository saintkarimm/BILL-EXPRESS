import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import type { Product } from '@/types';

const products: Product[] = [
  {
    id: '1',
    name: 'Premium Smartphone',
    description: 'Latest flagship smartphone with advanced camera system and all-day battery life. Features a stunning OLED display, 5G connectivity, and professional-grade cameras for capturing every moment.',
    price: 4500,
    category: 'Phones',
    image: '/images/product_phone.jpg',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Pro Laptop',
    description: 'High-performance laptop for professionals with stunning display and powerful processor. Perfect for creative work, programming, and business tasks.',
    price: 8500,
    category: 'Laptops',
    image: '/images/product_laptop.jpg',
    stock: 8,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Premium noise-cancelling earbuds with crystal clear sound and long battery life. Perfect for music, calls, and workouts.',
    price: 800,
    category: 'Accessories',
    image: '/images/product_earbuds.jpg',
    stock: 25,
    rating: 4.7
  },
  {
    id: '4',
    name: 'Smart Watch',
    description: 'Advanced fitness tracking and health monitoring with elegant design. Track your workouts, heart rate, sleep, and more.',
    price: 1200,
    category: 'Accessories',
    image: '/images/product_watch.jpg',
    stock: 20,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with powerful bass and waterproof design. Take your music anywhere with up to 20 hours of battery life.',
    price: 600,
    category: 'Accessories',
    image: '/images/product_speaker.jpg',
    stock: 30,
    rating: 4.5
  },
  {
    id: '6',
    name: 'Tablet Pro',
    description: 'Versatile tablet perfect for work and entertainment with stunning display. Includes stylus support and keyboard compatibility.',
    price: 3200,
    category: 'Tablets',
    image: '/images/product_tablet.jpg',
    stock: 12,
    rating: 4.8
  }
];

const features = [
  { icon: Truck, title: 'Free Delivery', desc: 'On orders over GH₵ 1000' },
  { icon: Shield, title: '1 Year Warranty', desc: 'Full coverage included' },
  { icon: RefreshCw, title: '30-Day Returns', desc: 'Easy return policy' }
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  useEffect(() => {
    const cartItem = cartItems.find(item => item.product.id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItems, id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#F6F6F6] pt-24 pb-16 flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F6F6F6] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6F6F6F] hover:text-[#111111] transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shop
        </button>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Image */}
          <div className="bg-white rounded-[28px] overflow-hidden card-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#D7263D]/10 text-[#D7263D] text-sm font-semibold rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#111111] mb-4">
              {product.name}
            </h1>

            <p className="text-lg text-[#6F6F6F] mb-6 leading-relaxed">
              {product.description}
            </p>

            <p className="text-4xl font-black text-[#D7263D] mb-8">
              GH₵ {product.price.toLocaleString()}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[#111111] font-medium">Quantity:</span>
              <div className="flex items-center gap-3 bg-white rounded-xl p-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-[#6F6F6F]">{product.stock} available</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-8 py-4 bg-[#D7263D] text-white rounded-xl font-semibold hover:bg-[#b51d32] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <Link
                to="/shop"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#111111] text-white rounded-xl font-semibold hover:bg-[#333333] transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl">
                  <feature.icon className="w-5 h-5 text-[#D7263D] flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-sm text-[#111111]">{feature.title}</p>
                    <p className="text-xs text-[#6F6F6F]">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  to={`/shop/${related.id}`}
                  className="bg-white rounded-[24px] overflow-hidden card-shadow card-border hover:translate-y-[-4px] transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#111111] mb-2">{related.name}</h3>
                    <p className="text-[#D7263D] font-black">GH₵ {related.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
