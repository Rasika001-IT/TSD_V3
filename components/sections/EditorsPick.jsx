"use client";
import Container from "../layout/Container";

const articles = [
  {
    number: "01",
    category: "Opinion",
    title: "Why Remote Work is Here to Stay",
    author: "Dr. Amanda Foster",
    time: "4 min",
  },
  {
    number: "02",
    category: "Analysis",
    title: "The Hidden Costs of Fast Growth",
    author: "Robert Kline",
    time: "7 min",
  },
  {
    number: "03",
    category: "Profile",
    title: "Meet the Youngest Billionaire Philanthropist",
    author: "Sophia Martinez",
    time: "10 min",
  },
  {
    number: "04",
    category: "Strategy",
    title: "Mastering the Art of Business Pivots",
    author: "Thomas Wright",
    time: "6 min",
  },
];

const EditorsPick = () => {
  return (
    <section className="bg-[#C89632]/5 py-24">

      <Container>

        {/* HEADER */}
        <div className="mb-12">
          <span className="bg-[#C89632]/20 text-[#C89632] text-xs px-3 py-1 uppercase tracking-widest">
            Curated Selection
          </span>

          <h2 className="font-heading font-bold text-4xl mt-4">
            Editor’s Pick
          </h2>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT - COMPACT QUOTE CARD */}
          <div className="relative border border-black/10 px-6 py-6 max-w-[420px]">

            {/* GOLD LINE */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-[#C89632]" />

            {/* TEXT */}
            <p className="italic text-[14px] leading-relaxed text-black/80">
              “Tis week, we’ve selected stories that challenge conventional thinking and offer fresh perspectives on the evolving business landscape”
            </p>

            {/* AUTHOR */}
            <div className="flex items-center gap-3 mt-6">

              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold">
                JM
              </div>

              <div>
                <p className="text-[13px] font-medium">Jessica Moore</p>
                <p className="text-[11px] text-black/60">Editor In Chief</p>
              </div>

            </div>

          </div>

          {/* RIGHT - ARTICLES */}
          <div className="flex flex-col gap-10">

            {articles.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">

                {/* NUMBER */}
                <div className="text-[48px] font-heading text-black/25 leading-none">
                  {item.number}
                </div>

                {/* CONTENT */}
                <div>
                  <p className="text-[#C89632] text-[11px] uppercase tracking-widest mb-1 font-semibold">
                    {item.category}
                  </p>

                  <h3 className="font-heading font-semibold text-[20px] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-black/60 mt-1">
                    {item.author} | {item.time}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>

      </Container>

    </section>
  );
};

export default EditorsPick;