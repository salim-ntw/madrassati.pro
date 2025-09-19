import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import facebook from "../assets/icons/communication.png";
import instagram from "../assets/icons/instagram.png";
import phone from "../assets/icons/phone-call.png";
import email from "../assets/icons/email.png";
import { useLanguage } from "../contexts/LanguageContext";

function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { t, language } = useLanguage();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    emailjs
      .sendForm(
        "service_8hmhe4e",
        "template_ql82px5",
        formRef.current,
        "F69K0iIW9QbJhVplk"
      )
      .then(
        () => {
          setLoading(false);
          setSuccessMsg("✅ Message sent successfully!");
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          setSuccessMsg("❌ Failed to send message. Please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <div id="contact" className="relative w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10 text-white flex flex-col items-center py-20 px-6">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className={`font-bold text-4xl md:text-5xl mb-4 animate-slideInDown ${language === 'ar' ? 'font-arabic' : ''}`}>
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6 animate-slideInUp" style={{animationDelay: '0.2s'}}></div>
          <p className={`text-blue-100 text-lg md:text-xl max-w-2xl mx-auto animate-slideInUp ${language === 'ar' ? 'font-arabic' : ''}`} style={{animationDelay: '0.3s'}}>
            We're here to help and answer your questions
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-[90%] mx-auto mt-[-60px] overflow-hidden border border-white/20">
        <div className="flex flex-col gap-8 bg-gradient-to-br from-blue-50 to-blue-100 w-full lg:w-1/2 p-8 lg:p-12">
          <div className="animate-slideInUp" style={{animationDelay: '0.4s'}}>
            <h2 className={`text-3xl font-bold text-gray-800 mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>Get in Touch</h2>
            <p className="text-gray-600 text-lg">
              Reach out to us through any of the following options:
            </p>
          </div>

          <div className="space-y-8 animate-slideInUp" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center gap-6 p-4 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <img src={phone} alt="call" className="w-6 h-6 filter brightness-0 invert" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Call Us</h3>
                <p className="text-gray-600">+213 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-4 bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <img src={email} alt="email" className="w-6 h-6 filter brightness-0 invert" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Email Us</h3>
                <p className="text-gray-600">madrassati@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="animate-slideInUp" style={{animationDelay: '0.6s'}}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Follow us on social media
            </h2>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <img
                  src={facebook}
                  alt="facebook"
                  className="w-6 h-6 filter brightness-0 invert"
                />
              </a>
              <a href="#" className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg">
                <img
                  src={instagram}
                  alt="instagram"
                  className="w-6 h-6 filter brightness-0 invert"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 p-8 lg:p-12 bg-white">
          <div className="animate-slideInUp" style={{animationDelay: '0.7s'}}>
            <h2 className={`text-3xl font-bold text-gray-800 mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
              Send us a message
            </h2>
          </div>

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col gap-6 animate-slideInUp"
            style={{animationDelay: '0.8s'}}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                className="border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="border-2 border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="border-2 border-gray-200 rounded-xl p-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                loading && "opacity-60 cursor-not-allowed"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {successMsg && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-xl animate-slideInUp">
              <p className="text-center text-lg font-medium text-green-700">
                {successMsg}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
