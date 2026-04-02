import { Link } from 'react-router-dom';
import { Package, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Shop', href: '/shop' },
  { name: 'Tracking', href: '/tracking' },
  { name: 'Contact', href: '/contact' }
];

const services = [
  { name: 'Freight Forwarding', href: '/#services' },
  { name: 'Customs Brokerage', href: '/#services' },
  { name: 'Warehousing & Distribution', href: '/#services' },
  { name: 'Supply Chain Optimization', href: '/#services' },
  { name: 'Import & Export Handling', href: '/contact' },
  { name: 'Oil & Gas Logistics', href: '/contact' }
];

export default function FooterSection() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#D7263D] rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                HAYYU GOLDCoast
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Global trade made simple. We provide comprehensive logistics solutions including freight forwarding, customs brokerage, warehousing, and supply chain optimization.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#D7263D] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#D7263D] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-gray-400 hover:text-[#D7263D] transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D7263D] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Lakeside Community 1, NikaNika
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D7263D] flex-shrink-0" />
                <a href="tel:+233257721337" className="text-gray-400 hover:text-[#D7263D] transition-colors text-sm">
                  025 772 1337
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D7263D] flex-shrink-0" />
                <a href="mailto:info@hayyugoldcoast.com" className="text-gray-400 hover:text-[#D7263D] transition-colors text-sm">
                  info@hayyugoldcoast.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Hayyu GoldCoast Logistics and Transport. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
