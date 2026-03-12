import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import WhyChooseUsSection from '@/sections/WhyChooseUsSection';
import ServicesSection from '@/sections/ServicesSection';
import StatsSection from '@/sections/StatsSection';
import ProcessSection from '@/sections/ProcessSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import CTASection from '@/sections/CTASection';
import FAQSection from '@/sections/FAQSection';
import FooterSection from '@/sections/FooterSection';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <StatsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
