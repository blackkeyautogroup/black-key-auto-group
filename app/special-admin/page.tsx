"use client";

import { useEffect, useState } from "react";

export default function SpecialAdminPage() {
  const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showAddCar, setShowAddCar] = useState(false);
const [carName, setCarName] = useState("");
const [carPrice, setCarPrice] = useState("");
const [specialCars, setSpecialCars] = useState<
  { id: string; name: string; price: string }[]
>([]);

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

if (isLoggedIn) {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between border-b border-white/10 pb-8">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#d4af55]">
              BLACK KEY AUTO GROUP
            </p>

            <h1 className="text-3xl font-bold">
              SPECIAL CARS MANAGEMENT
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsLoggedIn(false)}
            className="border border-white/20 px-5 py-3 text-xs font-semibold tracking-[0.2em] text-white transition hover:border-[#d4af55] hover:text-[#d4af55]"
          >
            LOG OUT
          </button>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowAddCar(true)}
            className="bg-[#d4af55] px-7 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#edc96b]"
          >
            + ADD SPECIAL CAR
          </button>
        </div>

        {showAddCar && (
  <div className="mt-8 border border-[#d4af55]/40 p-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">
        ADD SPECIAL CAR
      </h2>

      <button
        type="button"
        onClick={() => setShowAddCar(false)}
        className="text-2xl text-white/50 transition hover:text-[#d4af55]"
      >
        ×
      </button>
    </div>
 

<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
  <div>
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      CAR NAME
    </label>

    <input
      type="text"
      value={carName}
      onChange={(e) => setCarName(e.target.value)}
      placeholder="Example: 2025 BMW M4 Competition"
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    />
  </div>

  <div>
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      PRICE
    </label>

    <input
      type="number"
      value={carPrice}
      onChange={(e) => setCarPrice(e.target.value)}
      placeholder="$ Enter price"
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    />
  </div>
</div>

<button
  type="button"
 onClick={async () => {
  if (!carName.trim() || !carPrice.trim()) return;

  const response = await fetch("/api/special-cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: carName,
      price: carPrice,
      password,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    alert(data.message || "Could not save car.");
    return;
  }

 setSpecialCars((currentCars) => [
  ...currentCars,
  {
    id: data.car.id,
    name: data.car.name,
    price: String(data.car.price),
  },
]);

  setCarName("");
  setCarPrice("");
  setShowAddCar(false);
}}
  className="mt-8 w-full bg-[#d4af55] px-6 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#edc96b]"
>
  SAVE SPECIAL CAR
</button>

      </div>
)}

{specialCars.length === 0 ? (
  <div className="mt-10 border border-white/10 px-6 py-16 text-center">
    <p className="text-sm tracking-[0.2em] text-white/40">
      NO SPECIAL CARS ADDED YET
    </p>
  </div>
) : (
  <div className="mt-10 space-y-4">
  {specialCars.map((car) => (
  <div
    key={car.id}
    className="flex items-center justify-between border border-white/10 px-6 py-5"
  >
    <p className="font-semibold text-white">
      {car.name}
    </p>

    <div className="flex items-center gap-6">
      <p className="font-semibold text-[#d4af55]">
        ${Number(car.price).toLocaleString()}
      </p>

      <button
        type="button"
        onClick={async () => {
          const confirmed = window.confirm(`Delete ${car.name}?`);

          if (!confirmed) return;

          const response = await fetch("/api/special-cars", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: car.id,
              password,
            }),
          });

          const data = await response.json();

          if (!data.success) {
            alert(data.message || "Could not delete car.");
            return;
          }

          setSpecialCars((currentCars) =>
            currentCars.filter((item) => item.id !== car.id)
          );
        }}
        className="border border-red-500/50 px-4 py-2 text-xs font-bold tracking-[0.15em] text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        DELETE
      </button>
    </div>
  </div>
))}
  </div>
)}

</div>
</main>
);
}

return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-[460px] border border-white/10 p-8 sm:p-10">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.35em] text-[#d4af55]">
            BLACK KEY AUTO GROUP
          </p>

          <h1 className="text-3xl font-bold">ADMIN ACCESS</h1>

          <p className="mt-3 text-sm text-white/40">
            Special Cars Management
          </p>
        </div>

          <div>
            <label className="mb-3 block text-xs font-semibold tracking-[0.2em] text-[#d4af55]">
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
            />
          </div>

        <button
  type="button"
  onClick={async () => {
    setError("");

    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

   if (data.success) {
  setIsLoggedIn(true);
} else {
      setError(data.message || "Incorrect password.");
    }
  }}
  className="mt-6 w-full bg-[#d4af55] px-6 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#edc96b]"
>
  SIGN IN
</button>
        </div>
    </main>
  );
}