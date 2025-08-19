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
    <div id="about" className="bg-gray-50  text-gray-900 ">
      <section className="max-w-5xl mx-auto px-6 py-6   gap-10 items-center flex flex-col">
        <h1 className="text-3xl text-gray-700 font-bold text-center ">
          Who We Are
        </h1>
        <div className="flex flex-row ">
          <div>
            <p className="text-lg text-gray-600 mb-4">
              Madrassati is a modern platform designed to connect schools,
              teachers, and parents in one place. We simplify communication,
              grades, and schedules—making education more transparent and
              accessible for everyone.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center flex-row gap-2 transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-100">
                <img src={checkIcon} alt="checked" className="w-[20px]" />
                Parents can chat in real time with teachers
              </li>
              <li className="flex items-center flex-row gap-2  transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-100">
                <img src={checkIcon} alt="checked" className="w-[20px]" />
                Check grades, schedules, and attendance anytime
              </li>
              <li className="flex items-center flex-row gap-2  transition-transform duration-300 ease-in-out hover:translate-x-2 hover:scale-100">
                <img src={checkIcon} alt="checked" className="w-[20px]" />
                Teachers manage classes and share updates easily
              </li>
            </ul>
          </div>
          <div>
            <img
              src={aboutImg}
              alt="About Madrassati"
              className="w-lg rounded-3xl"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About Our Services</h2>
          <p className="text-gray-600 mb-12">
            Everything you need to connect schools, teachers, and parents in one
            secure platform.
          </p>

          <div className="grid gap-8 grid-cols-4">
            {services.map((services, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1 text-center"
              >
                <img
                  src={services.icon}
                  alt={services.title}
                  className="w-[40px] mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{services.title}</h3>
                <p className="text-gray-600 text-sm">{services.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
