import React from "react";
import { useOutletContext } from "react-router-dom";
import deliveryGuy from "../../assets/deliveryGuyWithLogo.svg";
import background from "../../assets/background.svg";
import realTimeTrackingWoPin from "../../assets/realtimeTrackingWoPin.svg";
import pin from "../../assets/pin.svg";
import discountBg from "../../assets/discountBg.svg";
import discountNoBg from "../../assets/discountNoBg.svg";
import backgroundDark from "../../assets/backgroundDark.svg";

const Features = () => {
  const context = useOutletContext();
  const darkMode = context?.darkMode ?? false;

  return (
    <section id="features">
      <h2 className="text-center text-primary font-bold text-2xl pt-[25vw] lg:pt-0">
        WHY CHOOSE US
      </h2>
      <p className="text-center text-text dark:text-gray-400 max-w-2xl mx-auto mt-2 hidden md:block">
        Experience the best same-day delivery service with us. We ensure that
        your items arrive on time and in perfect condition.
      </p>
      <div class="flex justify-center align-middle flex-wrap gap-[2.75vw] px-[5vw] py-[2rem]">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
          <div className="relative w-auto h-autox` aspect-w-643 aspect-h-360">
            <img
              src={darkMode ? backgroundDark : background}
              alt="phone svg"
              className="absolute top-0 left-0 w-full h-auto z-0"
            />
            <img
              src={deliveryGuy}
              alt="delivery guy svg"
              className="w-full h-auto z-10 motion-translate-x-loop-[-30%] motion-translate-y-loop-[0%] motion-duration-[2000ms] motion-ease-spring-smooth group-hover:motion-duration-[200ms]"
            />
          </div>

          <div class="p-5 pb-0">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
              Fast Delivery
            </h5>

            <p class="mb-3 font-normal text-text dark:text-gray-400">
              We prioritize speed to ensure your packages are delivered on time,
              every time.
            </p>
          </div>
        </div>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
          <div className="relative w-auto h-autox` aspect-w-643 aspect-h-360">
            <img
              src={pin}
              alt="phone svg"
              className="absolute top-0 left-0 w-full h-auto z-0 motion-translate-x-loop-[0%] motion-translate-y-loop-[-7%] motion-duration-[375ms] motion-duration-[1000ms]/translate motion-ease-spring-smooth group-hover:motion-duration-[200ms]/translate "
            />
            <img
              src={realTimeTrackingWoPin}
              alt="delivery guy svg"
              className="w-full h-auto z-10  "
            />
          </div>

          <div class="p-5 pb-0">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
              Real-Time Tracking
            </h5>

            <p class="mb-3 font-normal text-text dark:text-gray-400">
              Monitor your shipments with our advanced real-time tracking
              system.
            </p>
          </div>
        </div>
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
          <div className="relative w-auto h-autox` aspect-w-643 aspect-h-360">
            <img
              src={discountBg}
              alt="phone svg"
              className="absolute top-0 left-0 w-full h-auto z-0 motion-opacity-loop-0 motion-duration-1500 group-hover:motion-duration-200 "
            />
            <img
              src={discountNoBg}
              alt="delivery guy svg"
              className="w-full h-auto z-10 "
            />
          </div>

          <div class="p-5 pb-0">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
              Affordable Rates
            </h5>

            <p class="mb-3 font-normal text-text dark:text-gray-400">
              Enjoy reliable courier services at competitive prices tailored to
              your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
