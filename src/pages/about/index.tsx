/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import AboutSection from "./AboutSection";
import TeamSection from "./TeamSection";
import TestimonialsSection from "./TestimonialsSection";

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Us | Commerce Mentorship Program</title>
        <meta
          name="description"
          content="Welcome to the Commerce Mentorship Program (CMP) – Your resource for educational guidance and events at the Sauder School of Business. Discover expert mentoring, valuable resources, and exciting events to boost your academic and professional journey. Join us today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="left-0 right-0 top-0 h-32 w-full overflow-hidden">
        <img
          src="/banner.png"
          alt="ubc banner"
          className="h-auto w-full object-center"
        />
      </div>
      <div className="container mx-auto max-w-[1440px] flex-grow p-4">
        <div className="justify-center space-y-24 p-4">
          <AboutSection />
          {/* <TestimonialsSection /> */}
          <TeamSection />
        </div>
      </div>
    </>
  );
}
