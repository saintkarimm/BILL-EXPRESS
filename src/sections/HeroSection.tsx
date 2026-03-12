import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, MapPin } from 'lucide-react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(imageRef.current, { x: '60vw', scale: 1.08, opacity: 0 });
      gsap.set(headlineRef.current?.querySelectorAll('.word') || [], { y: 40, opacity: 0 });
      gsap.set(subheadRef.current, { y: 24, opacity: 0 });
      gsap.set(ctaRef.current?.children || [], { y: 24, opacity: 0 });
      gsap.set(badgeRef.current, { scale: 0, opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(imageRef.current, {
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      })
      .to(headlineRef.current?.querySelectorAll('.word') || [], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'power3.out'
      }, '-=0.8')
      .to(subheadRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .to(ctaRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.3')
      .to(badgeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.8)'
      }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'FAST AND EFFICIENT LOGISTICS SERVICE'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F6F6F6] overflow-hidden pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#111111" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-160px)]">
          {/* Left Content */}
          <div className="order-2 lg:order-1 z-10">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#111111] leading-[0.95] tracking-tight mb-6"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subheadRef}
              className="text-lg sm:text-xl text-[#6F6F6F] max-w-xl mb-8 leading-relaxed"
            >
              Reliable freight forwarding, real-time tracking, and on-time delivery—
              across cities and borders. We ship packages from the USA to Ghana safely.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link
                to="/tracking"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#D7263D] text-white rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-[#b51d32] hover:translate-y-[-2px] transition-all shadow-lg shadow-[#D7263D]/25"
              >
                <MapPin className="w-5 h-5" />
                Track Shipment
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-[#333333] hover:translate-y-[-2px] transition-all"
              >
                <Package className="w-5 h-5" />
                Buy Electronics
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
              <div>
                <p className="text-3xl font-black text-[#D7263D]">12K+</p>
                <p className="text-sm text-[#6F6F6F]">Parcels Delivered</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#D7263D]">99%</p>
                <p className="text-sm text-[#6F6F6F]">On-Time Rate</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#D7263D]">24/7</p>
                <p className="text-sm text-[#6F6F6F]">Customer Support</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 relative">
            <div
              ref={imageRef}
              className="relative rounded-[28px] overflow-hidden shadow-2xl"
            >
              <img
                src="/images/hero_drone.jpg"
                alt="Logistics drone delivery"
                className="w-full h-[400px] lg:h-[500px] object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              
              {/* Badge */}
              <div
                ref={badgeRef}
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  24/7 Support
                </span>
              </div>

              {/* Overlay Card */}
              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#D7263D]/10 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#D7263D]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">Fast Delivery</p>
                    <p className="text-xs text-[#6F6F6F]">USA to Ghana</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-[#D7263D]/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 -top-8 -left-8 w-32 h-32 bg-[#D7263D]/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
