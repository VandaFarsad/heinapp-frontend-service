import React from "react";

export const Section = ({
  id,
  title,
  children,
  className = "py-20 md:py-32 px-6",
  titleClassName = "text-4xl md:text-5xl font-bold text-center text-gray-400 mb-16 tracking-tight",
  containerClassName = "max-w-6xl mx-auto",
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  containerClassName?: string;
}) => (
  <section id={id} className={className}>
    <div className={containerClassName}>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </div>
  </section>
);
