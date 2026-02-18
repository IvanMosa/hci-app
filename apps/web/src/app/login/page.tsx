import { HeroSection } from "@/components/HeroSection";
import { AuthForm } from "@/components/AuthForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col lg:flex-row relative">
        <HeroSection />
        <AuthForm />
      </div>

      <Footer />
    </main>
  );
}
