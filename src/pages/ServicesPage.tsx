import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Ship, 
  Truck, 
  Warehouse, 
  Package, 
  Globe, 
  FileCheck, 
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Shield,
  Zap
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mainServices = [
  {
    id: 'freight-forwarding',
    icon: Plane,
    title: 'Freight Forwarding',
    shortDesc: 'Efficient international logistics solutions with air, ocean, and road freight options.',
    fullDesc: 'Our comprehensive freight forwarding services connect your business to the world. Whether you need air freight for urgent deliveries, ocean freight for cost-effective bulk shipping, or road freight for regional distribution, we have the expertise and network to get your goods where they need to go.',
    features: [
      'Air, ocean, and road freight options',
      'Door-to-door delivery service',
      'Real-time shipment tracking',
      'Consolidation services',
      'Dangerous goods handling',
      'Temperature-controlled shipping'
    ],
    image: '/images/service_air.jpg',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'customs-brokerage',
    icon: FileCheck,
    title: 'Customs Brokerage',
    shortDesc: 'Expert customs clearance services to ensure smooth import and export operations.',
    fullDesc: 'Navigate the complexities of international trade with our expert customs brokerage services. We handle all documentation, compliance requirements, and regulatory procedures to ensure your shipments clear customs quickly and efficiently.',
    features: [
      'Import and export documentation',
      'Customs compliance consulting',
      'Duty and tax calculations',
      'HS code classification',
      'Permit and license assistance',
      'Regulatory compliance support'
    ],
    image: '/images/service_warehousing.jpg',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'warehousing',
    icon: Warehouse,
    title: 'Warehousing & Distribution',
    shortDesc: 'Secure storage solutions and efficient distribution networks for your goods.',
    fullDesc: 'Our state-of-the-art warehousing facilities in Lakeside Community provide secure storage for your inventory. Combined with our efficient distribution network, we ensure your products reach their destination on time, every time.',
    features: [
      'Climate-controlled storage',
      'Inventory management system',
      'Pick and pack services',
      'Cross-docking facilities',
      'Last-mile delivery',
      'Returns management'
    ],
    image: '/images/why_warehouse.jpg',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'supply-chain',
    icon: BarChart3,
    title: 'Supply Chain Optimization',
    shortDesc: 'Streamline your supply chain with our expert consulting and management services.',
    fullDesc: 'Transform your supply chain into a competitive advantage. Our consulting team analyzes your current operations and implements strategies to reduce costs, improve efficiency, and enhance visibility across your entire supply chain.',
    features: [
      'Supply chain analysis',
      'Process optimization',
      'Vendor management',
      'Demand forecasting',
      'Cost reduction strategies',
      'Performance analytics'
    ],
    image: '/images/service_transport.jpg',
    color: 'from-purple-500 to-purple-600'
  }
];

const additionalServices = [
  {
    icon: Globe,
    title: 'Import & Export Handling',
    description: 'End-to-end management of international trade operations'
  },
  {
    icon: Package,
    title: 'Global Trade Made Simple',
    description: 'Simplified solutions for complex international transactions'
  },
  {
    icon: Ship,
    title: 'Oil & Gas Logistics',
    description: 'Specialized logistics for energy sector requirements'
  },
  {
    icon: Truck,
    title: 'Bulk Vessel Clearance',
    description: 'Efficient handling of large-scale cargo operations'
  }
];

const transportModes = [
  {
    icon: Plane,
    title: 'Air Freight',
    description: 'Fast and reliable air cargo services for time-sensitive shipments',
    features: ['Express delivery', 'Global coverage', 'Door-to-door']
  },
  {
    icon: Ship,
    title: 'Ocean Freight',
    description: 'Cost-effective sea freight solutions for bulk and container shipments',
    features: ['FCL & LCL options', 'Worldwide ports', 'Competitive rates']
  },
  {
    icon: Truck,
    title: 'Road Freight',
    description: 'Comprehensive ground transportation across Ghana and West Africa',
    features: ['Full truckload', 'Partial loads', 'Cross-border']
  }
];

