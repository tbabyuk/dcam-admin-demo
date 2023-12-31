"use client"

import Link from "next/link";

const Dashboard = () => {

  const today = new Date();
  const dateFormatted = today.toLocaleString("default", { dateStyle: "full" });


  return (
    <main className="home-page px-6 md:px-24 xl:px-48 pt-16 lg:flex">
      {/* left side */}
      <div className="left-side flex flex-col items-center mb-20 lg:mb-0 lg:pe-16 lg:border-r-2 border-gray-300">
        <h2 className="text-2xl font-semibold mb-14 text-gray-700">
          Quick Access Menu
        </h2>
        <span className="mb-16 font-light">{dateFormatted}</span>
        <Link href="/todos">
          <button className="dcam-btn mb-8">TO DO TASKS</button>
        </Link>
        <Link href="/calendar">
          <button className="dcam-btn mb-8">CALENDAR</button>
        </Link>
        <Link href="/hours">
          <button className="dcam-btn mb-8">TEACHER HOURS</button>
        </Link>
      </div>

      {/* right side */}
      <div className="right-side flex flex-col lg:ps-16">
        <h2 className="text-2xl font-semibold text-center mb-12 text-gray-700">
          Our Mission Statement
        </h2>
        <h4 className="text-xl mb-3">
          1. To enrich the lives of our students through music
        </h4>
        <p className="mb-12 font-light">
          We strongly believe that playing a musical instrument makes life
          richer, more interesting and more colourful. We are proud to be able
          to impart this skill to our students.
        </p>
        <h4 className="text-xl mb-3">
          2. To provide quality music education tailored to our students’ goals,
          abilities, and interests
        </h4>
        <p className="mb-12 font-light">
          We listen to our students and parents carefully and do our best to
          tailor their lessons in a way that would best meet their individual
          goals, abilities, and interests.
        </p>
        <h4 className="text-xl mb-3">
          3. To create a fun, safe, friendly, and inclusive environment for both
          students and teachers
        </h4>
        <p className="font-light">
          We are convinced that people learn and work best in an environment
          that is fun, safe, friendly, and inclusive. Maintaining such an
          environment is one of our top priorities.
        </p>
      </div>
      <div></div>
    </main>
  );
}

export default Dashboard
