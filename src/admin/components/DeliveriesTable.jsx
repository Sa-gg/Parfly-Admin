import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DeliveriesTable = ({ handleOpen, deliveryData, setDeliveryData }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 

  const getStatusBadgeClass = (status) => {
    switch (status) { 
      case "pending":
        return "bg-orange-100 text-orange-800 border border-orange-100 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300";
      case "accepted":
        return "bg-blue-100 text-blue-800 border border-blue-100 dark:bg-gray-700 dark:border-blue-400 dark:text-blue-400";
      case "in_transit":
        return "bg-yellow-100 text-yellow-800 border border-yellow-100 dark:bg-gray-700 dark:border-yellow-400 dark:text-yellow-400";
      case "completed":
        return "bg-green-100 text-green-800 border border-green-100 dark:bg-gray-700 dark:border-green-500 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 border border-red-100 dark:bg-gray-700 dark:border-red-400 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-300";
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = deliveryData.filter(
    (delivery) =>
      delivery.delivery_id?.toString().includes(searchTerm) || // search delivery ID
      (delivery.sender_name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (delivery.receiver_name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (delivery.driver_name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (delivery.vehicle_type?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (delivery.pickup_address?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (delivery.dropoff_address?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (delivery.status?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

   const MySwal = withReactContent(Swal);
  
  const handeleDelete = async (id) => {
    const result = await MySwal.fire({
      title: "Delete driver?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/api/deliveries/${id}`);
        setDeliveryData((prevData) =>
          prevData.filter((delivery) => delivery.delivery_id !== id)
        );
        console.log("Delivery deleted");
        toast.success("Delivery Deleted Successfully");
      } catch (err) {
        console.error("Error deleting delivery", err);
        toast.error("Error Deleting Delivery");
      }
    }
  }
  

  return (
    <>
      <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700 rounded-t-lg">
        <div class="w-full mb-1">
          <div class="mb-4">
            <nav class="flex mb-5" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                <li class="inline-flex items-center">
                  <a
                    href="/admin/src/dashboard.html"
                    class="inline-flex items-center text-gray-700 hover:text-[#FC8002] dark:text-gray-300 dark:hover:text-white">
                    <svg
                      class="w-5 h-5 mr-2.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg
                      class="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span
                      class="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                      aria-current="page">
                      Deliveries
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              All deliveries
            </h1>
          </div>
          <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div class="flex  mb-4 sm:mb-0 flex-col sm:flex-row hidden sm:flex">
              <form class="sm:pr-3" action="#" method="GET">
                <label for="products-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-full mt-1 sm:w-64 xl:w-96">
                  <input
                    type="text"
                    onChange={handleSearchChange}
                    name="email"
                    id="products-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#FC8002] focus:border-[#FC8002] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for deliveries"
                  />
                </div>
              </form>
              <div class="flex items-center w-full mt-5 sm:mt-0 hidden sm:flex">
                <div class="flex pl-2 space-x-1">
                  <a
                    href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <svg
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <button
              id="createProductButton"
              onClick={() => handleOpen("add")}
              class="text-white bg-primary hover:bg-[#e67300] focus:ring-4 focus:ring-[#fc7f0281] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-full sm:w-auto"
              type="button"
              data-drawer-target="drawer-create-product-default">
              Add new deliveries
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto">
          <div class="inline-block min-w-full align-middle">
            <div class="overflow-hidden shadow">
              <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead class="bg-white dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="p-4">
                      <div class="flex items-center">
                        <input
                          id="checkbox-all"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label for="checkbox-all" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      ID
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Sender
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Driver
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Vehicle
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Receiver
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Pick-up -& Drop Off Location
                    </th>

                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Status
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredData.length > 0 ? (
                    filteredData.map((delivery) => (
                      <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td class="w-4 p-4">
                          <div class="flex items-center">
                            <input
                              id="checkbox-{{ .id }}"
                              aria-describedby="checkbox-1"
                              type="checkbox"
                              class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label for="checkbox-{{ .id }}" class="sr-only">
                              #
                            </label>
                          </div>
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {delivery.delivery_id}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          <div
                            className={`text-base font-semibold ${
                              delivery.sender_id
                                ? "text-gray-900 dark:text-white"
                                : "text-red-500"
                            }`}>
                            {delivery.sender_name}
                          </div>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {new Date(delivery.created_at).toLocaleString()}
                          </div>
                        </td>

                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          <div
                            className={`text-base font-semibold ${
                              delivery.driver_id
                                ? "text-gray-900 dark:text-white"
                                : "text-red-500"
                            }`}>
                            {delivery.driver_name}
                          </div>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {delivery.accepted_at
                              ? new Date(delivery.accepted_at).toLocaleString()
                              : "N/A"}
                          </div>
                        </td>

                        <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {delivery.vehicle}
                        </td>

                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                          <div
                            className={`text-base font-semibold ${
                              delivery.receiver_id
                                ? "text-gray-900 dark:text-white"
                                : "text-red-500"
                            }`}>
                            {delivery.receiver_name}
                          </div>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {delivery.receiver_at
                              ? new Date(delivery.receiver_at).toLocaleString()
                              : "N/A"}
                          </div>
                        </td>

                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {delivery.pickup_address}
                          -<br /> {delivery.dropoff_address}
                        </td>
                        <td class="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <span
                            className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md ${getStatusBadgeClass(
                              delivery.status
                            )}`}>
                            {delivery.status
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (c) => c.toUpperCase())}
                          </span>
                        </td>
                        <td class="p-4 space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleOpen("edit", delivery)}
                            id="updateProductButton"
                            data-drawer-placement="right"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg
                              class="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                              <path
                                fill-rule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clip-rule="evenodd"></path>
                            </svg>
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => handeleDelete(delivery.delivery_id)}
                            id="deleteProductButton"
                            data-drawer-placement="right"
                            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900">
                            <svg
                              class="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"></path>
                            </svg>
                            Delete item
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4 text-black">
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

      <div class="sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center mb-4 sm:mb-0">
          <a
            href="#"
            class="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg
              class="w-7 h-7"
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
            class="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"></path>
            </svg>
          </a>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              1-20
            </span>{" "}
            of{" "}
            <span class="font-semibold text-gray-900 dark:text-white">
              2290
            </span>
          </span>
        </div>
        <div class="flex items-center space-x-3">
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
    </>
  );
};
export default DeliveriesTable;
