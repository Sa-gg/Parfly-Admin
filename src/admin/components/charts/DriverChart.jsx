import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { NavLink } from "react-router";

// Register needed components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const DriverChart = ({ driverDeliverySpreadData, onDateRangeChange }) => {
  console.log(driverDeliverySpreadData);

  const chartLabels = driverDeliverySpreadData.map((entry) =>
    new Date(entry.delivery_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  );

  const stdData = driverDeliverySpreadData.map((entry) =>
    parseFloat(entry.std_deliveries_per_driver)
  );

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "STD of Deliveries per Driver",
        data: stdData,
        fill: false,
        borderColor: "#FC8002",
        tension: 0.4,
        pointBackgroundColor: "#FC8002",
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#000",
        anchor: "end",
        align: "top",
        formatter: (value) => `${value}%`,
      },
    },
    scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => `${val}%`,
          },
          grid: {
            display: true, // Hide horizontal lines
          },
        },
        x: {
          grid: {
            display: false, // Optional: also hide vertical lines
          },
        },
      },
  };

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

  const handleSelect = (range) => {
    setSelectedRange(range);
    setIsOpen(false);
    const { startDate, endDate } = getDateRange(range);
    onDateRangeChange({ startDate, endDate });
  };

  const latestStd = stdData[stdData.length - 1] ?? 0;

  // Determine label and color class based on value
  let label = "";
  let colorClass = "";

  if (latestStd <= 1) {
    label = "Perfectly Balanced";
    colorClass = "text-green-500 bg-green-100 dark:bg-green-900";
  } else if (latestStd <= 3) {
    label = "Slightly Imbalanced";
    colorClass = "text-yellow-600 bg-yellow-100 dark:bg-yellow-900";
  } else {
    label = "Significantly Uneven";
    colorClass = "text-red-600 bg-red-100 dark:bg-red-900";
  }

  return (
    <>
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
          <div>
            <h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white pb-2">
              Driver Load Distribution (Std. Dev)
            </h5>
            <p className="text-base font-normal text-gray-900 dark:text-gray-400">
              Current Spread:
            </p>
          </div>
          <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center relative">
            <div
              className={` absolute right-0 top-9 flex items-center px-2.5 py-0.5 text-[.8rem] font-semibold rounded leading-[1rem] ${colorClass}`}>
              {label}
            </div>
          </div>
        </div>

        {/* CHART */}

        <div className="relative w-[250px] h-[250px] mx-auto my-3">
          <Line data={data} options={options} plugins={[ChartDataLabels]} />
        </div>

        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
          <div className="flex justify-between items-center pt-5">
            <div>
              {/* <!-- Button --> */}
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
              className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-[#FC8002] dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
              Report
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
    </>
  );
};
export default DriverChart;
