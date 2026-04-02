import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Users, 
  Globe, 
  Shield, 
  Target, 
  Heart,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '15+', label: 'Years Experience', icon: Award },
  { number: '12K+', label: 'Happy Customers', icon: Users },
  { number: '50+', label: 'Countries Served', icon: Globe },
  { number: '99%', label: 'Satisfaction Rate', icon: Shield },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To provide seamless logistics solutions that empower businesses to reach their full potential through reliable, efficient, and innovative transportation services.'
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To become the leading logistics partner in Ghana and West Africa, recognized for excellence, reliability, and customer-centric service delivery.'
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Integrity, transparency, innovation, and customer satisfaction drive everything we do. We believe in building lasting partnerships with our clients.'
  }
];

const team = [
  {
    name: 'Abdul Karim',
    role: 'Founder & CEO',
    image: '/images/why_worker.jpg'
  },
  {
    name: 'Sarah Mensah',
    role: 'Operations Manager',
    image: '/images/why_warehouse.jpg'
  },
  {
    name: 'James Osei',
    role: 'Logistics Coordinator',
    image: '/images/service_transport.jpg'
  },
  {
    name: 'Grace Addo',
    role: 'Customer Relations',
    image: '/images/cta_truck.jpg'
  }
];

const milestones = [
  { year: '2009', event: 'Company founded in Accra' },
  { year: '2012', event: 'Expanded to international shipping' },
  { year: '2015', event: 'Opened warehousing facility' },
  { year: '2018', event: 'Launched e-commerce logistics' },
  { year: '2021', event: 'Expanded to 50+ countries' },
  { year: '2024', event: 'Rebranded to Hayyu GoldCoast' },
];

// Eye icon component since lucide-react might not export it directly
function Eye({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-item') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          }
        }
      );

      // Values animation
      gsap.fromTo(valuesRef.current?.querySelectorAll('.value-card') || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 75%',
          }
        }
      );

      // Team animation
      gsap.fromTo(teamRef.current?.querySelectorAll('.team-card') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamRef.current,
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
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1D2F42] mb-6 leading-tight">
              Your Trusted Logistics Partner in Ghana
            </h1>
            <p className="text-lg sm:text-xl text-[#3d5266] max-w-2xl mx-auto leading-relaxed">
              Hayyu GoldCoast Logistics and Transport has been connecting businesses 
              to the world through reliable, efficient, and innovative logistics solutions 
              since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 lg:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-item bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-[#1D2F42]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-[#1D2F42]" />
                </div>
                <p className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-[#3d5266]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="rounded-[28px] overflow-hidden shadow-2xl">
                <img
                  src="/images/why_warehouse.jpg"
                  alt="Our warehouse"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#1D2F42] text-white p-6 rounded-2xl shadow-xl hidden sm:block">
                <p className="text-4xl font-black">15+</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </div>
            <div>
              <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-6">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-6 leading-tight">
                From Humble Beginnings to Industry Leaders
              </h2>
              <div className="space-y-4 text-[#3d5266] leading-relaxed">
                <p>
                  Founded in 2009 in Lakeside Community 1, NikaNika, Hayyu GoldCoast 
                  started as a small local courier service with a single truck and a 
                  vision to transform logistics in Ghana.
                </p>
                <p>
                  Today, we have grown into a comprehensive logistics and transport 
                  company serving thousands of businesses across 50+ countries. Our 
                  journey has been defined by our commitment to reliability, innovation, 
                  and customer satisfaction.
                </p>
                <p>
                  We specialize in freight forwarding, customs brokerage, warehousing, 
                  and supply chain optimization, providing end-to-end solutions that 
                  help businesses thrive in the global marketplace.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D2F42] text-white rounded-xl font-semibold hover:bg-[#0f1a25] transition-colors"
                >
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1D2F42] rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section ref={valuesRef} className="py-16 lg:py-24 bg-white/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-4">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42]">
              Our Mission, Vision & Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="value-card bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-[#1D2F42] rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1D2F42] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#3d5266] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42]">
              Milestones That Define Us
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[#1D2F42]/20" />
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm ml-12 lg:ml-0 lg:mr-0">
                      <span className="text-[#1D2F42] font-black text-xl">{milestone.year}</span>
                      <p className="text-[#3d5266] mt-1">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1D2F42] rounded-full border-4 border-[#D8D8D0]" />
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16 lg:py-24 bg-white/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42]">
              Meet the People Behind Our Success
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="team-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#1D2F42] text-lg">{member.name}</h3>
                  <p className="text-[#3d5266] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-[#1D2F42]/10 text-[#1D2F42] rounded-full text-sm font-medium mb-6">
                Why Hayyu GoldCoast
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1D2F42] mb-6 leading-tight">
                What Sets Us Apart
              </h2>
              <div className="space-y-4">
                {[
                  'Transparent pricing with no hidden fees',
                  'Dedicated account managers for every client',
                  'Real-time tracking and updates',
                  'Comprehensive insurance coverage',
                  'Customs documentation handled end-to-end',
                  '24/7 customer support availability',
                  'Strategic location in Lakeside Community',
                  'Eco-friendly logistics practices'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1D2F42] flex-shrink-0 mt-0.5" />
                    <span className="text-[#3d5266]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-[28px] overflow-hidden shadow-2xl">
                <img
                  src="/images/service_transport.jpg"
                  alt="Our transport fleet"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-24 bg-[#1D2F42]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Let us handle your logistics needs while you focus on growing your business. 
              Get in touch today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1D2F42] rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:0257721337"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                025 772 1337
              </a>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Lakeside Community 1, NikaNika</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>info@hayyugoldcoast.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