const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We discuss your logistics needs and develop a customized solution'
  },
  {
    number: '02',
    title: 'Planning',
    description: 'Our team creates a detailed logistics plan tailored to your requirements'
  },
  {
    number: '03',
    title: 'Execution',
    description: 'We handle all aspects of shipping, customs, and delivery'
  },
  {
    number: '04',
    title: 'Tracking',
    description: 'Real-time updates keep you informed throughout the journey'
  }
];

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(servicesRef.current?.querySelectorAll('.service-card') || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={sectionRef} className="min-h-screen bg-[#D8D8D0] pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-6">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1D2F42] mb-6 leading-tight">
              Comprehensive Logistics Solutions
            </h1>
            <p className="text-lg sm:text-xl text-[#3d5266] max-w-2xl mx-auto leading-relaxed">
              From freight forwarding to supply chain optimization, we provide 
              end-to-end logistics services tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section ref={servicesRef} className="py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {mainServices.map((service) => (
              <div 
                key={service.id}
                className="service-card bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-4 left-4 w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-[#1D2F42] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#3d5266] mb-6 leading-relaxed">
                    {service.fullDesc}
                  </p>
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#1D2F42] flex-shrink-0" />
                        <span className="text-sm text-[#3d5266]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-[#1D2F42] font-semibold hover:gap-3 transition-all"
                  >
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-4">
              Specialized Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42]">
              Additional Solutions
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-[#1D2F42]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#1D2F42] transition-colors">
                  <service.icon className="w-7 h-7 text-[#1D2F42] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#1D2F42] text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#3d5266]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transport Modes */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-4">
              How We Ship
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42]">
              Transport Modes
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {transportModes.map((mode, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all text-center"
              >
                <div className="w-20 h-20 bg-[#1D2F42] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <mode.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-[#1D2F42] text-xl mb-3">
                  {mode.title}
                </h3>
                <p className="text-[#3d5266] mb-6">
                  {mode.description}
                </p>
                <div className="space-y-2">
                  {mode.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 text-[#1D2F42]" />
                      <span className="text-sm text-[#3d5266]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42]">
              Our Process
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-white rounded-2xl p-6 shadow-sm"
              >
                <span className="text-5xl font-black text-[#1D2F42]/10">
                  {step.number}
                </span>
                <h3 className="font-bold text-[#1D2F42] text-lg mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#3d5266]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-[28px] overflow-hidden shadow-2xl">
                <img
                  src="/images/cta_truck.jpg"
                  alt="Our logistics fleet"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#1D2F42] text-white p-6 rounded-2xl shadow-xl hidden sm:block">
                <div className="flex items-center gap-4">
                  <Clock className="w-10 h-10" />
                  <div>
                    <p className="text-3xl font-black">24/7</p>
                    <p className="text-sm opacity-90">Support Available</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-6">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-6 leading-tight">
                Trusted by Businesses Across Ghana
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: 'Reliable & Secure',
                    desc: 'Your cargo is protected with comprehensive insurance and handled by trained professionals.'
                  },
                  {
                    icon: Clock,
                    title: 'On-Time Delivery',
                    desc: 'We understand the importance of deadlines and ensure your shipments arrive as promised.'
                  },
                  {
                    icon: Zap,
                    title: 'Competitive Pricing',
                    desc: 'Transparent pricing with no hidden fees. Get the best value for your logistics needs.'
                  },
                  {
                    icon: Globe,
                    title: 'Global Network',
                    desc: 'Access to 50+ countries through our extensive network of partners and carriers.'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1D2F42]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#1D2F42]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1D2F42] mb-1">{item.title}</h3>
                      <p className="text-[#3d5266] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-[#1D2F42]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Need a Custom Logistics Solution?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Every business is unique. Let us create a tailored logistics plan 
              that fits your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D2F42] rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:0257721337"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call 025 772 1337
              </a>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@hayyugoldcoast.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Fully Insured & Licensed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
