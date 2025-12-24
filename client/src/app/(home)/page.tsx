"use client";
import Header from "./components/header";
import Hero from "./components/hero";
import Features from "./components/features";
import Work from "./components/work";
import Footer from "./components/footer";
import Users from "./components/users";
import Cta from "./components/cta";

export default function page() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Work />
      <Users />
      <Cta />
      <Footer />
    </div>
  );
}
