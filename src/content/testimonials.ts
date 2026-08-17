/**
 * Client testimonials, migrated verbatim from the live site's `testimonials`
 * array. Names, roles and quotes are unchanged — these are real reviews.
 */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Jaswinder & Reet",
    role: "Custom Family Home",
    quote:
      "Building our home with ARC Builders happened during one of the most important times of our lives. We were preparing to welcome our baby, and their team became a source of calm and reassurance. They didn't just build us a house; they created a warm, safe space where our new journey as a family could begin. We are deeply grateful to ARC Builders for turning such a special chapter of our lives into a truly beautiful experience.",
  },
  {
    id: "2",
    name: "Dr Tarunveer Bakshi & Dr Inderpreet Kaur",
    role: "Custom Home Abode",
    quote:
      "Our home build journey with ARC Builders was nothing short of exceptional. They brought our abode to life with a refined approach, blending modern design with practical functionality. The project was managed with precision and a strong sense of organisation, ensuring timelines were met without compromising on quality. We are extremely satisfied and would highly recommend ARC Builders for any custom home build.",
  },
  {
    id: "3",
    name: "Shakar Rahim and Shezadi Naz",
    role: "Custom Home",
    quote:
      "ARC Builders brought our vision of a custom home to life with remarkable precision. The finished home embodies warmth and individuality that truly reflects who we are. We would highly recommend ARC Builders to anyone seeking a home that blends comfort with modern elegance.",
  },
  {
    id: "4",
    name: "Dr Amer Malik and Dr Anum Cheema",
    role: "Modern Family Home",
    quote:
      "Building our home with ARC Builders was an exceptional experience. They understood the essence of modern family living, creating a space that balances openness, functionality, and refined design. Delivered with precision, clear communication, and impeccable attention to detail, the entire process was seamless.",
  },
  {
    id: "5",
    name: "Amer Chowdry and Dr Maimuna Akbar",
    role: "Medical Centre Development",
    quote:
      "Engaging ARC Builders for our medical centre was a truly outstanding experience. Their professionalism, transparent communication, and disciplined adherence to timelines ensured a seamless and stress-free process. ARC Builders have delivered a space that reflects excellence in every sense, and we would confidently recommend them for commercial and specialised developments.",
  },
];
