import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-[#F6F6F6] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="label-text text-[#D7263D] mb-4 block">Contact Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] mb-4">
            GET IN TOUCH
          </h1>
          <p className="text-[#6F6F6F] text-lg">
            Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#D7263D]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2">Phone</h3>
                <a href="tel:+233546757801" className="text-[#6F6F6F] hover:text-[#D7263D] transition-colors">
                  +233 54 675 7801
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#D7263D]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2">Email</h3>
                <a href="mailto:billwealth1@gmail.com" className="text-[#6F6F6F] hover:text-[#D7263D] transition-colors">
                  billwealth1@gmail.com
                </a>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#D7263D]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2">Address</h3>
                <p className="text-[#6F6F6F]">
                  C22/U/26 Community 22, Tema, Ghana
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 card-shadow">
                <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#D7263D]" />
                </div>
                <h3 className="font-bold text-[#111111] mb-2">Working Hours</h3>
                <p className="text-[#6F6F6F]">
                  Mon - Sat: 8AM - 6PM
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-[24px] overflow-hidden card-shadow h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1234567890123!2d-0.12345678901234567!3d5.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMDcnMjQuNCJOIDDCsDA3JzI0LjQiVw!5e0!3m2!1sen!2sgh!4v1234567890123!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bill Express Logistics Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[24px] p-8 card-shadow">
            <h2 className="text-2xl font-bold text-[#111111] mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#D7263D]"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#D7263D]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111111] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233 54 675 7801"
                    className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#D7263D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111111] mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-[#D7263D] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D7263D] text-white rounded-xl font-semibold hover:bg-[#b51d32] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
