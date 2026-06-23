// Themed audio-podcast banner shown on a magazine reader page when the edition
// has `podcast_audio` set. Native <audio> player (no external deps) wrapped in a
// site-themed card: cream/white surface, gold (#C89632) accent, Canela heading.
const PodcastCard = ({ src, title }) => {
  if (!src) return null;

  return (
    <div className="max-w-6xl mx-auto mt-20 px-6">
      <div className="rounded-2xl bg-white border border-[#C89632]/20 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-start sm:items-center gap-5">
          {/* Headphone icon in a gold circle */}
          <div className="shrink-0 w-14 h-14 rounded-full bg-[#C89632]/12 flex items-center justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C89632"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 14v-2a9 9 0 0 1 18 0v2" />
              <path d="M21 16a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h3z" />
              <path d="M3 16a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H3z" />
            </svg>
          </div>

          <div className="min-w-0">
            <span className="text-[#C89632] text-xs uppercase tracking-wide">Listen to the Podcast</span>
            <h3 className="font-serif text-2xl mt-1 leading-snug">{title}</h3>
          </div>
        </div>

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls preload="none" src={src} className="mt-6 w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default PodcastCard;
