interface TestimonialProps {
  quote: string;
  author: string;
}

export default function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[900px] mx-auto px-6 text-center">
        <p
          aria-hidden="true"
          className="font-heading text-[8rem] leading-[0.5] text-[#C96846] opacity-20 mb-8 select-none"
        >
          &ldquo;
        </p>
        <blockquote className="font-heading text-[1.5rem] md:text-[2rem] leading-[1.6] text-[#2A2A2A]">
          {quote}
        </blockquote>
        <p className="font-body text-[1rem] uppercase tracking-[2px] text-[#999] mt-8">
          {author}
        </p>
      </div>
    </section>
  );
}
