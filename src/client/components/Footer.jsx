import React from "react";
import {
  FaFacebook,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import Logo from "../../assets/img/logo.png";
import usePWAInstall from "../hooks/usePWAInstall";


const Footer = () => {
  const { handleInstallClick } = usePWAInstall();

  return (
    <footer>
      <div className="mt-8 bg-white pt-9 dark:bg-gray-800">
        <div className="mx-auto w-full max-w-[1166px] px-4 xl:px-0">
          <div className="flex flex-col justify-between sm:px-[18px] md:flex-row md:px-10">
            <div className="md:w-[316px]">
              <p className="text-[18px] font-medium text-black dark:text-white flex items-center">
                <img src={Logo} alt="" className="h-8 inline" />
                <h1 className="text-primary font-black inline italic">
                 PARFLY
                </h1>
              </p>

              <p className="mt-[18px] text-[15px] font-normal text-black/[80%] dark:text-white/[80%]">
                Enhance your experience with Parfly. Access all features
                seamlessly, stay updated, and manage everything effortlessly.
                Download the Parfly app now for convenience at your fingertips.
              </p>

              <div className="mt-[18px] flex gap-4 ">
                <a className="hover:scale-110" target="_blank" href="#">
                  <FaFacebook className="dark:text-white" />
                </a>
                <a className="hover:scale-110" target="_blank" href="/">
                  <FaLinkedinIn className="dark:text-white" />
                </a>
                <a className="hover:scale-110" target="_blank" href="/">
                  <FaInstagram className="dark:text-white" />
                </a>
                <a className="hover:scale-110" target="_blank" href="">
                  <FaTwitter className="dark:text-white" />
                </a>
                <a
                  className="hover:scale-110"
                  target="_blank"
                  href="https://www.youtube.com/"
                >
                  <FaYoutube className="dark:text-white" />
                </a>
              </div>
            </div>
            <div className="md:w-[316px]">
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <FaPhone className="dark:text-white" />
                </div>
                <div className="ml-[18px]">
                  <a
                    href="tel:+911800123444"
                    className="font-Inter text-[14px] font-medium text-black dark:text-white"
                  >
                    +91 1800123444
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-black dark:text-white">
                    Support Number
                  </p>
                </div>
              </div>
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <MdEmail className="dark:text-white" />
                </div>
                <div className="ml-[18px]">
                  <a
                    href="mailto:help@lorem.com"
                    className="font-Inter text-[14px] font-medium text-black dark:text-white"
                  >
                    parfly@app.com
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-black dark:text-white">
                    Support Email
                  </p>
                </div>
              </div>
              <div className="mt-[23px] flex">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[75%]">
                  <FaLocationDot className="dark:text-white" />
                </div>
                <div className="ml-[18px]">
                  <a
                    href="mailto:help@lorem.com"
                    className="font-Inter text-[14px] font-medium text-black dark:text-white"
                  >
                    Bacolod, Negros Occidental, 6100, Philippines
                  </a>
                  <p className="font-Inter text-[12px] font-medium text-black dark:text-white">
                    Address
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col justify-between text-black sm:flex-row md:mt-0 md:max-w-[341px]">
              <div className="">
                <p className="text-deutziawhite font-inter text-[18px] font-medium leading-normal dark:text-white">
                  Pages
                </p>
                <ul>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold dark:text-white"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold dark:text-white"
                      href="/our-tutors"
                    >
                      Business
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold dark:text-white"
                      href="/become-a-tutor"
                    >
                      Personal
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold dark:text-white"
                      href="/plans-and-pricing"
                    >
                      Driver
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold dark:text-white"
                      href="/terms-and-conditions"
                    >
                      Terms and conditions
                    </a>
                  </li>
                  <li className="mt-[15px]">
                    <a
                      className="text-deutziawhite hover:text-deutziawhite/80 font-inter text-[15px] font-normal hover:font-semibold dark:text-white"
                      href="/privacy-policy"
                    >
                      Privcay policy
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-0 sm:mt-0">
                <p className="text-deutziawhite font-inter text-[18px] font-medium dark:text-white text-center font-semibold">
                  Download the app
                </p>
                <div className="flex gap-4 sm:flex-col">
                  <a
                    href=""
                    onClick={(event) => {
                      event.preventDefault();
                      handleInstallClick();
                    }}
                    className="flex gap-2 items-center justify-center w-full py-3 text-base font-medium leading-6 text-primary transition duration-150 ease-in- border border-transparent rounded-md hover:text-primary-dark focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg"
                  >
                    <MdDownload className="" />
                    Install PWA App
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr className="mt-[30px] text-black dark:text-white" />
          <div className="flex items-center justify-center pb-8 pt-[9px] md:py-8">
            <p className="text-[10px] font-normal text-black md:text-[12px] dark:text-white">
              © Copyright 2024 All Rights Reserved by Parfly. PVT. LTD
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
