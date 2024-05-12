// import React from "react";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_fzp6iyb', 'template_21ivsz3', form.current, {
        publicKey: 'JKD5qSwCIPlamW2Yg',
      })
      .then(
        () => {
          toast.success("Message send succeffully")
          e.target.reset();  
        },
        (error) => {
          console.log('FAILED...', error.text);
          toast.error('FAILED...', error.text)
        },
      );
  };

  return (
    <>

      <div className="my-5 text-center">
        <h4 className="font-bold mb-2 text-3xl">Contact Us</h4>
      </div>

      <div className="px-4">
        <div className="flex justify-center flex-wrap mx-10 md:mx-20 lg:mx-40">
          <a href={`mailto:luckyvishwa1104@gmail`} className="text-blue-500" target="blank">
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center h-32 w-56 mb-2">
              <FaEnvelope size={24} className="text-red-500" />
              <h3 className="text-lg mt-2 text-black">Send us email</h3>
              <h4 className="text-sm mt-1 text-black">help@roadsafe.com</h4>
            </div></a>

          <a href="" target="blank">
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center h-32 w-56 mb-2 mr-5 ml-5">
              <FaPhone size={24} className="text-green-500" />
              <h3 className="text-lg mt-2">Call us</h3>
              <h4 className="text-sm mt-1">1800-00-0000</h4>
            </div></a>

          <a href={`mailto:luckyvishwa1104@gmail`} target="blank">
            <div className="border border-gray-300 rounded-lg p-4 flex flex-col items-center h-32 w-56 mb-2">
              <FaDownload size={24} className="text-yellow-500" />
              <h3 className="text-lg mt-2">Get our app</h3>
              <h4 className="text-sm mt-1">Download Now</h4>
            </div></a>
        </div>
      </div>

      <div>
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="to_name" />
          <label>Email</label>
          <input type="email" name="from_name" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send"/>
        </form>
      </div>

      <div className="flex justify-center items-center flex-col my-3">
        <div className="w-full md:w-3/4 lg:w-2/4">
          <table className="w-full border-collapse border border-black">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-2">Contact Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  1800-00-0000 (toll-free)
                </td>
              </tr>
              <tr>
                <td className="py-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-skyblue-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l18 12M3 18l18-12"
                    />
                  </svg>
                  help@roadsafe.com
                </td>
              </tr>
              <tr>
                <td className="py-2 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  1234567890
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
