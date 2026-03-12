import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Package, ShoppingBag, MapPin, User, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

const mockShipments = [
  {
    id: 'BE123456',
    status: 'In Transit',
    origin: 'New York, USA',
    destination: 'Accra, Ghana',
    estimatedDelivery: '2024-03-20'
  },
  {
    id: 'BE789012',
    status: 'Delivered',
    origin: 'Los Angeles, USA',
    destination: 'Tema, Ghana',
    estimatedDelivery: '2024-03-09'
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getUserOrders } = useCart();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  const userOrders = getUserOrders(user.id);

  return (
    <main className="min-h-screen bg-[#F6F6F6] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#111111] mb-1">
              Welcome, {user.name}!
            </h1>
            <p className="text-[#6F6F6F]">Manage your shipments and orders</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-white text-[#D7263D] rounded-xl font-medium hover:bg-red-50 transition-colors w-fit"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-[#D7263D]" />
            </div>
            <p className="text-3xl font-black text-[#111111]">2</p>
            <p className="text-sm text-[#6F6F6F]">Active Shipments</p>
          </div>
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-3xl font-black text-[#111111]">{userOrders.length}</p>
            <p className="text-sm text-[#6F6F6F]">Total Orders</p>
          </div>
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-3xl font-black text-[#111111]">1</p>
            <p className="text-sm text-[#6F6F6F]">Delivered</p>
          </div>
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-purple-500" />
            </div>
            <p className="text-3xl font-black text-[#111111]">Member</p>
            <p className="text-sm text-[#6F6F6F]">Since 2024</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Shipments */}
          <div className="bg-white rounded-[24px] p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#111111]">Recent Shipments</h2>
              <Link
                to="/tracking"
                className="flex items-center gap-1 text-[#D7263D] text-sm font-medium hover:underline"
              >
                Track All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {mockShipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-semibold text-[#111111]">{shipment.id}</p>
                    <p className="text-sm text-[#6F6F6F]">
                      {shipment.origin} → {shipment.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      shipment.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {shipment.status}
                    </span>
                    <p className="text-xs text-[#6F6F6F] mt-1">{shipment.estimatedDelivery}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-[24px] p-6 card-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#111111]">Recent Orders</h2>
              <Link
                to="/shop"
                className="flex items-center gap-1 text-[#D7263D] text-sm font-medium hover:underline"
              >
                Shop More
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {userOrders.length > 0 ? (
              <div className="space-y-4">
                {userOrders.slice(0, 3).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold text-[#111111]">Order #{order.id.slice(-6)}</p>
                      <p className="text-sm text-[#6F6F6F]">
                        {order.items.length} items • GH₵ {order.total.toLocaleString()}
                      </p>
                    </div>
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
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-[#6F6F6F] mb-4">No orders yet</p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#D7263D] text-white rounded-xl font-medium"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-8 bg-white rounded-[24px] p-6 card-shadow">
          <h2 className="text-xl font-bold text-[#111111] mb-6">Profile Information</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-[#6F6F6F] mb-1">Full Name</p>
              <p className="font-semibold text-[#111111]">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#6F6F6F] mb-1">Email</p>
              <p className="font-semibold text-[#111111]">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#6F6F6F] mb-1">Phone</p>
              <p className="font-semibold text-[#111111]">{user.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-[#6F6F6F] mb-1">Address</p>
              <p className="font-semibold text-[#111111]">{user.address || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
