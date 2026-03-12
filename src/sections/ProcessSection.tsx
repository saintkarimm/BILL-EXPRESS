import { useEffect, useRef } from 'react';
import { FileText, Truck, MapPin, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Request a Quote',
    description: 'Tell us your origin, destination, and cargo details. Get an instant estimate for your shipment.',
    color: 'bg-blue-500'
  },
  {
    number: '02',
    icon: Truck,
    title: 'We Plan & Pick Up',
    description: 'Our team optimizes the route and schedules collection from your specified location.',
    color: 'bg-[#D7263D]'
  },
  {
    number: '03',
    icon: MapPin,
    title: 'Track Your Shipment',
    description: 'Monitor your package in real-time with live updates at every stage of the journey.',
    color: 'bg-purple-500'
  },
  {
    number: '04',
    icon: CheckCircle,
    title: 'Safe Delivery',
    description: 'Receive your package at your doorstep with our reliable door-to-door delivery service.',
    color: 'bg-green-500'
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stepCards = stepsRef.current?.querySelectorAll('.step-card');
      
      if (stepCards) {
        gsap.fromTo(stepCards,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      gsap.fromTo(imageRef.current,
        { x: 60, opacity: 0 },
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
          {/* Left Steps */}
          <div>
            <span className="label-text text-[#D7263D] mb-4 block">Our Process</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] mb-8 leading-tight">
              REQUEST A QUOTE & BOOK YOUR SHIPMENT
            </h2>

            <div ref={stepsRef} className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="step-card flex gap-5 p-5 bg-white rounded-2xl card-shadow card-border hover:translate-x-2 transition-all"
                >
                  <div className={`w-14 h-14 ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-[#D7263D]">STEP {step.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#111111] mb-1">{step.title}</h3>
                    <p className="text-sm text-[#6F6F6F] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
              <img
                src="/images/process_plane.jpg"
                alt="Cargo plane"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              
              {/* Overlay Badge */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  Step-by-Step
                </span>
              </div>

              {/* Info Card */}
              <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#6F6F6F] mb-1">Average Delivery Time</p>
                    <p className="text-2xl font-black text-[#111111]">5-10 Days</p>
                  </div>
                  <div className="w-16 h-16 bg-[#D7263D]/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#D7263D]">USA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-[#D7263D]/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
