import { Navbar } from "./components/Navbar";
import Hero from "./components/Hero";
import { SearchSection } from "./components/SearchSection";
import { FeaturedFreelancers } from "./components/FeaturedFreelancers";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import { JoinCommunity } from "./components/JoinCommunity";
import { FooterHome } from "./components/FooterHome";

export default function Home() {
  return (
    <main>
      <Hero />
      <SearchSection />
      <FeaturedFreelancers />
      <FeaturedProjects />
      <Testimonials />
      <JoinCommunity />
      <FooterHome />
    </main>
  );
}
