/* eslint-disable @next/next/no-img-element */

export default function ContactPage() {
  return (
    <>
      <div className="left-0 right-0 top-0 h-32 w-full overflow-hidden">
        <img
          src="/banner.png"
          alt="ubc banner"
          className="h-auto w-full object-center"
        />
      </div>
      <div className="container min-h-[600px] max-w-[1440px] flex-grow p-4">
        <div className="justify-center p-4">
          <h1 className="mb-4 text-3xl font-bold">Contact Us</h1>
          <p className="mb-4 text-base">
            If you&apos;re looking for a specific review package, have questions
            about our upcoming or past events, or any other questions related to
            CMP, feel free to reach out at our social medias!
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <SocialMediaPreview
              title="Facebook"
              url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fubccmp&tabs=timeline&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=679565103641455"
            />
            <SocialMediaPreview
              title="Instagram"
              url="https://www.instagram.com/ubccmp"
            />
          </div>
        </div>
      </div>
    </>
  );
}

interface SocialMediaPreviewProps {
  title: string;
  url: string;
}

function SocialMediaPreview({ title, url }: SocialMediaPreviewProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
    >
      <div className="rounded-md bg-white p-4 shadow-md">
        <iframe
          src={url}
          title={title}
          width="100%"
          frameBorder={0}
          scrolling="no"
        ></iframe>
      </div>
      <p className="mt-2 text-center font-semibold">{title}</p>
    </a>
  );
}
