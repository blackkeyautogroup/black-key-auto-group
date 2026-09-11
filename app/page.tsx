"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const [showAbout, setShowAbout] = useState(false);

 const openHowItWorks = () => {
  setShowContact(false);
  setShowHowItWorks(true);
  setShowAbout(false);

  setTimeout(() => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

const openContact = () => {
  setShowHowItWorks(false);
  setShowAbout(false);
  setShowContact(true);

  setTimeout(() => {
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

const openAbout = () => {
  setShowHowItWorks(false);
  setShowContact(false);
  setShowAbout(true);

  setTimeout(() => {
    document
      .getElementById("about")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 100);
};

const goHome = () => {
  setShowContact(false);
  setShowHowItWorks(false);
  setShowAbout(false);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="absolute left-0 top-0 z-50 w-full">
       <div className="mx-auto grid max-w-[1400px] grid-cols-[180px_1fr_180px] items-center px-8 py-3">

          {/* LOGO */}
          <Link href="/">
            <Image
              src="/black-key-logo.png"
              alt="Black Key Auto Group"
              width={190}
              height={100}
              className="h-auto w-[220px] object-contain"
              priority
            />
          </Link>

          {/* MENU */}
          <nav className="hidden items-center gap-10 justify-self-center text-xs tracking-[0.15em] text-white/80 lg:flex">
           <button
  type="button"
  onClick={goHome}
  className="transition hover:text-[#d4af55]"
>
  HOME
</button>
          <button
  type="button"
  onClick={openAbout}
  className="transition hover:text-[#d4af55]"
>
  ABOUT US
</button>

           <button
  type="button"
  onClick={openContact}
  className="transition hover:text-[#d4af55]"
>
  CONTACT

</button>
          </nav>

           <div />

        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[760px] items-center overflow-hidden">
        {/* HERO CAR */}

{/* CAR BACKGROUND GLOW */}
<div className="absolute right-[2%] top-[48%] z-[1] h-[430px] w-[55%] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,85,0.16)_0%,rgba(80,55,20,0.08)_40%,transparent_72%)] blur-2xl" />

{/* CAR FLOOR SHADOW */}
<div className="absolute bottom-[115px] right-[5%] z-[1] h-[70px] w-[48%] rounded-[100%] bg-black/80 blur-3xl" />

<Image
  src="/Hero-car.png"
  alt="Black luxury sports car"
  width={900}
  height={600}
className="car-enter absolute right-[-2%] top-[53%] z-[2] w-[54%] object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)]"
  priority
/>

{/* CAR SLOGAN */}
<div className="car-slogan absolute right-[4%] top-[79%] z-[4] w-[50%] text-center">
  <p className="text-sm font-medium tracking-[0.32em] text-[#d4af55]">
    EVERY COLORFUL CAR COMES WITH A BLACK KEY AUTO GROUP
  </p>
</div>

<div className="pointer-events-none absolute right-0 top-0 z-[3] h-full w-[58%] bg-gradient-to-l from-black/25 via-transparent to-black/10" />

        {/* GOLD GLOW */}
        <div className="absolute right-0 top-0 h-full w-[60%] bg-[radial-gradient(circle_at_center,rgba(212,175,85,0.18),transparent_60%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-8 pt-28">

          <div className="max-w-[700px]">

            <p className="mb-5 text-sm tracking-[0.4em] text-[#d4af55]">
              BLACK KEY AUTO GROUP
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              FIND THE CAR.
              <br />

              <span className="text-[#d4af55]">
                WE&apos;LL HANDLE
              </span>

              <br />
              THE REST.
            </h1>

            <p className="mt-7 max-w-[540px] text-lg leading-8 text-white/60">
              Premium vehicles. Personalized service. Find the car you want
              and let Black Key Autotake care of the rest.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
  href="/inventory"
  className="bg-[#d4af55] px-7 py-4 text-sm font-bold tracking-wide text-black transition hover:bg-[#edc96b]"
>
  FIND YOUR CAR
</Link>
           <button
  type="button"
  onClick={openHowItWorks}
  className="border border-[#d4af55]/60 px-7 py-4 text-sm font-semibold tracking-wide transition hover:bg-[#d4af55] hover:text-black"
>
  HOW IT WORKS
</button>

            </div>

          </div>
        </div>

      </section>

{/* DEFAULT BENEFITS */}
{!showHowItWorks && !showContact && !showAbout && (
  <section className="border-t border-[#d4af55]/20 bg-black px-8 py-16">
    <div className="mx-auto grid max-w-[1300px] gap-8 text-center md:grid-cols-5">

      <div>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-2-[#d4af55]/50 text-[#d4af55]">
          ✓
        </div>
        <h3 className="mb-2 text-sm font-bold tracking-wide text-[#d4af55]">
          TRUSTED NETWORK
        </h3>
        <p className="text-sm leading-6 text-white/55">
          We work with top-rated dealerships you can trust.
        </p>
      </div>

      <div>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-2-[#d4af55]/50 text-2xl text-[#d4af55]">
          ◇
        </div>
        <h3 className="mb-2 text-sm font-bold tracking-wide text-[#d4af55]">
          BEST PRICE
        </h3>
        <p className="text-sm leading-6 text-white/55">
          We negotiate the best price on your behalf.
        </p>
      </div>

      <div>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-2-[#d4af55]/50 text-2xl text-[#d4af55]">
          ▤
        </div>
        <h3 className="mb-2 text-sm font-bold tracking-wide text-[#d4af55]">
          HASSLE FREE
        </h3>
        <p className="text-sm leading-6 text-white/55">
          No dealership visits. We handle everything.
        </p>
      </div>

      <div>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-2-[#d4af55]/50 text-2xl text-[#d4af55]">
          ◷
        </div>
        <h3 className="mb-2 text-sm font-bold tracking-wide text-[#d4af55]">
          SAVE TIME
        </h3>
        <p className="text-sm leading-6 text-white/55">
          We do the legwork so you don&apos;t have to.
        </p>
      </div>

      <div>
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-2-[#d4af55]/50 text-2xl text-[#d4af55]">
          ☆
        </div>
        <h3 className="mb-2 text-sm font-bold tracking-wide text-[#d4af55]">
          PREMIUM SERVICE
        </h3>
        <p className="text-sm leading-6 text-white/55">
          Concierge-level service from start to finish.
        </p>
      </div>

    </div>
  </section>
)}

      {/* HOW IT WORKS */}
      {showHowItWorks && (
<section
  id="how-it-works"
  className="border-t border-[#d4af55]/20 bg-black px-8 py-24"
>
  <div className="mx-auto max-w-[1400px]">

    <div className="mb-14 text-center">
      <p className="mb-3 text-sm tracking-[0.35em] text-[#d4af55]">
        SIMPLE. FAST. PERSONAL.
      </p>

      <h2 className="text-4xl font-bold sm:text-5xl">
        HOW IT WORKS
      </h2>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

      <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
      <div className="mb-5 text-[#d4af55]">
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-12 w-12"
  >
    <circle cx="27" cy="27" r="14" />
    <path d="M37 37L51 51" />
  </svg>
</div>

        <h3 className="mb-3 text-xl font-bold">BROWSE</h3>
        <p className="leading-7 text-white/55">
          Explore available luxury vehicles and find the one that fits you.
        </p>
      </div>

      <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
       <p className="mb-5 text-4xl text-[#d4af55]">✓</p>
        <h3 className="mb-3 text-xl font-bold">CHOOSE</h3>
        <p className="leading-7 text-white/55">
          Open the vehicle details and review photos, price and specifications.
        </p>
      </div>

      <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
        <p className="mb-5 text-4xl text-[#d4af55]">✉</p>
        <h3 className="mb-3 text-xl font-bold">REQUEST</h3>
        <p className="leading-7 text-white/55">
          Send us your vehicle request with your contact details and budget.
        </p>
      </div>

      <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
        <div className="mb-5 text-[#d4af55]">
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-12 w-12"
  >
    {/* Luxury round handle */}
    <circle cx="18" cy="18" r="10" />
    <circle cx="18" cy="18" r="4" />

    {/* Key shaft */}
    <path d="M25 25L50 50" />

    {/* Elegant key teeth */}
    <path d="M42 42L48 36" />
    <path d="M47 47L53 41" />
    <path d="M50 50L55 45" />
  </svg>
</div>
        <h3 className="mb-3 text-xl font-bold">DRIVE</h3>
        <p className="leading-7 text-white/55">
          Black Key handles the paperwork and delivers the car to you.
        </p>
      </div>

    </div>

    </div>

</section>
)}

{/* ABOUT US */}
{showAbout && (
  <section
    id="about"
    className="border-t border-[#d4af55]/20 bg-black px-8 py-24"
  >
    <div className="mx-auto max-w-[1100px] text-center">

      <p className="mb-3 text-sm tracking-[0.35em] text-[#d4af55]">
        WHO WE ARE
      </p>

      <h2 className="mb-8 text-4xl font-bold sm:text-5xl">
        ABOUT BLACK KEY AUTO GROUP
      </h2>

      <p className="mx-auto max-w-[800px] text-lg leading-8 text-white/60">
        Black Key Auto Group helps clients find premium and luxury vehicles
        with a personal, simple and professional experience.
      </p>

    </div>
  </section>
)}

{/* CONTACT */}
{showContact && (
  <section
    id="contact"
    className="border-t border-[#d4af55]/20 bg-black px-8 py-24"
  >
    <div className="mx-auto max-w-[1400px] text-center">

      <p className="mb-3 text-sm tracking-[0.35em] text-[#d4af55]">
        GET IN TOUCH
      </p>

      <h2 className="mb-12 text-4xl font-bold sm:text-5xl">
        CONTACT BLACK KEY AUTO GROUP
      </h2>

    <div className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-2">

  <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
    <p className="mb-3 text-sm tracking-[0.25em] text-[#d4af55]">
      PHONE
    </p>

    <p className="text-xl font-semibold">
      +1 (661) 636-3333
    </p>
  </div>

  <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
    <p className="mb-3 text-sm tracking-[0.25em] text-[#d4af55]">
      EMAIL
    </p>

    <p className="text-xl font-semibold">
      blackkeyautogroup33@gmail.com
    </p>
  </div>

</div>

    </div>
  </section>
)}

    </main>
  );
}