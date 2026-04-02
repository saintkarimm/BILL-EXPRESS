import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Package, 
  Truck,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CartPage() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartCount,
    checkout 
  } = useCart();
  
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.info('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.info('Cart cleared');
    }
  };

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address');
      return;
    }

    setIsCheckingOut(true);
    try {
      const success = await checkout(shippingAddress);
      if (success) {
        toast.success('Order placed successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.025;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-[#D8D8D0] pt-24 pb-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShoppingCart className="w-12 h-12 text-[#1D2F42]" />
            </div>
            <h1 className="text-3xl font-black text-[#1D2F42] mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-[#3d5266] mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Browse our shop to find great products!
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1D2F42] text-white rounded-xl font-semibold hover:bg-[#0f1a25] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#D8D8D0] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-2">
              Shopping Cart
            </h1>
            <p className="text-[#3d5266]">
              {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#1D2F42] rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <button
              onClick={handleClearCart}
              className="inline-flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/shop/${item.product.id}`}
                    className="w-full sm:w-24 h-32 sm:h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <Link
                          to={`/shop/${item.product.id}`}
                          className="font-bold text-[#1D2F42] hover:text-[#3d5266] transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-[#3d5266] mt-1">
                          {item.product.category}
                        </p>
                        <p className="text-lg font-black text-[#1D2F42] mt-2">
                          GH₵ {item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-[#1D2F42]" />
                        </button>
                        <span className="w-12 text-center font-semibold text-[#1D2F42]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-[#1D2F42]" />
                        </button>
                      </div>
                      <p className="font-bold text-[#1D2F42]">
                        GH₵ {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 text-center">
                <Truck className="w-6 h-6 text-[#1D2F42] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#3d5266]">Fast Delivery</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <ShieldCheck className="w-6 h-6 text-[#1D2F42] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#3d5266]">Secure Payment</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <Package className="w-6 h-6 text-[#1D2F42] mx-auto mb-2" />
                <p className="text-xs font-medium text-[#3d5266]">Quality Guarantee</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-[#1D2F42] mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-[#3d5266]">
                  <span>Subtotal</span>
                  <span>GH₵ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[#3d5266]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `GH₵ ${shipping}`}</span>
                </div>
                <div className="flex items-center justify-between text-[#3d5266]">
                  <span>Tax (2.5%)</span>
                  <span>GH₵ {tax.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-[#3d5266]">
                    Free shipping on orders over GH₵ 500
                  </p>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1D2F42]">Total</span>
                    <span className="text-2xl font-black text-[#1D2F42]">
                      GH₵ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              {showCheckoutForm ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1D2F42] mb-2">
                      Shipping Address
                    </label>
                    <Input
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Enter your full address..."
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-[#1D2F42] hover:bg-[#0f1a25] text-white py-6 rounded-xl font-semibold"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Place Order
                      </span>
                    )}
                  </Button>
                  <button
                    onClick={() => setShowCheckoutForm(false)}
                    className="w-full py-3 text-[#3d5266] hover:text-[#1D2F42] font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowCheckoutForm(true)}
                  className="w-full bg-[#1D2F42] hover:bg-[#0f1a25] text-white py-6 rounded-xl font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </span>
                </Button>
              )}

              <p className="text-xs text-center text-[#3d5266] mt-4">
                By placing an order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
