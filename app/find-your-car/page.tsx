"use client";

import { useEffect, useState } from "react";
import { carDatabase } from "./carData";
type VehicleModel = {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
};

const carMakes = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "FIAT",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hummer",
  "Hyundai",
  "INFINITI",
  "Jaguar",
  "Jeep",
  "Kia",
  "Koenigsegg",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Lucid",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mercury",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Oldsmobile",
  "Pagani",
  "Polestar",
  "Pontiac",
  "Porsche",
  "RAM",
  "Rimac",
  "Rivian",
  "Rolls-Royce",
  "Saab",
  "Saturn",
  "Scion",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];



export default function FindYourCarPage() {

const [selectedYear, setSelectedYear] = useState("");
const [selectedMake, setSelectedMake] = useState("");
const [selectedModel, setSelectedModel] = useState("");
const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
const [zipCode, setZipCode] = useState("");
const isZipValid = /^\d{5}$/.test(zipCode);
const [budget, setBudget] = useState("");
const [mileage, setMileage] = useState("");
const [color, setColor] = useState("");
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [details, setDetails] = useState("");
const [downPayment, setDownPayment] = useState("");
const [estimatedCredit, setEstimatedCredit] = useState("");
const [targetPayment, setTargetPayment] = useState("");
const [negativeEquity, setNegativeEquity] = useState("");
const [purchaseType, setPurchaseType] = useState("");
const [leaseMonths, setLeaseMonths] = useState("");
const [leaseMileage, setLeaseMileage] = useState("");
const [financeMonths, setFinanceMonths] = useState("");
const [leaseVehiclePrice, setLeaseVehiclePrice] = useState("");
const [showSuccess, setShowSuccess] = useState(false);

const estimatedMonthlyPayment = (() => {
  const price = Number(budget);
  const down = Number(downPayment) || 0;
  const months = Number(financeMonths);

  if (!price || !months || purchaseType !== "finance") {
    return null;
  }

  const amountFinanced = Math.max(price - down, 0);

  const aprByCredit: Record<string, number> = {
    "300-579": 18,
    "580-669": 12,
    "670-739": 8,
    "740-799": 6,
    "800-850": 5,
  };



  const apr = aprByCredit[estimatedCredit] ?? 8;
  const monthlyRate = apr / 100 / 12;

  const payment =
    (amountFinanced * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -months));

  return Math.round(payment);
})();

const estimatedLeasePayment = (() => {
  const price = Number(leaseVehiclePrice);
  const down = Number(downPayment) || 0;
  const months = Number(leaseMonths);

  if (
    !price ||
    !months ||
    !leaseMileage ||
    purchaseType !== "lease"
  ) {
    return null;
  }

  // Approximate residual value based on lease term
  const residualPercent =
    months === 24 ? 0.68 :
    months === 36 ? 0.60 :
    months === 48 ? 0.52 :
    0.60;

  // Mileage adjustment
  const mileageAdjustment: Record<string, number> = {
    "5000": 0.03,
    "7500": 0.02,
    "10000": 0,
    "12000": -0.02,
    "15000": -0.04,
  };

  const adjustedResidualPercent =
    residualPercent + (mileageAdjustment[leaseMileage] ?? 0);

  const residualValue = price * adjustedResidualPercent;
  const adjustedPrice = Math.max(price - down, 0);

  // Approximate money factor based on selected credit range
  const moneyFactorByCredit: Record<string, number> = {
    "300-579": 0.006,
    "580-669": 0.0045,
    "670-739": 0.0032,
    "740-799": 0.0023,
    "800-850": 0.0018,
  };

  const moneyFactor = moneyFactorByCredit[estimatedCredit] ?? 0.0032;

  const depreciation =
    (adjustedPrice - residualValue) / months;

  const financeCharge =
    (adjustedPrice + residualValue) * moneyFactor;

  const payment = depreciation + financeCharge;

  return Math.max(Math.round(payment), 0);
})();

