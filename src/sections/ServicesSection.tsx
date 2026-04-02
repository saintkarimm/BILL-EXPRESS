import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Package, Ship, Plane, Truck, Warehouse } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'freight',
    icon: Plane,
    title: 'Freight Forwarding',
    description: 'Efficient international logistics solutions with air, ocean, and road freight options.',
    image: '/images/service_air.jpg',
    link: '/contact',
    color: 'bg-[#1D2F42]'
  },
  {
    id: 'customs',
    icon: Package,
    title: 'Customs Brokerage',
    description: 'Expert customs clearance services to ensure smooth import and export operations.',
    image: '/images/service_warehousing.jpg',
    link: '/contact',
    color: 'bg-orange-500'
  },
  {
    id: 'warehousing',
    icon: Warehouse,
    title: 'Warehousing & Distribution',
    description: 'Secure storage solutions and efficient distribution networks for your goods.',
    image: '/images/why_warehouse.jpg',
    link: '/contact',
    color: 'bg-blue-500'
  },
  {
    id: 'supply-chain',
    icon: Smartphone,
    title: 'Supply Chain Optimization',
    description: 'Streamline your supply chain with our expert consulting and management services.',
    image: '/images/service_transport.jpg',
    link: '/contact',
    color: 'bg-purple-500'
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      
      if (cards) {
        gsap.fromTo(cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 lg:py-32 bg-[#D8D8D0]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-text text-[#1D2F42] mb-4 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2F42] mb-4">
            HAYYU GOLDCOAST BEST SERVICES
          </h2>
          <p className="text-[#3d5266] text-lg">
            Comprehensive logistics solutions tailored to meet your shipping and business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-card group bg-white rounded-[28px] overflow-hidden card-shadow card-border hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className={`absolute top-4 left-4 w-12 h-12 ${service.color} rounded-xl flex items-center justify-center`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1D2F42] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#3d5266] mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[#1D2F42] font-semibold text-sm hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Warehouse, title: 'Local Warehousing', desc: 'Secure storage solutions' },
            { icon: Truck, title: 'Road Freight', desc: 'Ground transportation' },
            { icon: Plane, title: 'Air Freight', desc: 'Express delivery' },
            { icon: Ship, title: 'Ocean Freight', desc: 'Cost-effective shipping' }
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-white/50 rounded-2xl hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#1D2F42]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-[#1D2F42]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1D2F42] mb-1">{item.title}</h4>
                <p className="text-sm text-[#3d5266]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
