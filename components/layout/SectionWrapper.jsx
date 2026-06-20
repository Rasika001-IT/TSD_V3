"use client";
const SectionWrapper = ({ children, className = "" }) => {
  return (
    <section className={`py-16 ${className}`}>
      {children}
    </section>
  );
};

export default SectionWrapper;