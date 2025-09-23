import React from "react";
import Plan from "./Plan";
import { useLanguage } from "../contexts/LanguageContext";

export default function Pricing() {
  const { t, language } = useLanguage();

  return (
    <div
      id="pricing"
      className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-100/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-20 h-20 bg-blue-100/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-28 h-28 bg-blue-100/30 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 reveal">
        <div className="text-center mb-14 md:mb-16 animate-fadeIn reveal">
          <h1
            className={`text-4xl md:text-5xl text-gray-800 font-bold mb-4 md:mb-6 tracking-tight animate-slideInDown ${
              language === "ar" ? "font-arabic" : ""
            }`}
          >
            {t("pricingPlans")}
          </h1>
          <div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-4 md:mb-6 animate-slideInUp"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <p
            className={`text-gray-600 text-base md:text-xl max-w-3xl mx-auto animate-slideInUp ${
              language === "ar" ? "font-arabic" : ""
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            {t("pricingSubtitle")}
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="animate-slideInUp" style={{ animationDelay: "0.4s" }}>
            <Plan
              title={t("planStarterTitle")}
              description={t("planStarterDesc")}
              price="20,000"
              popular={false}
            />
          </div>
          <div className="animate-slideInUp" style={{ animationDelay: "0.5s" }}>
            <Plan
              title={t("planGrowthTitle")}
              description={t("planGrowthDesc")}
              price="40,000"
              popular={true}
            />
          </div>
          <div className="animate-slideInUp" style={{ animationDelay: "0.6s" }}>
            <Plan
              title={t("planPremiumTitle")}
              description={t("planPremiumDesc")}
              price="58,000"
              popular={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
