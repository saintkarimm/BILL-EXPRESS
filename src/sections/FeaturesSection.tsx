import { useEffect, useRef } from 'react';
import { Shield, MapPin, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    title: 'Safe & Reliable Cargo Shipping',
    description: 'Secure international shipping services with full insurance coverage and professional handling.',
    color: 'bg-blue-500'
  },
  {
    icon: MapPin,
    title: 'Real-Time Shipment Tracking',
    description: 'Customers can track packages online with live updates at every stage of the journey.',
    color: 'bg-[#1D2F42]'
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Fast responses through WhatsApp and our AI chatbot for all your inquiries.',
    color: 'bg-green-500'
  }
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      
      if (cards) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
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
      className="relative py-20 lg:py-32 bg-[#D8D8D0]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-text text-[#1D2F42] mb-4 block">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2F42] mb-4">
            SAFE & RELIABLE CARGO SOLUTIONS
          </h2>
          <p className="text-[#3d5266] text-lg">
            From pickup to delivery, we handle your cargo with precision—so you can focus on growing your business.
          </p>
        </div>

        {/* Feature Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group bg-white rounded-[28px] p-8 card-shadow card-border hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2F42] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#3d5266] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
