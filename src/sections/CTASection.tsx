import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { x: -80, opacity: 0 },
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
        { x: 50, opacity: 0 },
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
      className="relative py-20 lg:py-32 bg-[#F6F6F6] overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
              <img
                src="/images/cta_truck.jpg"
                alt="Delivery truck"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="lazy"
                decoding="async"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D7263D]/80 to-transparent" />
              
              {/* Content on Image */}
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm opacity-80 mb-2">Ready to Ship?</p>
                <p className="text-3xl font-black">Get Started Today</p>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-[#D7263D]/10 rounded-full blur-3xl" />
          </div>

          {/* Right Content */}
          <div ref={contentRef}>
            <span className="animate-item label-text text-[#D7263D] mb-4 block">
              Get a Quote
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] mb-6 leading-tight">
              REQUEST A FREE QUOTE TODAY
            </h2>
            <p className="animate-item text-lg text-[#6F6F6F] mb-8 leading-relaxed">
              No hidden fees. No long forms. Just a clear price and a pickup time that works for you.
              Our team is ready to handle your logistics needs.
            </p>

            <div className="animate-item flex flex-wrap gap-4 mb-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D7263D] text-white rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-[#b51d32] hover:translate-y-[-2px] transition-all shadow-lg shadow-[#D7263D]/25"
              >
                Get Your Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+233257721337"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#111111] border-2 border-[#111111] rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-[#111111] hover:text-white transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Us
              </a>
            </div>

            {/* Contact Info */}
            <div className="animate-item flex flex-col sm:flex-row gap-6 pt-8 border-t border-gray-200">
              <div>
                <p className="text-sm text-[#6F6F6F] mb-1">Phone</p>
                <p className="font-semibold text-[#111111]">025 772 1337</p>
              </div>
              <div>
                <p className="text-sm text-[#6F6F6F] mb-1">Email</p>
                <p className="font-semibold text-[#111111]">info@hayyugoldcoast.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
