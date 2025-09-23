import React from "react";
import aboutImg from "../assets/about-img.jfif";
import checkIcon from "../assets/icons/checked.png";
import famIcon from "../assets/icons/family.png";
import protectIcon from "../assets/icons/protection.png";
import schoolIcon from "../assets/icons/school.png";
import teacherIcon from "../assets/icons/teacher.png";
import { useLanguage } from "../contexts/LanguageContext";

function About() {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: famIcon,
      title: "Parent Dashboard",
      text: "Track grades, schedules, and announcements in real time.",
    },
    {
      icon: teacherIcon,
      title: "Teacher Tools",
      text: "Manage classes, share grades, and communicate with parents easily.",
    },
    {
      icon: schoolIcon,
      title: "School Management",
      text: "Organize timetables, attendance, and reports seamlessly.",
    },
    {
      icon: protectIcon,
      title: "Secure Platform",
      text: "Data is protected and accessible only to authorized users.",
    },
  ];

  return (
    <div
      id="about"
      className="bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 relative overflow-hidden"
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

      {/* Who We Are Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 gap-10 flex flex-col relative z-10">
        <div className="text-center mb-10 md:mb-12 animate-fadeIn">
          <h1
            className={`text-4xl md:text-5xl text-gray-800 font-bold tracking-tight mb-4 md:mb-6 animate-slideInDown ${
              language === "ar" ? "font-arabic" : ""
            }`}
          >
            {t("whoWeAre")}
          </h1>
          <div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full animate-slideInUp"
            style={{ animationDelay: "0.15s" }}
          ></div>
        </div>

        {/* Flex container responsive */}
        <div
          className="flex flex-col md:flex-row items-center gap-12 animate-slideInUp reveal"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 transition-transform duration-300 hover:-translate-y-1">
              <p
                className={`text-lg md:text-xl text-gray-700 mb-6 leading-relaxed ${
                  language === "ar" ? "font-arabic" : ""
                }`}
              >
                {t("aboutIntro")}
              </p>
              <ul className="space-y-4 text-gray-700 text-base md:text-lg">
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2 hover:text-blue-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <img src={checkIcon} alt="checked" className="w-5" />
                  </div>
                  Parents can chat in real time with teachers
                </li>
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2 hover:text-blue-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <img src={checkIcon} alt="checked" className="w-5" />
                  </div>
                  Check grades, schedules, and attendance anytime
                </li>
                <li className="flex items-center gap-3 transition-all duration-300 hover:translate-x-2 hover:text-blue-600">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <img src={checkIcon} alt="checked" className="w-5" />
                  </div>
                  Teachers manage classes and share updates easily
                </li>
              </ul>
            </div>
          </div>

          {/* Image */}
          <div
            className="w-full md:w-1/2 flex justify-center animate-slideInUp reveal"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative">
              <img
                src={aboutImg}
                alt="About Madrassati"
                className="w-full max-w-md rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl animate-bounce">
                🎓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm relative z-10 reveal">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 animate-fadeIn">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-gray-800 animate-slideInDown ${
                language === "ar" ? "font-arabic" : ""
              }`}
            >
              {t("ourServices")}
            </h2>
            <div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-6 animate-slideInUp"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <p
              className={`text-gray-600 text-lg md:text-xl max-w-3xl mx-auto animate-slideInUp ${
                language === "ar" ? "font-arabic" : ""
              }`}
              style={{ animationDelay: "0.3s" }}
            >
              Everything you need to connect schools, teachers, and parents in
              one secure platform.
            </p>
          </div>

          {/* Responsive grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 text-center border border-white/20 animate-slideInUp"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                  {t(
                    `service_${
                      service.icon === famIcon
                        ? "parent"
                        : service.icon === teacherIcon
                        ? "teacher"
                        : service.icon === schoolIcon
                        ? "school"
                        : "secure"
                    }_title`
                  )}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {t(
                    `service_${
                      service.icon === famIcon
                        ? "parent"
                        : service.icon === teacherIcon
                        ? "teacher"
                        : service.icon === schoolIcon
                        ? "school"
                        : "secure"
                    }_text`
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
