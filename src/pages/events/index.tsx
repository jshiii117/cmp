/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  title: string;
  content: string;
  location: string;
  rsvpLink: string;
  expired: boolean;
  date: string;
}

interface EventsProps {
  globalData: {
    events: Event[];
  };
}

export default function Events({ globalData }: EventsProps) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(globalData.events);
  }, [globalData.events]);

  return (
    <>
      <Head>
        <title>Events | Commerce Mentorship Program</title>
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
      <main className="flex min-h-[600px] flex-col items-start justify-start  bg-white">
        <div className="container mx-auto max-w-[1440px] flex-grow p-4">
          <h1 className="mb-4 text-3xl font-bold ">EVENTS</h1>
          <p className="mb-4 text-base">
            Here you can find a collection of past review packages, sorted based
            on year, classes, and finals/midterms.
          </p>
          <p className="mb-8 text-base">
            Last updated: <b>October 26th, 2023</b>
          </p>
          {events?.map((event, index) => (
            <div
              key={index}
              className="container mb-8 flex flex-col items-start justify-start gap-6 rounded-lg bg-white px-6 py-8 shadow-md"
            >
              <h2 className="mb-2 text-2xl font-bold">{event.title}</h2>
              <div className="mb-4 whitespace-pre-line text-sm">
                {event.content}
              </div>
              <div className="flex w-full flex-col justify-between space-y-4 sm:flex-row sm:items-center">
                <div className="flex flex-col">
                  <div className="mb-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8"
                    >
                      <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                      <path d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" />
                    </svg>

                    <span className="ml-2 font-bold">{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-8 w-8"
                    >
                      <path d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>

                    <span className="ml-2 font-bold">{event.location}</span>
                  </div>
                </div>
                <Link href={event.rsvpLink}>
                  <button className="whitespace-nowrap rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-black">
                    RVSP Here
                  </button>
                </Link>
              </div>
            </div>
          ))}

          <Link href="/contact">
            <p className="text-base underline">
              Can&apos;t find what you&apos;re looking for?
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
