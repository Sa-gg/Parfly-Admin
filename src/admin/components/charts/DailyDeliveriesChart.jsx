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
  
  ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
    ChartDataLabels
  );
  
  const DailyDeliveriesChart = ({ dailyDeliveriesData, onDateRangeChange }) => {

    console.log("dailyDeliveriesData", dailyDeliveriesData);

    const completedData = dailyDeliveriesData.filter(
    (entry) => entry.status === "completed"
  );

  // Aggregate total_deliveries per day (in case there are multiple 'completed' entries per date)
  const deliveriesPerDay = completedData.reduce((acc, entry) => {
    const date = new Date(entry.delivery_date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    acc[date] = (acc[date] || 0) + parseInt(entry.total_deliveries, 10);
    return acc;
  }, {});

  // Prepare labels and data for the chart
  const chartLabels = Object.keys(deliveriesPerDay);
  const completedDeliveries = Object.values(deliveriesPerDay);


      
      
  
    const data = {
      labels: chartLabels,
      datasets: [
        {
          label: "Completed Deliveries",
          data: completedDeliveries,
          borderColor: "#FC8002",
          backgroundColor: "#4CAF50",
          fill: false,
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
          formatter: (value) => `${value}`,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Completed Deliveries",
          },
          ticks: {
            precision: 0,
          },
        },
        x: {
          title: {
            display: false,
            text: "Date",
          },
          grid: {
            display: false,
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
  
      const format = (d) => d.toLocaleDateString("en-CA");
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
  
    return (
      <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
          <div>
            <h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white pb-2">
              Daily Deliveries
            </h5>
            <p className="text-base font-normal text-gray-900 dark:text-gray-400">
              Completed Deliveries Over Time
            </p>
          </div>
        </div>
  
        <div className="relative w-[250px] h-[250px] mx-auto my-6 mt-7" >
          <Line data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
  
        <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
          <div className="flex justify-between items-center pt-5">
            <div>
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                type="button"
                onClick={() => setIsOpen(!isOpen)}>
                {selectedRange}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
  
              {isOpen && (
                <div className="absolute z-50 mt-2 w-48 bg-white rounded shadow dark:bg-gray-700">
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
              className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-[#FC8002] dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
              Report
              <svg
                className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
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
            </NavLink>
          </div>
        </div>
      </div>
    );
  };
  
  export default DailyDeliveriesChart;
  