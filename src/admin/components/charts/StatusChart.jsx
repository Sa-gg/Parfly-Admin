import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const StatusChart = ({ statusData, onDateRangeChange }) => {
  const getStatusCount = (status) =>
    statusData.filter((item) => item.status === status).length;

  const completedCount = getStatusCount("completed");
  const inTransitCount = getStatusCount("in_transit");
  const pendingCount = getStatusCount("pending");
  const cancelledCount = getStatusCount("cancelled");
  const acceptedCount = getStatusCount("accepted");

  // Chart.js configuration
  const data = {
    labels: ["Completed", "Cancelled", "Pending", "Accepted", "In Transit"],
    datasets: [
      {
        data: [
          completedCount,
          cancelledCount,
          pendingCount,
          acceptedCount,
          inTransitCount,
        ],
        backgroundColor: [
          "#4CAF50",
          "#B0B0B0",
          "#FFC107",
          "#2196F3",
          "#FF6600",
        ],
        borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
        borderWidth: 1,
        radius: "100%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        fullSize: false,
        labels: {
          font: {
            family: "Poppins, sans-serif",
            size: 10,
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: { family: "Poppins, sans-serif", size: 10 },

        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(0);
          return percentage > 0 ? `${percentage}%` : "";
        },
      },
    },
  };

  //

  const ranges = [
    "Yesterday",
    "Today",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Custom...",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  // Custom date inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Helper function to get date ranges for predefined ranges
  function getDateRange(rangeLabel) {
    const today = new Date();
    let startDate, endDate;

    switch (rangeLabel) {
      case "Yesterday":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = new Date(startDate);
        break;
      case "Today":
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case "Last 7 days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 6);
        endDate = new Date(today);
        break;
      case "Last 30 days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 29);
        endDate = new Date(today);
        break;
      case "Last 90 days":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 89);
        endDate = new Date(today);
        break;
      default:
        startDate = null;
        endDate = null;
    }

    const format = (d) => d.toISOString().split("T")[0];
    return {
      startDate: startDate ? format(startDate) : null,
      endDate: endDate ? format(endDate) : null,
    };
  }

  // When selecting a preset range
  const handleSelect = (range) => {
    setSelectedRange(range);
    setIsOpen(false);

    if (range !== "Custom...") {
      setFromDate("");
      setToDate("");
      const { startDate, endDate } = getDateRange(range);
      onDateRangeChange({ startDate, endDate });
    }
  };

  // When user manually selects dates (custom range)
  const handleFromDateChange = (e) => {
    const newFromDate = e.target.value;
    setFromDate(newFromDate);

    // Only update parent if both dates have values
    if (newFromDate && toDate) {
      onDateRangeChange({ startDate: newFromDate, endDate: toDate });
      setSelectedRange("Custom...");
    }
  };

  const handleToDateChange = (e) => {
    const newToDate = e.target.value;
    setToDate(newToDate);

    if (fromDate && newToDate) {
      onDateRangeChange({ startDate: fromDate, endDate: newToDate });
      setSelectedRange("Custom...");
    }
  };

  //

  const [customDateOpen, setCustomDateOpen] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };

  const actualFromDate = fromDate || getDateRange(selectedRange).startDate;
  const actualToDate = toDate || getDateRange(selectedRange).endDate;

  const [showTooltip, setShowTooltip] = useState(false);

  const [downloadButton, setDownloadButton] = useState(false);

  return (
    <>
      {/* <!-- START Customer Satisfaction Pie Chart --> */}
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between items-start w-full">
          <div className="flex-col items-center">
            <div className="flex items-center mb-1 relative">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
                Delivery Status
              </h5>
              <svg
                onClick={() => setShowTooltip(!showTooltip)}
                className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
              </svg>

              {showTooltip && (
                <div className="absolute z-10 left-4 top-5 w-72 text-sm text-white bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Delivery Status Overview
                    </h3>
                    <p className="text-gray-500">
                      This chart visualizes the distribution of delivery
                      statuses such as Completed, In Transit, Pending, Accepted,
                      and Cancelled. It helps in monitoring operational
                      efficiency and delivery flow.
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Calculation
                    </h3>
                    <p className="text-gray-500">
                      Each segment represents the proportion of deliveries in
                      that specific status during the selected date range. The
                      percentage is based on the total number of recorded
                      delivery transactions.
                    </p>
                    <a
                      href="#"
                      className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">
                      Read more{" "}
                      <svg
                        className="w-2 h-2 ms-1.5 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10">
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <button
              id="dateRangeButton"
              onClick={() => setCustomDateOpen(!customDateOpen)}
              type="button"
              className="inline-flex items-center text-gray-500  dark:text-blue-600 font-medium hover:underline">
              {formatDate(actualFromDate)} - {formatDate(actualToDate)}
              <svg
                className="w-3 h-3 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {customDateOpen && (
              <div
                id="dateRangeDropdown"
                className="z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ">
                <div className="p-3">
                  <div className="flex items-center flex-col sm:flex-row">
                    <div className="relative ">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        {/* <svg
                          className="w-4 h-4 text-black dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg> */}
                        <span>Start:</span>
                      </div>
                      <input
                        name="start"
                        type="date"
                        value={fromDate}
                        onChange={handleFromDateChange}
                        placeholder="Start date"
                        className="pl-16 pr-2 py-2 w-full rounded-lg border text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                    <span className="mx-2 text-black dark:text-gray-400 ">
                      to
                    </span>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        {/* <svg
                          className="w-4 h-4 text-black dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg> */}
                        <span>End:</span>
                      </div>
                      <input
                        name="start"
                        type="date"
                        value={toDate}
                        onChange={handleToDateChange}
                        placeholder="Start date"
                        className="pl-16 pr-2 py-2 w-full rounded-lg border text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end items-center relative">
            <button
              id="widgetDropdownButton"
              onClick={() => setDownloadButton(!downloadButton)}
              type="button"
              className="inline-flex items-center justify-center text-white w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
              <svg
                className="w-3.5 h-3.5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
              </svg>
              <span className="sr-only">Open dropdown</span>
            </button>

            {downloadButton && (
              <div
                id="widgetDropdown"
                className="z-10 absolute top-7 left-0  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg
                        className="w-3 h-3 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                        <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                      </svg>
                      Download data
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* <!-- Pie Chart --> */}
        <div className="relative w-[250px] h-[250px] mx-auto my-7 ">
          {completedCount +
            inTransitCount +
            pendingCount +
            cancelledCount +
            acceptedCount >
          0 ? (
            <Pie data={data} options={options} width={250} height={250} />
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No data available for selected range.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
          <div className="flex justify-between items-center pt-5">
            {/* <!-- Button --> */}

            <div>
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                // data-dropdown-toggle="transactions-dropdown"
              >
                {selectedRange}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              {isOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded shadow dark:bg-gray-700">
                  {/* <div className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                  Sep 16, 2021 - Sep 22, 2021
                </div> */}
                  <ul className="py-1">
                    {ranges.map((range) => (
                      <li key={range}>
                        <button
                          onClick={() => handleSelect(range)}
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                          {range}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <NavLink
               to="/admin/deliveryReports"
              className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-[#FC8002]  dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
              analysis
              <svg
                className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
      {/* <!-- END Customer Satisfaction Pie Chart --> */}
    </>
  );
};

export default StatusChart;
