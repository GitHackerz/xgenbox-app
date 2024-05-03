import HeroSection from "@/components/client/hero-section";
import Problems from "@/components/client/problems";
import Stats from "@/components/client/stats";
import CallToAction from "@/components/client/call-to-action";
import Features from "@/components/client/features";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <Problems />
      <Stats />
      <Features />
      {/*<Testimonials />*/}
      <CallToAction />
      {/*<Blog />*/}
    </div>
  );
}