useEffect(() => {
  if (!selectedYear || !selectedMake || selectedYear === "older") {
    setVehicleModels([]);
    return;
  }

  const loadModels = async () => {
    try {
      const response = await fetch(
       `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(
  selectedMake
)}/modelyear/${selectedYear}/vehicletype/passenger%20car?format=json`
      );

      const data = await response.json();
     const cleanedModels = (data.Results || [])
  .filter(
    (model: VehicleModel) =>
      model.Model_Name &&
      !/\(\d+\)/.test(model.Model_Name)
  )
  .filter(
    (model: VehicleModel, index: number, array: VehicleModel[]) =>
      index ===
      array.findIndex(
        (item) =>
          item.Model_Name.toLowerCase() === model.Model_Name.toLowerCase()
      )
  )
  .sort((a: VehicleModel, b: VehicleModel) =>
    a.Model_Name.localeCompare(b.Model_Name)
  );

setVehicleModels(cleanedModels);
    } catch (error) {
      console.error("Failed to load vehicle models:", error);
      setVehicleModels([]);
    }
  };

  loadModels();
}, [selectedYear, selectedMake]);

const handleSubmit = async () => {
  if (!isZipValid) return;

  try {
    const response = await fetch("/api/send-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedYear,
        selectedMake,
        selectedModel,
        budget,
        mileage,
        color,
        fullName,
        phone,
        email,
        zipCode,
        details,
        downPayment,
estimatedCredit,
targetPayment,
negativeEquity,
purchaseType,
leaseVehiclePrice,
leaseMonths,
leaseMileage,
financeMonths,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      setShowSuccess(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Failed to send request:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8">
        <p className="mb-3 text-sm tracking-[0.35em] text-[#d4af55]">
          BLACK KEY AUTO GROUP
        </p>

        <h1 className="text-4xl font-bold sm:text-6xl">
          FIND YOUR <span className="text-[#d4af55]">CAR</span>
        </h1>
     <div className="mx-auto mt-8 grid max-w-[1200px] grid-cols-1 gap-x-5 md:grid-cols-2">

     
      <div className="max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    YEAR
  </label>
  

 <select
  value={selectedYear}
  onChange={(e) => {
    setSelectedYear(e.target.value);
    setSelectedMake("");
    setSelectedModel("");
  }}
  className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
>
    <option value="">Select Year</option>
   {Array.from({ length: 48 }, (_, i) => 2027 - i).map((year) => (
  <option key={year} value={year}>
    {year}
  </option>
))}

<option value="older">Older / Classic</option>
  </select>
  </div>


<div className="max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    MAKE
  </label>

<div className="flex items-stretch gap-3">

  <select
    value={selectedMake}
    onChange={(e) => {
      setSelectedMake(e.target.value);
      setSelectedModel("");
    }}
    disabled={!selectedYear}
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition"
  >
    <option value="">Select Make</option>

    {carMakes.map((make) => (
      <option key={make} value={make}>
        {make}
      </option>
    ))}

    <option value="other">Other Make</option>
  </select>

  <a
    href="/special-cars"
    className="flex shrink-0 items-center justify-center border border-[#d4af55] px-5 text-sm font-semibold tracking-[0.15em] text-[#d4af55] transition hover:bg-[#d4af55] hover:text-black"
  >
    SPECIAL CARS
  </a>

</div>
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    MODEL
  </label>

  <select
    value={selectedModel}
    onChange={(e) => setSelectedModel(e.target.value)}
    disabled={!selectedYear || !selectedMake}
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55] disabled:cursor-not-allowed disabled:opacity-40"
  >
    <option value="">Select Model</option>

{vehicleModels.map((car, index) => (
 <option
  key={`${car.Make_ID}-${car.Model_ID}-${car.Model_Name}-${index}`}
  value={car.Model_Name}
>
    {car.Model_Name}
  </option>
))}
  </select>
</div>



<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    MAX MONTHLY MILEAGE
  </label>

  <input
    type="number"
    value={mileage}
    onChange={(e) => setMileage(e.target.value)}
    placeholder="Enter maximum monthly mileage"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    PREFERRED COLOR
  </label>

  <input
    type="text"
    value={color}
    onChange={(e) => setColor(e.target.value)}
    placeholder="Example: Black, White, Red..."
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>
<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    FIRST & LAST NAME
  </label>

  <input
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    placeholder="Enter your full name"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    PHONE NUMBER
  </label>

  <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Example: +1 (555) 123-4567"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    EMAIL
  </label>

  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    ZIP CODE
  </label>

  <input
    type="text"
    inputMode="numeric"
    value={zipCode}
    onChange={(e) => setZipCode(e.target.value)}
    placeholder="Enter your ZIP code"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
  {zipCode && !isZipValid && (
  <p className="mt-2 text-sm text-red-500">
    Please enter a valid 5-digit ZIP code.
  </p>
)}
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    DOWN PAYMENT
  </label>

  <input
    type="number"
    value={downPayment}
    onChange={(e) => setDownPayment(e.target.value)}
    placeholder="$ Enter down payment"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    ESTIMATED CREDIT
  </label>

  <select
    value={estimatedCredit}
    onChange={(e) => setEstimatedCredit(e.target.value)}
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
  >
    <option value="">Select Credit Range</option>
    <option value="300-579">300 - 579</option>
    <option value="580-669">580 - 669</option>
    <option value="670-739">670 - 739</option>
    <option value="740-799">740 - 799</option>
    <option value="800-850">800 - 850</option>
  </select>
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    TARGET PAYMENT
  </label>

  <input
    type="number"
    value={targetPayment}
    onChange={(e) => setTargetPayment(e.target.value)}
    placeholder="$ Enter target monthly payment"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[500px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    NEGATIVE EQUITY / IF ANY
  </label>

  <input
    type="number"
    value={negativeEquity}
    onChange={(e) => setNegativeEquity(e.target.value)}
    placeholder="$ Enter negative equity"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-[#d4af55]"
  />
</div>

<div className="mt-8 max-w-[1032px] md:col-span-2">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    PURCHASE TYPE
  </label>

  <select
    value={purchaseType}
    onChange={(e) => setPurchaseType(e.target.value)}
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
  >
    <option value="">Select Finance or Lease</option>
    <option value="finance">Finance</option>
    <option value="lease">Lease</option>
  </select>
</div>

{purchaseType === "finance" && (
  <div className="mt-8 w-full max-w-[625px]">
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      BUDGET
    </label>

    <input
      type="number"
      value={budget}
      onChange={(e) => setBudget(e.target.value)}
      placeholder="$ Enter your budget"
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
    />
  </div>
)}

{purchaseType === "finance" && (
  <div className="mt-8 w-full max-w-[625px]">
    <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
      FINANCE TERM
    </label>

    <select
      value={financeMonths}
      onChange={(e) => setFinanceMonths(e.target.value)}
      className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
    >
      <option value="">Select Months</option>
      {Array.from({ length: 73 }, (_, i) => i + 12).map((month) => (
        <option key={month} value={month}>
          {month} Months
        </option>
      ))}
    </select>
  </div>
)}

{purchaseType === "finance" && estimatedMonthlyPayment !== null && (
  <div className="mt-8 max-w-[500px] border border-[#d4af55] px-6 py-6">
    <p className="mb-2 text-sm font-semibold tracking-[0.20em] text-[#d4af55]">
      ESTIMATED MONTHLY PAYMENT
    </p>

    <p className="text-4xl font-bold text-white">
      ${estimatedMonthlyPayment.toLocaleString()}
      <span className="ml-2 text-base font-normal text-white/50">
        / month
      </span>
    </p>

    <p className="mt-3 text-xs leading-5 text-white/40">
      Estimated payment only. Actual payment may vary based on APR, taxes,
      fees, financing terms, and lender approval.
    </p>
  </div>
)}

{purchaseType === "lease" && (
  <>

  <div className="mt-8 max-w-[625px]">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    VEHICLE PRICE
  </label>

  <input
    type="number"
    value={leaseVehiclePrice}
    onChange={(e) => setLeaseVehiclePrice(e.target.value)}
    placeholder="$ Enter vehicle price"
    className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>

    <div className="mt-8 max-w-[500px]">
      <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
        LEASE TERM
      </label>

      <select
        value={leaseMonths}
        onChange={(e) => setLeaseMonths(e.target.value)}
        className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
      >
        <option value="">Select Months</option>
        <option value="24">24 Months</option>
        <option value="36">36 Months</option>
        <option value="48">48 Months</option>
      </select>
    </div>

    <div className="mt-8 max-w-[500px]">
      <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
        ANNUAL MILEAGE
      </label>

      <select
        value={leaseMileage}
        onChange={(e) => setLeaseMileage(e.target.value)}
        className="w-full border border-white/20 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af55]"
      >
        <option value="">Select Mileage</option>
        <option value="5000">5,000 Miles</option>
        <option value="7500">7,500 Miles</option>
        <option value="10000">10,000 Miles</option>
        <option value="12000">12,000 Miles</option>
        <option value="15000">15,000 Miles</option>
      </select>
    </div>
  </>
)}

{purchaseType === "lease" && estimatedLeasePayment !== null && (
  <div className="mt-8 max-w-[500px] border border-[#d4af55] px-6 py-6">
    <p className="mb-2 text-sm font-semibold tracking-[0.20em] text-[#d4af55]">
      ESTIMATED MONTHLY LEASE PAYMENT
    </p>

    <p className="text-4xl font-bold text-white">
      ${estimatedLeasePayment.toLocaleString()}
      <span className="ml-2 text-base font-normal text-white/50">
        / month
      </span>
    </p>

    <p className="mt-3 text-xs leading-5 text-white/40">
      Estimated lease payment only. Actual payment may vary based on vehicle
      residual value, money factor, taxes, fees, incentives, mileage allowance,
      and lender approval.
    </p>
  </div>
)}

<div className="mt-8 max-w-[1032px] md:col-span-2">
  <label className="mb-3 block text-sm font-semibold tracking-[0.2em] text-[#d4af55]">
    ADDITIONAL DETAILS
  </label>

  <textarea
    rows={5}
    value={details}
    onChange={(e) => setDetails(e.target.value)}
    placeholder="Tell us anything else you're looking for..."
    className="w-full resize-none border border-white/20 bg-black px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-[#d4af55]"
  />
</div>

<div className="mt-10 max-w-[1032px] md:col-span-2">
  <button
    type="button"
    onClick={handleSubmit}
    disabled={!isZipValid}
    className="w-full bg-[#d4af55] px-7 py-4 text-sm font-bold tracking-[0.15em] text-black transition hover:bg-[#edc96b]"
  >
    SEND REQUEST
  </button>
</div>

</div>

 </section>
    

{showSuccess && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm">
    <div className="w-full max-w-[460px] border border-[#d4af55]/50 bg-black p-8 text-center shadow-2xl sm:p-10">

      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d4af55] text-3xl text-[#d4af55]">
        ✓
      </div>

      <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[#d4af55]">
        BLACK KEY AUTO GROUP
      </p>

      <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
        REQUEST SENT
      </h2>

      <p className="mb-8 leading-7 text-white/60">
        Your vehicle request has been sent successfully. Our team will contact
        you soon.
      </p>

      <button
        type="button"
        onClick={() => setShowSuccess(false)}
        className="w-full bg-[#d4af55] px-6 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#edc96b]"
      >
        DONE
      </button>

    </div>
  </div>
)}

</main>

  );
}