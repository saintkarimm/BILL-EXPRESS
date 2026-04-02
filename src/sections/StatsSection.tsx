import { useEffect, useRef, useState } from 'react';
import { Package, Clock, Users, Globe } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Package, value: 12000, suffix: '+', label: 'Parcels Delivered', color: 'bg-[#1D2F42]' },
  { icon: Clock, value: 99, suffix: '%', label: 'On-Time Rate', color: 'bg-green-500' },
  { icon: Users, value: 5000, suffix: '+', label: 'Happy Customers', color: 'bg-blue-500' },
  { icon: Globe, value: 50, suffix: '+', label: 'Countries Served', color: 'bg-purple-500' }
];

const partners = ['Velocity', 'FoxHub', 'Treva', 'Zootv', 'Solyatic', 'GlobalNet'];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      className="relative py-20 lg:py-32 bg-[#D8D8D0] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#1D2F42" />
          </pattern>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-text text-[#1D2F42] mb-4 block">Our Impact</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1D2F42] mb-4">
            TRUSTED ACROSS THE GLOBE
          </h2>
          <p className="text-[#3d5266] text-lg">
            Numbers that speak for our commitment to excellence in logistics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white rounded-[24px] p-8 card-shadow card-border text-center hover:translate-y-[-4px] transition-all"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-4xl font-black text-[#1D2F42] mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[#3d5266]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center">
          <p className="label-text text-[#3d5266] mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-2xl font-bold text-[#1D2F42]/20 hover:text-[#1D2F42]/40 transition-colors cursor-default"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
