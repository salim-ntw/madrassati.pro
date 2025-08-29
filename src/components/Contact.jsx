import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import facebook from "../assets/icons/communication.png";
import instagram from "../assets/icons/instagram.png";
import phone from "../assets/icons/phone-call.png";
import email from "../assets/icons/email.png";

function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
    <div className="relative w-full">
      <div className="bg-[#0a1b4f] text-white flex flex-col items-center py-24 px-6">
        <h1 className="font-bold text-4xl mb-2">Contact Us</h1>
        <p className="text-gray-300 text-lg">
          We’re here to help and answer your questions
        </p>
      </div>

      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg w-[85%] mx-auto mt-[-80px] z-10 relative overflow-hidden">
        <div className="flex flex-col gap-6 bg-gray-100 w-full lg:w-1/2 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            Reach out to us through any of the following options:
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={phone} alt="call" className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-gray-800">Call Us</h3>
                <p className="text-gray-600">+213 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src={email} alt="email" className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-gray-800">Email Us</h3>
                <p className="text-gray-600">madrassati@gmail.com</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Follow us on social media
            </h2>
            <div className="flex gap-4">
              <a href="#">
                <img
                  src={facebook}
                  alt="facebook"
                  className="w-8 h-8 hover:scale-110 transition"
                />
              </a>
              <a href="#">
                <img
                  src={instagram}
                  alt="instagram"
                  className="w-8 h-8 hover:scale-110 transition"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send us a message
          </h2>

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition cursor-pointer ${
                loading && "opacity-60 cursor-not-allowed"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {successMsg && (
            <p className="mt-4 text-center text-lg font-medium text-green-600">
              {successMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
