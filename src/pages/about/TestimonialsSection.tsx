/* eslint-disable @next/next/no-img-element */
// components/TestimonialsSection.js

const testimonials = [
  {
    avatar:
      "https://media.licdn.com/dms/image/D5603AQFJMZJ97evNIA/profile-displayphoto-shrink_800_800/0/1695981761899?e=1703721600&v=beta&t=uYpZQSupd5r1UjpQCnMT1tq04s1l2FzlRkiQ7QNsMNQ",
    text: "The CMP is amazing. I love the CMP. CMP helped me alot!",
    author: "James Shi, BUCS",
  },
  {
    avatar:
      "https://media.licdn.com/dms/image/D5603AQFJMZJ97evNIA/profile-displayphoto-shrink_800_800/0/1695981761899?e=1703721600&v=beta&t=uYpZQSupd5r1UjpQCnMT1tq04s1l2FzlRkiQ7QNsMNQ",
    text: "The CMP is amazing. I love the CMP. CMP helped me alot!",
    author: "James Shi, BUCS",
  },
  {
    avatar:
      "https://media.licdn.com/dms/image/D5603AQFJMZJ97evNIA/profile-displayphoto-shrink_800_800/0/1695981761899?e=1703721600&v=beta&t=uYpZQSupd5r1UjpQCnMT1tq04s1l2FzlRkiQ7QNsMNQ",
    text: "The CMP is amazing. I love the CMP. CMP helped me alot!",
    author: "James Shi, BUCS",
  },
  // Add more testimonials as needed
];

export default function TestimonialsSection() {
  return (
    <div>
      {/* <h1 className="mb-4 text-3xl font-bold">Testimonials</h1> */}

      <div className=" flex flex-wrap items-center justify-center gap-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center"
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="mr-4 h-24 w-24 rounded-full"
            />
            <div>
              <p className="text-base">{testimonial.text}</p>
              <p className="text-sm font-bold">{testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
