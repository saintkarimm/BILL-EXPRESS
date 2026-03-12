import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Package, Ship, Plane, Truck, Warehouse } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'electronics',
    icon: Smartphone,
    title: 'Electronic Shop',
    description: 'Buy gadgets and electronics including phones, laptops, tablets, and accessories at competitive prices.',
    image: '/images/product_phone.jpg',
    link: '/shop',
    color: 'bg-purple-500'
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Packaging Supplies',
    description: 'Professional packaging materials and services to ensure your items are protected during transit.',
    image: '/images/service_warehousing.jpg',
    link: '/contact',
    color: 'bg-orange-500'
  },
  {
    id: 'cargo',
    icon: Ship,
    title: 'Cargo Shipping',
    description: 'Ship packages from USA to Ghana with our reliable cargo services. Safe and timely delivery guaranteed.',
    image: '/images/service_ocean.jpg',
    link: '/tracking',
    color: 'bg-blue-500'
  },
  {
    id: 'freight',
    icon: Plane,
    title: 'Freight Forwarding',
    description: 'Efficient international logistics solutions with air, ocean, and road freight options.',
    image: '/images/service_air.jpg',
    link: '/contact',
    color: 'bg-[#D7263D]'
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
      className="relative py-20 lg:py-32 bg-[#F6F6F6]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-text text-[#D7263D] mb-4 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] mb-4">
            BILL EXPRESS BEST SERVICES
          </h2>
          <p className="text-[#6F6F6F] text-lg">
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
                <h3 className="text-xl font-bold text-[#111111] mb-2">
                  {service.title}
                </h3>
                <p className="text-[#6F6F6F] mb-4 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[#D7263D] font-semibold text-sm hover:gap-3 transition-all"
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
              <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-[#D7263D]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#111111] mb-1">{item.title}</h4>
                <p className="text-sm text-[#6F6F6F]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
