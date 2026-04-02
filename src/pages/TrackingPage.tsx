import { useState } from 'react';
import { Search, Package, MapPin, CheckCircle, Clock, Truck, Home } from 'lucide-react';
import { toast } from 'sonner';

interface TrackingStatus {
  status: string;
  location: string;
  timestamp: string;
  description: string;
  icon: typeof Package;
  completed: boolean;
}

interface ShipmentData {
  trackingNumber: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  status: string;
  history: TrackingStatus[];
}

const mockShipments: Record<string, ShipmentData> = {
  'BE123456': {
    trackingNumber: 'BE123456',
    origin: 'New York, USA',
    destination: 'Accra, Ghana',
    estimatedDelivery: '2024-03-20',
    status: 'In Transit',
    history: [
      { status: 'Package Received', location: 'New York, USA', timestamp: '2024-03-10 09:00', description: 'Package received at our facility', icon: Package, completed: true },
      { status: 'In Transit', location: 'JFK Airport', timestamp: '2024-03-11 14:30', description: 'Package departed from origin facility', icon: Truck, completed: true },
      { status: 'Arrived in Ghana', location: 'Kotoka International Airport', timestamp: '2024-03-13 08:00', description: 'Package arrived in destination country', icon: MapPin, completed: true },
      { status: 'Out for Delivery', location: 'Tema', timestamp: 'Pending', description: 'Package will be out for delivery soon', icon: Clock, completed: false },
      { status: 'Delivered', location: 'Accra', timestamp: 'Pending', description: 'Package will be delivered to recipient', icon: Home, completed: false }
    ]
  },
  'BE789012': {
    trackingNumber: 'BE789012',
    origin: 'Los Angeles, USA',
    destination: 'Tema, Ghana',
    estimatedDelivery: '2024-03-18',
    status: 'Delivered',
    history: [
      { status: 'Package Received', location: 'Los Angeles, USA', timestamp: '2024-03-05 10:00', description: 'Package received at our facility', icon: Package, completed: true },
      { status: 'In Transit', location: 'LAX Airport', timestamp: '2024-03-06 16:00', description: 'Package departed from origin facility', icon: Truck, completed: true },
      { status: 'Arrived in Ghana', location: 'Kotoka International Airport', timestamp: '2024-03-08 07:30', description: 'Package arrived in destination country', icon: MapPin, completed: true },
      { status: 'Out for Delivery', location: 'Tema', timestamp: '2024-03-09 09:00', description: 'Package out for delivery', icon: Clock, completed: true },
      { status: 'Delivered', location: 'Tema', timestamp: '2024-03-09 14:00', description: 'Package delivered successfully', icon: CheckCircle, completed: true }
    ]
  }
};

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const found = mockShipments[trackingNumber.toUpperCase()];
      if (found) {
        setShipment(found);
        toast.success('Shipment found!');
      } else {
        setShipment(null);
        toast.error('Tracking number not found. Try BE123456 or BE789012');
      }
      setIsSearching(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#D8D8D0] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-4">
            Track Your Shipment
          </h1>
          <p className="text-[#3d5266]">
            Enter your tracking number to get real-time updates on your package
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-12">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter tracking number (e.g., BE123456)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border-0 shadow-sm focus:ring-2 focus:ring-[#1D2F42] text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-4 bg-[#1D2F42] text-white rounded-xl font-semibold hover:bg-[#0f1a25] transition-colors disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {/* Results */}
        {shipment && (
          <div className="max-w-4xl mx-auto">
            {/* Shipment Info */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 card-shadow mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-[#3d5266] mb-1">Tracking Number</p>
                  <p className="text-2xl font-black text-[#1D2F42]">{shipment.trackingNumber}</p>
                </div>
                <div className="px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full font-semibold">
                  {shipment.status}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-[#3d5266] mb-1">From</p>
                  <p className="font-semibold text-[#1D2F42]">{shipment.origin}</p>
                </div>
                <div>
                  <p className="text-sm text-[#3d5266] mb-1">To</p>
                  <p className="font-semibold text-[#1D2F42]">{shipment.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-[#3d5266] mb-1">Estimated Delivery</p>
                  <p className="font-semibold text-[#1D2F42]">{shipment.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 card-shadow">
              <h2 className="text-xl font-bold text-[#1D2F42] mb-6">Shipment History</h2>
              <div className="space-y-0">
                {shipment.history.map((event, index) => (
                  <div key={index} className="relative pl-10 pb-8 last:pb-0">
                    {/* Timeline Line */}
                    {index < shipment.history.length - 1 && (
                      <div className={`absolute left-[18px] top-10 w-0.5 h-full ${event.completed ? 'bg-[#1D2F42]' : 'bg-gray-200'}`} />
                    )}
                    
                    {/* Icon */}
                    <div className={`absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center ${
                      event.completed ? 'bg-[#1D2F42]' : 'bg-gray-200'
                    }`}>
                      <event.icon className={`w-5 h-5 ${event.completed ? 'text-white' : 'text-gray-400'}`} />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className={`font-semibold ${event.completed ? 'text-[#1D2F42]' : 'text-gray-400'}`}>
                          {event.status}
                        </h3>
                        <span className={`text-sm ${event.completed ? 'text-[#3d5266]' : 'text-gray-400'}`}>
                          {event.timestamp}
                        </span>
                      </div>
                      <p className={`text-sm ${event.completed ? 'text-[#3d5266]' : 'text-gray-400'}`}>
                        {event.location} • {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demo Info */}
        {!shipment && (
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white rounded-[24px] p-6 card-shadow">
              <p className="text-[#3d5266] mb-4">Try these demo tracking numbers:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setTrackingNumber('BE123456');
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  BE123456 (In Transit)
                </button>
                <button
                  onClick={() => {
                    setTrackingNumber('BE789012');
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  BE789012 (Delivered)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

