import Container from "../layout/Container";

// Grey shimmer matching the news layout (hero + 4 horizontal + 2 vertical),
// shown only while paginating to another page.
const HBlock = () => (
  <div className="flex flex-col sm:flex-row gap-5 md:gap-8 items-start animate-pulse">
    <div className="w-[310px] sm:w-[240px] md:w-[260px] h-[220px] sm:h-[160px] md:h-[155px] bg-gray-200 rounded-xl md:rounded-sm flex-shrink-0" />
    <div className="w-full max-w-[520px]">
      <div className="h-5 w-11/12 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-full bg-gray-200 rounded mb-2" />
      <div className="h-3 w-full bg-gray-200 rounded mb-2" />
      <div className="h-3 w-2/3 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-24 bg-gray-200 rounded" />
    </div>
  </div>
);

const VBlock = () => (
  <div className="animate-pulse">
    <div className="w-full h-[180px] bg-gray-200 rounded-xl mb-3" />
    <div className="h-4 w-10/12 bg-gray-200 rounded mb-2" />
    <div className="h-3 w-full bg-gray-200 rounded mb-2" />
    <div className="h-3 w-3/4 bg-gray-200 rounded" />
  </div>
);

const NewsListSkeleton = () => {
  return (
    <>
      {/* HERO */}
      <section className="pt-10 md:pt-16 pb-10 md:pb-12">
        <Container>
          <div className="flex justify-center mb-6 md:mb-10">
            <div className="w-[968px] max-w-[1000px] h-[260px] sm:h-[340px] md:h-[484px] bg-gray-200 rounded-xl md:rounded-sm mx-auto animate-pulse" />
          </div>
          <div className="max-w-[820px] mx-auto text-center animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-3 w-full bg-gray-200 rounded mb-2" />
            <div className="h-3 w-5/6 bg-gray-200 rounded mx-auto" />
          </div>
        </Container>
      </section>

      {/* LIST */}
      <section className="mt-12 md:mt-20 mb-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[2.2fr_1fr] gap-12 md:gap-14">
            <div className="flex flex-col gap-10 md:gap-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <HBlock key={i} />
              ))}
            </div>
            <div className="flex flex-col gap-10 md:gap-12 lg:border-l border-gray-200 lg:pl-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <VBlock key={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default NewsListSkeleton;
