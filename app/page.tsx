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
     <div className="mx-auto grid max-w-[1400px] grid-cols-[180px_1fr_180px] items-center px-3 py-3 sm:px-8">

          {/* LOGO */}
          <Link href="/" className="absolute left-0 top-3 sm:static">
            <Image
              src="/black-key-logo.png"
              alt="Black Key Auto Group"
              width={190}
              height={100}
             className="relative -left-3 h-auto w-[160px] object-contain sm:left-0 sm:w-[220px]"
              priority
            />
          </Link>

          {/* MENU */}
      <nav className="absolute left-[34%] top-12 flex items-center gap-4 text-[10px] tracking-[0.12em] text-white/80 sm:static sm:justify-self-center sm:gap-6 sm:text-xs lg:gap-10">
           
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

          {/* Social Media Links */}
<div className="social-enter absolute right-6 top-[85px] z-50 text-center sm:right-8 sm:top-8">
  <p className="mb-3 text-[11px] tracking-[0.22em] text-white/60">
    VISIT OUR SOCIAL MEDIAS
  </p>

  <div className="flex items-center justify-center gap-3">
    <a
      href="https://www.instagram.com/blackkey_autogroup/"
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[#d4af55] px-4 py-2 text-xs tracking-[0.15em] text-[#d4af55] transition hover:bg-[#d4af55] hover:text-black"
    >
      INSTAGRAM
    </a>

    <a
      href="https://www.facebook.com/share/18szq2aYQL/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      className="border border-[#d4af55] px-4 py-2 text-xs tracking-[0.15em] text-[#d4af55] transition hover:bg-[#d4af55] hover:text-black"
    >
      FACEBOOK
    </a>
  </div>
</div>

           <div />

        </div>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-[760px] items-center overflow-hidden">
        {/* HERO CAR */}

{/* CAR BACKGROUND GLOW */}
<div className="absolute right-[-10%] top-[56%] z-[1] h-[300px] w-[70%] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,85,0.14)_0%,rgba(80,55,20,0.06)_45%,transparent_75%)] blur-2xl sm:right-[2%] sm:top-[48%] sm:h-[430px] sm:w-[55%]" />

{/* CAR FLOOR SHADOW */}
<div className="absolute bottom-[115px] right-[5%] z-[1] h-[70px] w-[48%] rounded-[100%] bg-black/80 blur-3xl" />

<Image
  src="/Hero-car.png"
  alt="Black luxury sports car"
  width={900}
  height={600}
className="car-enter absolute right-[-2%] top-[59%] z-[2] w-[56%] object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,0.95)] sm:right-[-2%] sm:top-[53%] sm:w-[54%]"
  priority
/>

{/* CAR SLOGAN */}
<div className="car-slogan absolute right-[10%] top-[68%] z-[4] w-[55%] text-center sm:right-[4%] sm:top-[79%] sm:w-[50%]">
  <p className="whitespace-nowrap text-[8px] font-medium tracking-[0.16em] text-[#d4af55] sm:text-sm sm:tracking-[0.32em]">
    EVERY COLORFUL CAR COMES WITH A BLACK KEY
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

            <h1 className="text-4xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
              FIND THE CAR.
              <br />

              <span className="text-[#d4af55]">
                WE&apos;LL HANDLE
              </span>

              <br />
              THE REST.
            </h1>

            <p className="mt-10 w-[44%] text-[14px] leading-6 text-white/60 sm:mt-6 sm:w-auto sm:max-w-[620px] sm:text-lg sm:leading-8">
              Premium vehicles. Personalized service. Find the car you want
              and let Black Key Auto Group take care of the rest.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
  href="/find-your-car"
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
        <svg
  viewBox="0 0 24 24"
  className="mb-5 h-10 w-10 text-[#d4af55]"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.8"
>
  <rect x="3" y="5" width="18" height="14" rx="2" />
  <path d="M3 7l9 6 9-6" />
</svg>
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

     <h2 className="mb-10 text-3xl font-bold leading-tight sm:text-5xl">
  CONTACT BLACK KEY AUTO GROUP
</h2>

    <div className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-2">

  <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
    <p className="mb-3 text-sm tracking-[0.25em] text-[#d4af55]">
      PHONE
    </p>

   <p className="text-lg font-semibold sm:text-xl">
  +1 (661) 636-3333
</p>
  </div>

  <div className="border border-white/10 p-8 transition duration-300 hover:-translate-y-2 hover:border-[#d4af55]/60">
    <p className="mb-3 text-sm tracking-[0.25em] text-[#d4af55]">
      EMAIL
    </p>

   <p className="break-all text-base font-semibold sm:text-xl">
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