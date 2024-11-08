import React from "react";
import Header from "../ui/Header";
import PageNav from "../ui/PageNav";
import PageNavMob from "../ui/PageNavMob";
import Logo from "../ui/Logo";
import Button from "../components/Button";
import Footer from "../ui/Footer";
import { Navigate, useNavigate } from "react-router";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
  return (
    <main className="bg-silver m-auto">
      <Header>
        <Logo width={40} />
        <PageNav />
        <PageNavMob />
      </Header>

      <HomeSection />
      <SectionTwo />

      <Footer />
    </main>
  );
};

const HomeSection = () => (
  <section className="home flex flex-col justify-around items-start lg:flex-row lg:gap-10 xl:px-0 py-10 xl:py-0 mx-auto max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-5xl items-center mb-12">
    <WelcomeText />
    <Illustration
      src="Illustation.png"
      alt="Illustration related to learning Korean"
      customStyle={`${styles.welcomeImg}`}
    />
  </section>
);

// Welcome Text Component
function WelcomeText() {
  return (
    <div className={`tracking-tight ${styles.welcomeTextanimation}`}>
      <h2 className="text-4xl text-black font-bold">Learning Korean from</h2>
      <h2 className="mt-3 text-3xl text-shade1 font-bold">complete scratch</h2>
      <p className="mt-4 text-sm text-grey mb-5">
        You can achieve profound understanding of Korean with Elgand.
      </p>
      <Button styled="font-semibold bg-shade1 mt-6" path="app">
        Get started
        <ArrowIcon />
      </Button>
    </div>
  );
}

// Section Two Component
const SectionTwo = () => (
  <section className="flex flex-col items-center lg:gap-5 xl:px-0 py-10 xl:py-0 mx-auto max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-5xl items-center mb-10 text-center">
    <div className="max-w-2xl">
      <h2 className="text-4xl text-black font-bold">Lessons expanded weekly</h2>
      <p className="mt-4 text-grey mx-4">
        You can take over 100 Korean lessons, ranging from{" "}
        <span className="text-black font-semibold">basic Hangeul</span> to{" "}
        <span className="text-shade1 font-semibold">advanced grammar</span>,
        organized by level and expanded weekly.
      </p>
    </div>
    <Illustration
      src="Book lover-bro 1.png"
      alt="Book lover illustration"
      customStyle="lg:w-1/3"
    />
  </section>
);

// Illustration Component
const Illustration = ({ src, alt, customStyle }) => (
  <div className={`illustrator basis-1/2 ${customStyle}`}>
    <img src={src} alt={alt} />
  </div>
);

// Button Component

// Arrow Icon Component
const ArrowIcon = () => (
  <svg
    className="inline-block"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.125 7.5H11.875M11.875 7.5L7.5 3.125M11.875 7.5L7.5 11.875"
      stroke="#F1F1F1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HomePage;
