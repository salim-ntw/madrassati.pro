import React from "react";
import Plan from "./Plan";

export default function Pricing() {
  return (
    <div
      id="pricing"
      className="flex flex-col items-center py-12 px-6 m-2 bg-white  border-blue-900 border-2 rounded-xl"
    >
      <h1 className="text-3xl text-gray-800 font-bold text-center">Plans</h1>
      <h3 className="text-gray-700 mb-12">
        Affordable plans designed for every school’s needs.
      </h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 ">
        <Plan
          title="Starter"
          description="Perfect for small private schools or institutions starting their digital journey. 200 students."
          price="20,000 DZD"
        />
        <Plan
          title="Growth"
          description="Ideal for mid-sized schools looking for advanced digital communication and management. 500 students."
          price="40,000 DZD"
        />
        <Plan
          title="Premium"
          description="Designed for large educational institutions needing a robust and scalable platform. 1000 students."
          price="58,000 DZD"
        />
      </div>
    </div>
  );
}
