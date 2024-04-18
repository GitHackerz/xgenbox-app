import HeroSection from "@/components/hero-section";
import Problems from "@/components/problems";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import CallToAction from "@/components/call-to-action";
import Blog from "@/components/blog";
import Features from "@/components/features";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <Problems />
      <Stats />
      <Features />
      <Testimonials />
      <CallToAction />
      <Blog />
    </div>
  );
}
