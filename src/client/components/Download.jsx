import download from "../../assets/download.svg";
import { MdDownload } from "react-icons/md";
import usePWAInstall from "../hooks/usePWAInstall"

const Download = () => {
  const { handleInstallClick } = usePWAInstall();

  return (
    <>
      <section id="about" class="px-[5vw] py-[5vw]">
        <h2 className="text-center text-primary font-bold text-base pt-[10vh] md:pt-0 hidden">
          ABOUT US
        </h2>
        <div class="container mx-auto py-0 md:py-[4vh] px-4 sm:px-6 lg:px-8 ">
          <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div class="max-w-lg">
              <h3 class="text-3xl font-bold text-primary sm:text-3xl">
                Experience Parlfy On the Go!
              </h3>
              <p class="mt-4 text-text text-lg">
                Take your Parlfy experience to the next level with our PWA app!
                Enjoy seamless access to all our features, stay updated, and
                manage everything wherever you are. Download the Parlfy app now
                and unlock convenience at your fingertips. </p>
              <div class="mt-8">
                <a
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    handleInstallClick();
                  }}
                  className="  w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-primary border border-transparent rounded-md hover:text-primary-dark focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10 inline"
                >
                  <MdDownload className="inline mr-2" />
                  Install PWA App
                </a>
              </div>
            </div>
            <div class="mt-12 md:mt-0 order-first">
              <img src={download} alt="About Us Image" class="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Download;
