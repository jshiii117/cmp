/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const FOLDER_ICON = "📁";
const FILE_ICON = "📄";

interface Folder {
  id: string;
  name: string;
  link: string;
  type: "folder";
  children: (Folder | File)[];
}

interface File {
  name: string;
  link: string;
  type: "file";
}

export default function Review() {
  const [data, setData] = useState<Folder | null>(null);
  const [history, setHistory] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchFolderData(folderId: string) {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 20000);

    try {
      const res = await fetch(`/api/getFiles?folderId=${folderId}`);
      if (!res.ok) {
        throw new Error("Error fetching folder data");
      }
      const folderData: Folder = await res.json();

      localStorage.setItem(
        `gDriveData_${folderId}`,
        JSON.stringify(folderData),
      );

      setData(folderData);
      setHistory((prev) => [...prev, folderData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching folder data:", error);
      setHistory([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchFolderData("initial");
  }, []);

  function handleFolderLevelClick(folder: Folder, level: number) {
    console.log("FOLDER:", folder);
    setLoading(true);
    void fetchFolderData(folder.id);
    // Update history by replacing subsequent levels and retaining previous levels
    setHistory((prev) => [...prev.slice(0, level), folder]);
    setData(folder);
  }

  function handleFileClick(file: File) {
    window.open(file.link, "_blank");
  }

  return (
    <>
      <button
        onClick={() => {
          console.log("DATA:", data);
          console.log("HIERARCHY:", history);
        }}
      >
        Log Data
      </button>
      <Head>
        <title>Review Packages | Commerce Mentorship Program</title>
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
      <main className="flex min-h-[600px] flex-col items-start justify-start  bg-slate-50">
        <div className="container mx-auto max-w-[1440px] flex-grow p-4">
          <h1 className="mb-4 text-3xl font-bold ">Review Package Explorer</h1>
          <p className="mb-4 text-base">
            Here you can find a collection of past review packages, sorted based
            on year, classes, and finals/midterms.
          </p>
          <p className="mb-8 text-base">
            This might take upwards of 10 seconds to load, so please be patient!
            This review package is updated regularly.
          </p>
          <div className="container flex flex-col items-start justify-start gap-12 rounded-lg bg-white px-6 py-16 shadow-lg">
            {loading ? (
              <SkeletonLoader />
            ) : data ? (
              <div>
                {history.map((folderLevel, level) => (
                  <div key={level} className="mb-4">
                    <h2 className="mb-2 text-2xl font-semibold">
                      {folderLevel.name || "Root"}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {folderLevel.children.map((child, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            child.type === "folder"
                              ? handleFolderLevelClick(child, level + 1)
                              : handleFileClick(child)
                          }
                          className={`
                          rounded-lg px-4 py-2 font-semibold text-white
                          ${
                            child.type === "folder" &&
                            child === history[level + 1]
                              ? "bg-orange-500"
                              : "bg-gray-900"
                          }
                        `}
                        >
                          {child.type === "folder" ? FOLDER_ICON : FILE_ICON}{" "}
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>Data loading timed out. Please try again later</p>
              </div>
            )}
            <Link href="/contact">
              <p className="text-base underline">
                Can&apos;t find what you&apos;re looking for?
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="mb-3 h-8 w-32 rounded-lg bg-gray-300"></div>
    <div className="mb-3 h-8 w-32 rounded-lg bg-gray-300"></div>
    <div className="mb-3 h-8 w-32 rounded-lg bg-gray-300"></div>
    <div className="mb-3 h-8 w-32 rounded-lg bg-gray-300"></div>
    <div className="mb-3 h-8 w-32 rounded-lg bg-gray-300"></div>
  </div>
);
