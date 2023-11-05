/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Event, type ReviewSession } from "~/types";

interface HomeProps {
  globalData: {
    reviewSessions: ReviewSession[];
    events: Event[];
  };
}

export default function Home({ globalData }: HomeProps) {
  const [upcomingItems, setUpcomingItems] = useState<(Event | ReviewSession)[]>(
    [],
  );

  useEffect(() => {
    const currentDate = new Date();

    const combinedItems = [...globalData.events, ...globalData.reviewSessions];

    const upcomingItems = combinedItems.filter(
      (item) => new Date(item.date) > currentDate,
    );

    upcomingItems.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const topUpcomingItems = upcomingItems.slice(0, 3);

    setUpcomingItems(topUpcomingItems);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `Top upcoming items: ${JSON.stringify(
          topUpcomingItems.map((item) => item.title),
        )}`,
      );
    }
  }, [globalData.events, globalData.reviewSessions]);

  return (
    <>
      <Head>
        <title>Commerce Mentorship Program</title>
        <meta
          name="description"
          content="Welcome to the Commerce Mentorship Program (CMP) – Your resource for educational guidance and events at the Sauder School of Business. Discover expert mentoring, valuable resources, and exciting events to boost your academic and professional journey. Join us today!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="xs:-mt-0 container relative mt-16 flex h-screen flex-grow flex-col-reverse items-center  justify-center lg:-mt-16  lg:flex-row ">
          <div className="area">
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <img
            src="/hero.png"
            alt="Hero"
            className="scale-75 transform md:scale-100"
          />
          <div className="z-30 items-center justify-center text-center lg:text-left">
            <h1 className="mb-4 text-5xl/snug font-bold lg:text-6xl/snug">
              <span className="text-black">
                Resources for
                <br />
                Sauder Success.
              </span>
              <br />
              <span className="text-orange-500">
                Commerce <br />
                Mentorship Program
              </span>
            </h1>
            <div className="flex flex-col space-y-5 lg:flex-row lg:space-x-4 lg:space-y-0">
              <Link href="/review">
                <button className="rounded-lg bg-black px-4 py-2 font-bold text-white transition duration-300 hover:bg-orange-600">
                  Find a review package
                </button>
              </Link>
              <Link href="#upcoming">
                <button className="rounded-lg bg-black px-4 py-2 font-bold text-white transition duration-300 hover:bg-orange-600">
                  What&apos;s happening this month?
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Orange Background Section */}
        <section className="relative mb-16 flex w-full items-center justify-center bg-orange-500 px-8 py-8 md:w-screen">
          <div className="flex w-full flex-col items-center justify-center md:flex-row">
            <div className="mb-8 flex flex-col items-center text-center md:mb-0 md:mr-8 md:items-start md:text-left">
              <h2 className="mb-4 text-4xl font-bold">
                Check out the new <br />
                review package finder.
              </h2>
              <Link href="/review">
                <button className="rounded-lg bg-black px-4 py-2 font-semibold text-white transition duration-300 hover:bg-orange-600">
                  Find a Review Package
                </button>
              </Link>
            </div>

            <img
              src="/review-explorer.png"
              alt="Rectangular Image"
              className="h-auto w-full object-contain md:h-auto md:w-auto"
            />
          </div>
        </section>

        {/* Welcome Section */}

        <section className="mx-auto max-w-3xl p-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">Welcome to the CMP!</h2>
          <p className="mb-8 text-base">
            We are a Commerce Undergraduate Society (CUS) Service that provides
            free, customized exam-preparation review sessions designed to help
            students excel in their midterms and finals.
          </p>
          <div className="mb-32 flex flex-wrap items-center justify-center">
            <img
              src="/image 3.png"
              alt="First Image"
              className="m-2 object-contain"
              style={{ maxHeight: "3.0rem" }}
            />
            <img
              src="/image 5.png"
              alt="Third Image"
              className="m-2 object-contain"
              style={{ maxHeight: "3.0rem" }}
            />
            <img
              src="/image 4.png"
              alt="Second Image"
              className="m-2 object-contain"
              style={{ maxHeight: "3.0rem" }}
            />
          </div>
          {/* Where to go section */}
          <h2 className="mb-4 text-4xl font-bold">Where to go?</h2>
          <p className="mb-8 text-base">
            <b>Review Packages</b> – This tab provides you with all of the
            review packages from our past review sessions. Just click on the
            course you need a review package for and all of the materials will
            be on its page.
            <br />
            <br />
            <b>Review Sessions</b> – This tab includes all of the information
            you need to know about our upcoming reviews sessions. This is also
            where you can RSVP to the sessions you wish to attend.
            <br />
            <br />
            <b>CMP Connect</b> – This tab is for you to ask any burning
            questions you might have for our mentors.
            <br />
            <br />
            <b>Events</b> – This tab gives you all of the information you need
            to know about upcoming events we might have, such as Internship
            Night or any CMP hiring.
          </p>
        </section>

        {/* Upcoming Items Section */}
        <section id="upcoming" className="mx-auto max-w-3xl p-4">
          <h2 className="mb-4 text-4xl font-bold">
            Upcoming Review Sessions and Events
          </h2>
          {upcomingItems.length > 0 ? (
            upcomingItems.map((item, index) => (
              <div
                key={index}
                className="container mb-8 flex flex-col items-start justify-start gap-6 rounded-lg bg-white px-6 py-8 shadow-md"
              >
                <h2 className="mb-2 text-2xl font-bold">{item.title}</h2>
                {item.content && (
                  <div className="mb-4 whitespace-pre-line text-sm">
                    {item.content}
                  </div>
                )}
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

                      <span className="ml-2 font-bold">{item.date}</span>
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

                      <span className="ml-2 font-bold">{item.location}</span>
                    </div>
                  </div>
                  {item.rsvpLink && (
                    <Link href={item?.rsvpLink}>
                      <button className="whitespace-nowrap rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-black">
                        RSVP Here
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">
              No upcoming items at this time. Check back later!
            </div>
          )}
        </section>
      </main>
    </>
  );
}
