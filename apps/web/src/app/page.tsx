import { SearchSection } from "./components/SearchSection";
import { FeaturedFreelancers } from "./components/FeaturedFreelancers";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { Testimonials } from "./components/Testimonials";
import { JoinCommunity } from "./components/JoinCommunity";
import { FooterHome } from "./components/FooterHome";
import HeroHome from "./components/HeroHome";

export default function Home() {
  return (
    <main>
      <HeroHome />
      <SearchSection />
      <FeaturedFreelancers />
      <FeaturedProjects />
      <Testimonials />
      <JoinCommunity />
      <FooterHome />
    </main>
  );
}
