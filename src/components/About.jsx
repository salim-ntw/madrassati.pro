import React from "react";
import aboutImg from "../assets/about-img.jfif";
import checkIcon from "../assets/icons/checked.png";
import famIcon from "../assets/icons/family.png";
import protectIcon from "../assets/icons/protection.png";
import schoolIcon from "../assets/icons/school.png";
import teacherIcon from "../assets/icons/teacher.png";

function About() {
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
    <div id="about" className="bg-gray-50 text-gray-900">
      {/* Who We Are Section */}
      <section className="max-w-6xl mx-auto px-6 py-10 gap-10 flex flex-col">
        <h1 className="text-3xl md:text-4xl text-gray-700 font-bold text-center mb-6">
          Who We Are
        </h1>

        {/* Flex container responsive */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <p className="text-base md:text-lg text-gray-600 mb-4 leading-relaxed">
              Madrassati is a modern platform designed to connect schools,
              teachers, and parents in one place. We simplify communication,
              grades, and schedules—making education more transparent and
              accessible for everyone.
            </p>
            <ul className="space-y-3 text-gray-700 text-sm md:text-base">
              <li className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-2">
                <img src={checkIcon} alt="checked" className="w-5" />
                Parents can chat in real time with teachers
              </li>
              <li className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-2">
                <img src={checkIcon} alt="checked" className="w-5" />
                Check grades, schedules, and attendance anytime
              </li>
              <li className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-2">
                <img src={checkIcon} alt="checked" className="w-5" />
                Teachers manage classes and share updates easily
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={aboutImg}
              alt="About Madrassati"
              className="w-full max-w-sm rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 mb-12 text-sm md:text-base">
            Everything you need to connect schools, teachers, and parents in one
            secure platform.
          </p>

          {/* Responsive grid */}
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-10 mx-auto mb-4"
                />
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
