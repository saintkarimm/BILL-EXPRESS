import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  'Transparent pricing with no hidden fees',
  'Dedicated account support',
  'Network built for speed and reliability',
  'Customs documentation handled',
  'Insurance coverage available',
  'Door-to-door delivery service'
];

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 bg-[#D8D8D0] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="animate-item label-text text-[#1D2F42] mb-4 block">
              Why Choose Us
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2F42] mb-6 leading-tight">
              WE MAKE THINGS EASY & HIGHLY PROFITABLE
            </h2>
            <p className="animate-item text-lg text-[#3d5266] mb-8 leading-relaxed">
              Transparent pricing, dedicated account support, and a network built for speed—
              so you save time and reduce overhead. Our logistics solutions are designed to 
              help your business grow.
            </p>

            {/* Benefits List */}
            <div className="animate-item grid sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#1D2F42] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-[#1D2F42]">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="animate-item flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-gray-600">U{i}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1D2F42]">12K+ Happy Customers</p>
                <p className="text-xs text-[#3d5266]">Trust us with their logistics</p>
              </div>
            </div>
          </div>

          {/* Right Video */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
              <img
                src="/video.gif"
                alt="Warehouse operations"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              


              {/* Stats Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg">
                <p className="text-3xl font-black text-[#1D2F42]">15+</p>
                <p className="text-sm text-[#3d5266]">Years Experience</p>
              </div>
            </div>

            {/* Secondary Image */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-[18px] overflow-hidden shadow-xl border-4 border-white hidden lg:block">
              <img
                src="/images/why_worker.jpg"
                alt="Logistics worker"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-[#1D2F42]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
