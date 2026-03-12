import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'Can I ship items from the USA to Ghana?',
    answer: 'Yes, Bill Express Logistics specializes in shipping packages safely from the USA to Ghana. We handle all customs documentation and ensure your items arrive securely and on time.'
  },
  {
    question: 'Do you sell electronics?',
    answer: 'Yes, we operate an electronics shop where you can buy gadgets and accessories including phones, laptops, tablets, smartwatches, and more. Visit our Shop page to browse our selection.'
  },
  {
    question: 'Where are you located?',
    answer: 'Our office is located at C22/U/26 Community 22, Tema, Ghana. You can also reach us by phone at +233 54 675 7801 or email at billwealth1@gmail.com.'
  },
  {
    question: 'How do I track my shipment?',
    answer: 'You can track your shipment by entering your tracking number on our Tracking page. We provide real-time updates at every stage of your package journey from pickup to delivery.'
  },
  {
    question: 'What is the delivery time for shipments?',
    answer: 'Delivery time depends on the shipping method. Air freight typically takes 5-10 business days, while sea freight takes 4-8 weeks. We will provide an estimated delivery date when you request a quote.'
  },
  {
    question: 'Do you provide packaging services?',
    answer: 'Yes, we provide professional packaging supplies and services to ensure your items are protected during transit. Our team can help you choose the right packaging for your specific items.'
  }
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 40, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-[#F6F6F6]"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div ref={contentRef}>
            <span className="animate-item label-text text-[#D7263D] mb-4 block">
              FAQ
            </span>
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] mb-6 leading-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="animate-item text-lg text-[#6F6F6F] mb-8 leading-relaxed">
              Everything you need to know about shipping, tracking, and our services.
              Can not find what you are looking for? Contact us directly.
            </p>

            <div className="animate-item flex items-center gap-4 p-5 bg-white rounded-2xl card-shadow">
              <div className="w-12 h-12 bg-[#D7263D]/10 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-[#D7263D]">?</span>
              </div>
              <div>
                <p className="font-semibold text-[#111111]">Still have questions?</p>
                <p className="text-sm text-[#6F6F6F]">Contact us at +233 54 675 7801</p>
              </div>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="animate-item">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-2xl px-6 border border-gray-100 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold text-[#111111] hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#6F6F6F] pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
