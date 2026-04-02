import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ato K.',
    role: 'Retail Business Owner',
    content: 'Hayyu GoldCoast turned our chaotic shipping schedule into a predictable system. Their tracking is accurate and deliveries are always on time.',
    rating: 5
  },
  {
    name: 'Nana Y.',
    role: 'Manufacturing Manager',
    content: 'Clear pricing and fast replies. That is rare in logistics. Their team goes above and beyond to ensure our cargo arrives safely.',
    rating: 5
  },
  {
    name: 'Efua M.',
    role: 'E-commerce Entrepreneur',
    content: 'Our deliveries arrive on time, every time. The real-time tracking gives our customers peace of mind and reduces support tickets.',
    rating: 5
  },
  {
    name: 'Kofi D.',
    role: 'Agriculture Exporter',
    content: 'They treat small shipments with the same care as big freight. Their attention to detail has made them our go-to logistics partner.',
    rating: 5
  },
  {
    name: 'Abena T.',
    role: 'Pharma Distributor',
    content: 'The tracking is accurate and the support team is excellent. They understand the importance of temperature-sensitive shipments.',
    rating: 5
  },
  {
    name: 'Yaw B.',
    role: 'Construction Supplier',
    content: 'From quote to delivery, everything felt effortless. Their customs handling saved us weeks of delays on our international orders.',
    rating: 5
  }
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      
      if (cards) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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
      className="relative py-20 lg:py-32 bg-[#D8D8D0]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-text text-[#1D2F42] mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2F42] mb-4">
            WHAT OUR CLIENTS SAY ABOUT US
          </h2>
          <p className="text-[#3d5266] text-lg">
            We are proud to keep our partners moving—here is what they have shared.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-[24px] p-6 card-shadow card-border hover:translate-y-[-4px] transition-all"
            >
              {/* Quote Icon */}
              <div className="w-10 h-10 bg-[#1D2F42]/10 rounded-full flex items-center justify-center mb-4">
                <Quote className="w-5 h-5 text-[#1D2F42]" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[#1D2F42] mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#1D2F42]">{testimonial.name}</p>
                  <p className="text-sm text-[#3d5266]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
