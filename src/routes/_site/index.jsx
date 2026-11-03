import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/home/Hero";
import StatsBand from "@/components/home/StatsBand";
import EnginesSection from "@/components/home/EnginesSection";
import ValueChain from "@/components/home/ValueChain";
import ConcreteSection from "@/components/home/ConcreteSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import AnayaSpotlight from "@/components/home/AnayaSpotlight";
import ClientsStrip from "@/components/home/ClientsStrip";
import VendorCta from "@/components/home/VendorCta";
import InsightsSection from "@/components/home/InsightsSection";

export const Route = createFileRoute("/_site/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Pusapati Group — Building Foundations, Forging Futures" },
      {
        name: "description",
        content:
          "Pusapati Group is an integrated Indian building group: eight companies across materials, trade and technology, real estate and hospitality, and digital infrastructure.",
      },
      { property: "og:title", content: "Pusapati Group — Building Foundations, Forging Futures" },
      {
        property: "og:description",
        content:
          "From the quarry to the skyline to the stay — eight companies, four business engines, one quality system.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <EnginesSection />
      <ValueChain />
      <ConcreteSection />
      <ProjectsSection />
      <AnayaSpotlight />
      <ClientsStrip />
      <VendorCta />
      <InsightsSection />
    </>
  );
}