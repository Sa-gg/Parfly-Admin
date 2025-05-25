import { useState } from "react";

const SenderModal = ({ isOpen, setIsOpen, setDriverData, driverData, onSelectDriver}) => {
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredData = driverData.filter(
    (driver) =>
      (driver.full_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (driver.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (driver.phone?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (driver.vehicle_type?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (driver.vehicle_plate?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (driver.average_rating?.toString().toLowerCase() || "").includes(searchTerm.toLowerCase())
  );
  

  return (
    <>
      <dialog id="my_modal_4" class="modal z-[1001]" open={isOpen}>
        <div class="modal-box w-11/12 max-w-5xl bg-white pb-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </form>

          <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
              <div className="mb-4">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  All drivers
                </h1>
              </div>
              <div className="sm:flex flex">
                <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                  <form className="lg:pr-3" action="#" method="GET">
                    <label for="users-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative mt-1 lg:w-64 xl:w-96">
                      <input
                        type="text"
                        name="email"
                        id="users-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FC8002] focus:border-[#FC8002]  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for drivers"
                        onChange={handleSearchChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden shadow">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                    <thead className="bg-white dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Id
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Name
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                          Contact Number
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Vehicle
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Plate Number
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                            Rating
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"></th>
                      </tr>
                    </thead>

                    
       
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {filteredData.length > 0 ? (
                        filteredData.map((driver) => (
                          <tr
                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            key={driver.driver_id}
                            onClick={() => onSelectDriver({ id: driver.driver_id, name: driver.full_name })}
                            >
                            <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {driver.driver_id}
                            </td>
                            <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="/admin/src/assets/img/people/team-3.jpg"
                            alt=" avatar"
                          />
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            <div className="text-base font-semibold text-gray-900 dark:text-white">
                              {driver.full_name}
                            </div>
                            <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              {driver.email}
                            </div>
                          </div>
                        </td>

                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {driver.phone}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {driver.vehicle_type}
                        </td>
                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {driver.vehicle_plate}
                        </td>

                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 30 30"
                              fill="#FF9529"
                              className="size-6">
                              <path
                                fill-rule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            {driver.average_rating
                              ? `${driver.average_rating}`
                              : "N/A"}
                          </div>
                        </td>
                        <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>{" "}
                            Active
                          </div>
                        </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="text-center py-4 text-black">
                            No matches found
                          </td>
                        </tr>
                      )}
                    </tbody>
            


                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-4 sm:mb-0">
              <a
                href="#"
                className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  1-20
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  2290
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <a
                href="#"
                className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg
                  className="w-5 h-5 mr-1 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
                Previous
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Next
                <svg
                  className="w-5 h-5 ml-1 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default SenderModal;
