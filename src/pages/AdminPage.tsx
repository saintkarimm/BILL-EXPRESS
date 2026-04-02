import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Users, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Product } from '@/types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Smartphone',
    description: 'Latest flagship smartphone with advanced camera system',
    price: 4500,
    category: 'Phones',
    image: '/images/product_phone.jpg',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Pro Laptop',
    description: 'High-performance laptop for professionals',
    price: 8500,
    category: 'Laptops',
    image: '/images/product_laptop.jpg',
    stock: 8,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Premium noise-cancelling earbuds',
    price: 800,
    category: 'Accessories',
    image: '/images/product_earbuds.jpg',
    stock: 25,
    rating: 4.7
  }
];

export default function AdminPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const { orders } = useCart();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'shipments'>('dashboard');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'Phones',
    stock: 0
  });

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      id: `product-${Date.now()}`,
      name: newProduct.name,
      description: newProduct.description || '',
      price: Number(newProduct.price),
      category: newProduct.category || 'Phones',
      image: '/images/product_phone.jpg',
      stock: Number(newProduct.stock) || 0,
      rating: 0
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', description: '', price: 0, category: 'Phones', stock: 0 });
    setIsAddDialogOpen(false);
    toast.success('Product added successfully!');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    setProducts(products.map(p => 
      p.id === editingProduct.id 
        ? { ...p, ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock) }
        : p
    ));
    setEditingProduct(null);
    setNewProduct({ name: '', description: '', price: 0, category: 'Phones', stock: 0 });
    setIsAddDialogOpen(false);
    toast.success('Product updated successfully!');
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully!');
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;

  return (
    <main className="min-h-screen bg-[#D8D8D0] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#1D2F42] mb-1">
              Admin Dashboard
            </h1>
            <p className="text-[#3d5266]">Manage products, orders, and shipments</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'shipments', label: 'Shipments', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1D2F42] text-white'
                  : 'bg-white text-[#1D2F42] hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 bg-[#1D2F42]/10 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#1D2F42]" />
              </div>
              <p className="text-3xl font-black text-[#1D2F42]">GH₵ {totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-[#3d5266]">Total Revenue</p>
            </div>
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-3xl font-black text-[#1D2F42]">{totalOrders}</p>
              <p className="text-sm text-[#3d5266]">Total Orders</p>
            </div>
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-3xl font-black text-[#1D2F42]">{totalProducts}</p>
              <p className="text-sm text-[#3d5266]">Products</p>
            </div>
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-3xl font-black text-[#1D2F42]">150</p>
              <p className="text-sm text-[#3d5266]">Customers</p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-[24px] p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#1D2F42]">Products</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setNewProduct({ name: '', description: '', price: 0, category: 'Phones', stock: 0 });
                    }}
                    className="flex items-center gap-2 px-5 py-3 bg-[#1D2F42] text-white rounded-xl font-medium hover:bg-[#0f1a25] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Product
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Product Name</label>
                      <input
                        type="text"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#1D2F42]"
                        placeholder="Enter product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#1D2F42]"
                        placeholder="Enter description"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Price (GH₵)</label>
                        <input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#1D2F42]"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Stock</label>
                        <input
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                          className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#1D2F42]"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#1D2F42]"
                      >
                        <option value="Phones">Phones</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Tablets">Tablets</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>
                    <button
                      onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                      className="w-full py-3 bg-[#1D2F42] text-white rounded-xl font-semibold hover:bg-[#0f1a25] transition-colors"
                    >
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-[#1D2F42]">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1D2F42]">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1D2F42]">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1D2F42]">Stock</th>
                    <th className="text-right py-3 px-4 font-semibold text-[#1D2F42]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="font-medium text-[#1D2F42]">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#3d5266]">{product.category}</td>
                      <td className="py-4 px-4 font-semibold text-[#1D2F42]">
                        GH₵ {product.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-[#3d5266]">{product.stock}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-[24px] p-6 card-shadow">
            <h2 className="text-xl font-bold text-[#1D2F42] mb-6">Recent Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold text-[#1D2F42]">Order #{order.id.slice(-6)}</p>
                      <p className="text-sm text-[#3d5266]">
                        {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-[#1D2F42]">GH₵ {order.total.toLocaleString()}</p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        order.status === 'delivered'
                          ? 'bg-green-100 text-green-600'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#3d5266] py-10">No orders yet</p>
            )}
          </div>
        )}

        {/* Shipments Tab */}
        {activeTab === 'shipments' && (
          <div className="bg-white rounded-[24px] p-6 card-shadow">
            <h2 className="text-xl font-bold text-[#1D2F42] mb-6">Active Shipments</h2>
            <div className="space-y-4">
              {[
                { id: 'BE123456', from: 'New York, USA', to: 'Accra, Ghana', status: 'In Transit', date: '2024-03-20' },
                { id: 'BE789012', from: 'Los Angeles, USA', to: 'Tema, Ghana', status: 'Delivered', date: '2024-03-09' },
                { id: 'BE345678', from: 'Miami, USA', to: 'Kumasi, Ghana', status: 'In Transit', date: '2024-03-22' }
              ].map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex flex-wrap items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-[#1D2F42]">{shipment.id}</p>
                    <p className="text-sm text-[#3d5266]">{shipment.from} → {shipment.to}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm text-[#3d5266]">{shipment.date}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      shipment.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {shipment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

