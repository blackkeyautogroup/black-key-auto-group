"use client";

import { useEffect, useState } from "react";

export default function SpecialCarsPage() {
  const [specialCars, setSpecialCars] = useState<
  { id: string; name: string; price: string }[]
>([]);

const [selectedCar, setSelectedCar] = useState<{
  id: string;
  name: string;
  price: string;
} | null>(null);

const [purchaseType, setPurchaseType] = useState("");
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [zipCode, setZipCode] = useState("");
const [details, setDetails] = useState("");

useEffect(() => {
  const loadSpecialCars = async () => {
    const response = await fetch("/api/special-cars", {
      cache: "no-store",
    });

    const data = await response.json();

    if (data.success) {
      setSpecialCars(
        (data.cars || []).map(
          (car: { id: string; name: string; price: number | string }) => ({
            id: car.id,
            name: car.name,
            price: String(car.price),
          })
        )
      );
    }
  };

  loadSpecialCars();
}, []);
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-24 sm:px-10">
        <div className="text-center">
          <p className="mb-4 text-sm font-semibold tracking-[0.35em] text-[#d4af55]">
            BLACK KEY AUTO GROUP
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            SPECIAL CARS
          </h1>

          <div className="mx-auto mt-6 h-[1px] w-24 bg-[#d4af55]" />

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            A hand-selected collection of exceptional vehicles available
            through Black Key Auto Group.
          </p>
        </div>

       {specialCars.length === 0 ? (
  <div className="mt-20 border border-white/10 px-6 py-20 text-center">
    <p className="text-sm tracking-[0.25em] text-white/40">
      NO SPECIAL CARS AVAILABLE
    </p>
  </div>
) : (
  <div className="mx-auto mt-16 max-w-[900px] space-y-4">
    {specialCars.map((car) => (
      <button
        key={car.id}
        type="button"
        onClick={() => setSelectedCar(car)}
        className="flex w-full items-center justify-between border border-white/15 bg-black px-6 py-6 text-left transition hover:border-[#d4af55]"
      >
        <span className="text-lg font-semibold text-white">
          {car.name}
        </span>

        <span className="text-lg font-bold text-[#d4af55]">
          ${Number(car.price).toLocaleString()}
        </span>
      </button>
    ))}
  </div>
)}
     
     {selectedCar && (
  <div className="mx-auto mt-10 max-w-[900px] border border-[#d4af55]/40 p-8">
    <div className="flex items-center justify-between border-b border-white/10 pb-6">
      <div>
        <p className="text-sm tracking-[0.2em] text-[#d4af55]">
          SELECTED SPECIAL CAR
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          {selectedCar.name}
        </h2>
      </div>

      <p className="text-xl font-bold text-[#d4af55]">
        ${Number(selectedCar.price).toLocaleString()}
      </p>
    </div>

    <div className="mt-8">
      <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
        PURCHASE TYPE
      </label>

      <select
        value={purchaseType}
        onChange={(e) => setPurchaseType(e.target.value)}
        className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
      >
        <option value="">Select Purchase Type</option>
        <option value="finance">Finance</option>
        <option value="lease">Lease</option>
      </select>
    </div>

<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
  <div>
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      FIRST & LAST NAME
    </label>

    <input
      type="text"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      placeholder="Enter your full name"
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    />
  </div>

  <div>
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      PHONE
    </label>

    <input
      type="tel"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="Enter your phone number"
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    />
  </div>
</div>

<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
  <div>
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      EMAIL
    </label>

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    />
  </div>

  <div>
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      ZIP CODE
    </label>

    <input
      type="text"
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
      placeholder="Enter ZIP code"
      maxLength={5}
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    />
  </div>
</div>

<div className="mt-8">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    OPTIONAL NOTES
  </label>

  <textarea
    value={details}
    onChange={(e) => setDetails(e.target.value)}
    placeholder="Anything else you'd like us to know?"
    rows={5}
    className="w-full resize-none border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
  />
</div>

<button
  type="button"
  onClick={async () => {
    if (!selectedCar) return;

    if (
      !purchaseType ||
      !fullName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !/^\d{5}$/.test(zipCode)
    ) {
      alert("Please complete all required fields and enter a valid 5-digit ZIP code.");
      return;
    }

    const response = await fetch("/api/send-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        specialCarName: selectedCar.name,
        specialCarPrice: selectedCar.price,
        purchaseType,
        fullName,
        phone,
        email,
        zipCode,
        details,
      }),
    });

    if (!response.ok) {
      alert("Could not send request. Please try again.");
      return;
    }

    alert("Request sent successfully!");

    setPurchaseType("");
    setFullName("");
    setPhone("");
    setEmail("");
    setZipCode("");
    setDetails("");
    setSelectedCar(null);
  }}
  className="mt-8 w-full bg-[#d4af55] px-6 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#edc96b]"
>
  SEND REQUEST
</button>

  </div>
)}
      </section>
    </main>
  );
}