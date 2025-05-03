import Logo from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

const Header = () => {

  return (
    <>
      <nav
      className="sticky top-4 bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 rounded-lg mt-4 shadow z-[100]">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button data-drawer-target="drawer-navigation" data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-[#FC8002] hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
            <svg aria-hidden="true" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
          {/* <NavLink to="/" className="flex items-center justify-between mr-4">
            <img src={Logo} className="mr-3 h-12" alt="Parfly Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#FC8002] dark:text-white hidden sm:hidden">Parfly</span>
          </NavLink> */}
          <form action="#" method="GET" className="hidden lg:block lg:pl-2">
            <label for="topbar-search" className="sr-only">Search</label>
            <div className="text-gray-500 relative lg:w-64">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
                  </path>
                </svg>
              </div>
              <input type="text" name="email" id="topbar-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FC8002] focus:border-[#FC8002] block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[ dark:focus:border-primary-500"
                placeholder="Search" />
            </div>
          </form>
        </div>
        <div className="flex items-center lg:order-2">
          <button type="button" data-drawer-toggle="drawer-navigation" aria-controls="drawer-navigation"
            className="p-2 mr-1 text-gray-500 rounded-lg lg:hidden hover:text-[#FC8002] hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-[#fc7f0281] dark:focus:ring-gray-600">
            <span className="sr-only">Toggle search</span>
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
              </path>
            </svg>
          </button>
          {/* <!-- Notifications --> */}
          <button type="button" data-dropdown-toggle="notification-dropdown"
            className="p-2 mr-1 text-gray-500 rounded-lg hover:text-[#FC8002] hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-[#fc7f0281] dark:focus:ring-gray-600">
            <span className="sr-only">View notifications</span>
            {/* <!-- Bell icon --> */}
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z">
              </path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
            id="notification-dropdown">
            <div
              className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
              Notifications
            </div>
            <div>
              <a href="/admin/src/notifications.html"
                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                <div className="flex-shrink-0">
                  <img className="w-11 h-11 rounded-full" src="/admin/src/assets/img/people/haerin.jpg"
                    alt="Haerin avatar" />
                </div>
                <div className="pl-3 w-full">
                  <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">

                    <span className="font-semibold text-gray-900 dark:text-white">Haerin</span>: "Requested a delivery"
                  </div>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                    a few moments ago
                  </div>
                </div>
              </a>
              <a href="/admin/src/notifications.html"
                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                <div className="flex-shrink-0">
                  <img className="w-11 h-11 rounded-full" src="/admin/src/assets/img/people/hanni.jpg" alt="hanni avatar" />
                </div>
                <div className="pl-3 w-full">
                  <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">Hanni</span>
                    : "Placed an order"
                  </div>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                    10 minutes ago
                  </div>
                </div>
              </a>
              <a href="/admin/src/notifications.html"
                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                <div className="flex-shrink-0">
                  <img className="w-11 h-11 rounded-full" src="/admin/src/assets/img/people/hyein.jpg" alt="Hyein avatar" />
                </div>
                <div className="pl-3 w-full">
                  <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">Hyein</span>
                    : "Completed a delivery"
                  </div>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                    44 minutes ago
                  </div>
                </div>
              </a>
              <a href="/admin/src/notifications.html"
                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600">
                <div className="flex-shrink-0">
                  <img className="w-11 h-11 rounded-full" src="/admin/src/assets/img/people/danielle.jpg"
                    alt="Danielle avatar" />
                </div>
                <div className="pl-3 w-full">
                  <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">Danielle</span>
                    : "Left a review"
                  </div>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                    1 hour ago
                  </div>
                </div>
              </a>
              <a href="/admin/src/notifications.html" className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex-shrink-0">
                  <img className="w-11 h-11 rounded-full" src="/admin/src/assets/img/people/minji.jpg" alt="Minji image" />
                </div>
                <div className="pl-3 w-full">
                  <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">Minji</span>
                    : "Requested a refund"
                  </div>
                  <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
                    3 hours ago
                  </div>
                </div>
              </a>
            </div>
            <a href="/admin/src/notifications.html"
              className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline">
              <div className="inline-flex items-center">
                <svg aria-hidden="true" className="mr-2 w-4 h-4 text-white dark:text-gray-400" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"></path>
                </svg>
                View all
              </div>
            </a>
          </div>
          {/* <!-- Apps --> */}
          <button type="button" data-dropdown-toggle="apps-dropdown"
            className="p-2 text-gray-500 rounded-lg hover:text-[#FC8002] hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-[#fc7f0281] dark:focus:ring-gray-600">
            <span className="sr-only">View notifications</span>
            {/* <!-- Icon --> */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
              </path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="apps-dropdown">
            <div
              className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
              Apps
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
              <a href="/admin/src/settings.html"
                className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                <svg aria-hidden="true"
                  className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-[#FC8002]  dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clip-rule="evenodd"></path>
                </svg>
                <div className="text-sm text-gray-900 dark:text-white">
                  Profile
                </div>
              </a>
              <a href="/admin/src/settings.html"
                className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                <svg aria-hidden="true"
                  className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-[#FC8002]  dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd"></path>
                </svg>
                <div className="text-sm text-gray-900 dark:text-white">
                  Settings
                </div>
                </a>
                <a href="/admin/src/login.html"
                  className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                  <svg aria-hidden="true"
                    className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-[#FC8002]  dark:text-gray-400 dark:group-hover:text-gray-400"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                    </path>
                  </svg>
                  <div className="text-sm text-gray-900 dark:text-white">
                    Logout
                  </div>
                </a>
            </div>
          </div>
          <button type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-[#fc7f0281] dark:focus:ring-gray-600"
            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/admin/src/assets/img/people/vanessa.jpg" alt="user photo" />
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="hidden z-50 my-4 w-56 text-base list-none bg-white divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="dropdown">
            <div className="py-3 px-4">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">Vanessa</span>
              <span className="block text-sm text-gray-900 truncate dark:text-white">vanessa@gmail.com</span>
            </div>
            <ul className="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
              <li>
                <a href="/admin/src/settings.html"
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My
                  profile</a>
              </li>
              <li>
                <a href="/admin/src/settings.html"
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account
                  settings</a>
              </li>
            </ul>
            <ul className="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
              <li>
                <a href="/admin/src/login.html"
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                  out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};
export default Header;
