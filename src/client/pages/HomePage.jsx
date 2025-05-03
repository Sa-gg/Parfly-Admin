import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";
import Reviews from "../components/Reviews";
import Faq from "../components/Faq";
import Download from "../components/Download";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Reviews />
      <Faq />
      <Download />
      <Footer />
      
    </>
  );
};

export default HomePage;
