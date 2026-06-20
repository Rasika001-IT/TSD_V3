"use client";
const Container = ({ children }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
      {children}
    </div>
  );
};

export default Container;