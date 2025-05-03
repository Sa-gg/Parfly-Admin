import React from "react";
import { useOutletContext } from "react-router-dom";
import deliveryGuy from "../../assets/deliveryGuyWithLogo.svg";
import phone from "../../assets/phone.svg";
import background from "../../assets/background.svg";
import backgroundDark from "../../assets/backgroundDark.svg";
import { MdDownload } from "react-icons/md";
import usePWAInstall from "../hooks/usePWAInstall";

const Hero = () => {
  const context = useOutletContext();
  const darkMode = context?.darkMode ?? false; 
  const { handleInstallClick } = usePWAInstall();

  return (
    <>
      <div className="relative flex flex-col items-center max-w-screen-xl px-10 mx-auto lg:flex-row sm:px-6 lg:py-[calc(77px_+_15vh)] py-[calc(77px_+_2vh)]">
        <div className="flex items-center py-10 lg:w-1/2 lg:pb-20 lg:pt-10 lg:pr-0 z-10">
          <div className="text-left">
            <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-6xl motion-translate-x-in-[-11%] motion-translate-y-in-[-1%] motion-opacity-in-[0%] motion-blur-in-[5px] dark:text-white">
              Deliver
              <span className="font-bold text-primary">Faster</span>
              <span className="text-xl font-semibold rounded-full text-blueGray-500"></span>
            </h2>
            <p className="max-w-md mx-auto mt-3 text-base text-text sm:text-lg md:mt-5 md:text-xl md:max-w-3xl motion-scale-in-[0.5] motion-opacity-in-[0%] motion-ease-spring-bouncier">
              On-demand delivery platform. Get your order matched in 3 seconds.
              Experience the fastest and most reliable delivery service tailored
              to meet your needs.
            </p>
            <div className="mt-5 sm:flex md:mt-8">
              <div className="rounded-lg shadow motion-translate-x-in-[-100%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-blur-in-[5px]">
                <a
                  href=""
                  onClick={(event) => event.preventDefault()}
                  className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-primary border border-transparent rounded-lg hover:bg-primary-dark focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10"
                >
                  Book Now
                </a>
              </div>
              <div className="mt-3 rounded-lg shadow sm:mt-0 sm:ml-3 motion-translate-x-in-[-100%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-delay-[200ms]">
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    handleInstallClick();
                  }}
                  className="flex gap-2 items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-primary transition duration-150 ease-in-out bg-white border border-transparent rounded-lg hover:text-primary-dark focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10"
                >
                  <MdDownload />
                  Install PWA App
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-36 lg:w-1/2 lg:pb-20 lg:pt-10 w-[100%] h-[100%] overflow-visible relative ">
          <img
            src={darkMode ? backgroundDark : background}
            alt="phone svg"
            className="w-[calc(24rem_+_10vw)] h-auto absolute "
          />
          <img
            src={phone}
            alt="phone svg"
            className="w-[calc(24rem_+_10vw)] h-auto absolute -motion-translate-y-loop-[5%] motion-duration-[.5s] motion-ease-spring-smooth "
          />
          <img
            src={deliveryGuy}
            alt="delivery guy svg"
            className="w-[calc(24rem_+_10vw)] h-auto absolute motion-translate-x-in-[-104%] motion-translate-y-in-[0%] motion-opacity-in-[0%] motion-blur-in-[5px] motion-ease-spring-bouncy motion-rotate-loop-[-20deg] motion-loop-once motion-duration-[2000ms] motion-delay-[350ms] motion-delay-[500ms]/rotate "
          />
     
          
        </div>
        
      </div>
    </>
  );
};

export default Hero;
