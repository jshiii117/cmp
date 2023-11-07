/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import { Analytics } from "@vercel/analytics/react";
import { type AppProps } from "next/app";
import {
  type Event,
  type ReviewSession,
  type EventItem,
  type ReviewSessionItem,
} from "../types";
import React, { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [globalData, setGlobalData] = useState({
    events: [],
    reviewSessions: [],
  });

  useEffect(() => {
    const threshold = 180000; //3-minute set refresh threshold
    const currentTime = new Date().getTime();

    const parseEvents = (responseData: { items: EventItem[] }): Event[] => {
      return responseData.items.map((item) => {
        const contentValues = item.fields.description.content
          .map((contentItem) =>
            contentItem.content.map((c) => c.value).join(" "),
          )
          .join(" ");

        return {
          title: item.fields.title,
          content: contentValues,
          location: item.fields.location,
          rsvpLink: item.fields.rsvpLink,
          expired: item.fields.expired,
          date: item.fields.date,
          academicConsultant: "",
        };
      });
    };

    const parseReviewSessions = (responseData: {
      items: ReviewSessionItem[];
    }): ReviewSession[] => {
      return responseData.items.map((item) => {
        return {
          title: item.fields.title,
          content: "",
          location: item.fields.location,
          rsvpLink: item.fields.rsvpLink,
          expired: item.fields.expired,
          date: item.fields.date,
          academicConsultant: item.fields.academicConsultant,
        };
      });
    };

    const fetchData = async (type: string) => {
      const cachedData = localStorage.getItem(type);
      const cachedTimestamp = localStorage.getItem(`${type}Timestamp`);

      if (
        cachedData &&
        cachedTimestamp &&
        currentTime - Number(cachedTimestamp) < threshold
      ) {
        return JSON.parse(cachedData) as Event[] | ReviewSession[];
      } else {
        try {
          const response = await fetch(`/api/getContentful?type=${type}`);
          const responseData = await response.json();
          const parsedData =
            type === "event"
              ? parseEvents(responseData)
              : parseReviewSessions(responseData);

          localStorage.setItem(type, JSON.stringify(parsedData));
          localStorage.setItem(`${type}Timestamp`, currentTime.toString());
          return parsedData;
        } catch (error) {
          console.error(`Error fetching ${type}:`, error);
          return cachedData ? JSON.parse(cachedData) : [];
        }
      }
    };

    const loadData = async () => {
      const events = await fetchData("event");
      const reviewSessions = await fetchData("reviewSession");
      setGlobalData({ events, reviewSessions });
    };

    void loadData();
  }, []);

  return (
    <>
      <div className="z-40 overflow-clip bg-slate-50">
        {/* Navbar */}
        <nav className="bg-transparent p-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}

            <Link href="/" className="z-40">
              <img
                src="/logo.png"
                alt="Logo"
                height={64}
                width={64}
                className="block max-[400px]:hidden"
              />
            </Link>

            <div className="z-40 flex items-center justify-center">
              <Link href="/review">
                <button className="mr-8 flex flex-nowrap rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-black">
                  Find a Review Package
                </button>
              </Link>
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-black focus:outline-none lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {/* Desktop Menu */}
              <div className="hidden space-x-4 lg:flex">
                <Link href="/review">Packages</Link>
                <Link href="/events">Events</Link>
                <Link href="/review-sessions">Review Sessions</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Modal */}
        <MobileNavMenu
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />

        <div className="flex min-h-screen flex-grow flex-col justify-center ">
          <div className="flex-grow">
            <Component {...pageProps} globalData={globalData} />
            <Analytics />
          </div>
          {/* Footer */}
          <footer className="border-t border-gray-700 bg-gray-900 p-8 text-white">
            <div className="container mx-auto">
              {/* First Row */}
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-lg font-bold">
                  Commerce Mentorship Program
                </h1>
                <div className="flex space-x-4">
                  <Link
                    href="https://instagram.com/ubccmp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/ig.png" alt="Instagram" width="25" height="25" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/ubccmp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/fb.png" alt="Facebook" width="25" height="25" />
                  </Link>
                  <Link href="mailto:ubccmp@cus.ca">
                    <img src="/mail.png" alt="Email" width="25" height="25" />
                  </Link>
                </div>
              </div>

              {/* Second Row */}
              <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div className="flex flex-col">
                  <Link href="/">Home</Link>
                  <Link href="/review">Review Packages</Link>
                  <Link href="/review-sessions">Review Sessions</Link>
                </div>
                <div className="flex flex-col">
                  <Link href="/events">Events</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>

              {/* Third Row */}
              <div className="flex items-center justify-between border-t border-gray-800 pt-4">
                <div>
                  <p className="text-base">
                    © Commerce Mentorship Program. All rights reserved.
                  </p>
                </div>
                <div>
                  <p className="text-base">
                    Website made by{" "}
                    <a
                      href="http://linkedin.com/in/jamesshi117/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base underline"
                    >
                      James Shi
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default MyApp;

interface MobileNavMenuProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const closeMenu = () => {
    setIsModalOpen(false);
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden lg:hidden"
        onClose={setIsModalOpen}
      >
        <div className="absolute inset-0">
          {/* Close the menu when overlay is clicked */}
          <div
            className="fixed inset-0 cursor-pointer bg-black opacity-30"
            onClick={closeMenu}
          />
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out"
            enterFrom="-translate-y-60"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-60"
          >
            <div className="absolute inset-x-0 top-0 origin-top transform bg-white shadow-lg">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">Navigation</h3>
                  <button
                    onClick={closeMenu}
                    className="text-gray-800 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-2 py-2">
                  <Link
                    href="/"
                    onClick={() => setIsModalOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Home
                  </Link>
                  <Link
                    href="/review"
                    onClick={() => setIsModalOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Review Packages
                  </Link>
                  <Link
                    href="/events"
                    onClick={() => setIsModalOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Events
                  </Link>
                  <Link
                    href="/review-sessions"
                    onClick={() => setIsModalOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Review Sessions
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsModalOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsModalOpen(false)}
                    className="block rounded-md px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
