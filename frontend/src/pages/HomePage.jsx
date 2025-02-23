import React, { useEffect } from "react";
import Cookie from "universal-cookie";
import Header from "../ui/Header";
import PageNav from "../ui/PageNav";
import PageNavMob from "../ui/PageNavMob";
import Logo from "../ui/Logo";
import Footer from "../ui/Footer";
import Button from "../components/Button";
import styles from "../styles/HomePage.module.css";
import { useAuth } from "../hook/useAuth";
import { Navigate } from "react-router";

const cookie = new Cookie();

const HomePage = () => {
  return (
    <main className="bg-gradient-to-b from-white to-green-50 min-h-screen">
      {/* Header */}
      <Header>
        <Logo width={50} />
        <PageNav />
      </Header>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

// Hero Section
const HeroSection = () => (
  <section
    className={`flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-16 lg:py-24 bg-gradient-to-r from-green-100 to-green-300 text-center lg:text-left ${styles.heroSection}`}
  >
    {/* Welcome Text */}
    <div className="max-w-lg space-y-5">
      <h1 className="text-5xl font-extrabold text-green-800 leading-tight">
        Master Korean <br /> From Scratch
      </h1>
      <p className="text-lg text-green-900/80">
        Join over 100,000 learners and explore lessons from basic Hangeul to
        advanced grammar, organized by levels and updated weekly.
      </p>
      <Button
        styled="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 transition inline-block"
        style={{ marginTop: "1.5rem" }}
      >
        Get Started Now
        <ArrowIcon />
      </Button>
    </div>

    {/* Hero Image */}
    <div className="mt-10 lg:mt-0 lg:w-1/2">
      <img
        src="Illustation.png"
        alt="Learn Korean illustration"
        className="w-full rounded-lg shadow-xl"
      />
    </div>
  </section>
);

// Features Section
const FeaturesSection = () => (
  <section className="py-16 px-6 lg:px-24 bg-white">
    <h2 className="text-4xl font-bold text-center text-green-800 mb-8">
      Why Choose Us
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <FeatureCard
        icon="📘"
        title="Comprehensive Lessons"
        description="From beginner Hangeul to advanced grammar, lessons tailored to every level."
      />
      {/* Feature 2 */}
      <FeatureCard
        icon="🕒"
        title="Weekly Updates"
        description="New lessons and quizzes added every week to keep you engaged."
      />
      {/* Feature 3 */}
      <FeatureCard
        icon="🎓"
        title="Expert Guidance"
        description="Learn with lessons crafted by experienced language instructors."
      />
    </div>
  </section>
);

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow-lg">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-green-800">{title}</h3>
    <p className="text-green-700 text-center mt-2">{description}</p>
  </div>
);

// Arrow Icon
const ArrowIcon = () => (
  <svg
    className="inline-block ml-2"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HomePage;
