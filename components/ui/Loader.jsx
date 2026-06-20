"use client";
const loaderAnimation = "/assets/animations/Loading_Hub6.webm";

const Loader = ({
  text = "Loading...",
  fullScreen = true,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen w-full" : "w-full py-10"
      }`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-28 h-28 object-contain"
      >
        <source src={loaderAnimation} type="video/webm" />
      </video>

      {text && (
        <p className="mt-3 text-sm md:text-base text-gray-400 tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;