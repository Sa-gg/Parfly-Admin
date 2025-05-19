import React, { useState, useRef, useEffect } from "react";

const TransactionTable = ({
  tableData,
  selectedStatuses,
  setSelectedStatuses,
  onDateRangeChange,
}) => {
  const filteredData = tableData;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  // Custom date inputs
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const ranges = [
    "Yesterday",
    "Today",
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Custom...",
  ];

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

  // STATUS DROPDOWN

  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusDropdownRef = useRef();
  const toggleStatusDropdown = () => setIsStatusOpen(!isStatusOpen);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(e.target)
      ) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const downloadCSV = () => {
    if (!filteredData || filteredData.length === 0) return;
  
    const headers = Object.keys(filteredData[0]);
    const csvRows = [
      headers.join(","), // Header row
      ...filteredData.map((row) =>
        headers.map((field) => `"${row[field] ?? ""}"`).join(",")
      ),
    ];
  
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "delivery_report.csv";
    link.click();
  
    window.URL.revokeObjectURL(url);
  };
  

  return (
    <>
      {/* <!-- Transactions --> */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        {/* <!-- Card header --> */}
        <div className="items-center justify-between lg:flex">
          <div className="mb-4 lg:mb-0">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Daily Delivery Summary
            </h3>
            <span className="text-base font-normal text-gray-500 dark:text-gray-400">
              Total number of deliveries per day
            </span>
          </div>
          <div className="sm:flex md:flex-row flex-col gap-2">
            <div className="relative flex items-center" ref={statusDropdownRef}>
              <button
                onClick={toggleStatusDropdown}
                className="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button">
                Filter by status
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isStatusOpen && (
                <div className="absolute top-full mt-2 z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                  <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </h6>
                  <ul className="space-y-2 text-sm">
                    {[
                      { id: "completed", label: "Completed " },
                      {
                        id: "cancelled",
                        label: "Cancelled ",
                      },
                      { id: "pending", label: "Pending " },
                      { id: "accepted", label: "Accepted " },
                      {
                        id: "in_transit",
                        label: "In Transit ",
                      },
                    ].map(({ id, label }) => (
                      <li key={id} className="flex items-center">
                        <input
                          id={id}
                          type="checkbox"
                          checked={selectedStatuses.includes(id)}
                          onChange={() => toggleStatus(id)}
                          className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor={id}
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                          {label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-start md:space-x-4  sm:flex-row gap-2 sm:flex hidden">
              <div className="relative ">
                {/* Calendar icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"></path>
                  </svg>
                </div>
                {/* "From" label */}
                <div className="absolute inset-y-0 left-10 flex items-center text-gray-500 text-sm pointer-events-none">
                  From
                </div>
                <input
                  name="start"
                  type="date"
                  value={fromDate}
            onChange={handleFromDateChange}
                  className="pl-24 pr-2 py-2 w-full rounded-lg border text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div className="relative ">
                {/* Calendar icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M5.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H6a.75.75 0 01-.75-.75V12zM6 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H6zM7.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H8a.75.75 0 01-.75-.75V12zM8 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H8zM9.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V10zM10 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H10zM9.25 14a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H10a.75.75 0 01-.75-.75V14zM12 9.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V10a.75.75 0 00-.75-.75H12zM11.25 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75V12zM12 13.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V14a.75.75 0 00-.75-.75H12zM13.25 10a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H14a.75.75 0 01-.75-.75V10zM14 11.25a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12a.75.75 0 00-.75-.75H14z"></path>
                    <path
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"></path>
                  </svg>
                </div>
                {/* "To" label */}
                <div className="absolute inset-y-0 left-10 flex items-center text-gray-500 text-sm pointer-events-none">
                  To
                </div>
                <input
                  name="finish"
                  type="date"
                  value={toDate}
                  onChange={handleToDateChange} 
                  className="pl-24 pr-2 py-2 w-full rounded-lg border text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Table --> */}
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Date & Time
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Status
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Total Deliveries
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Total Drivers
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Delivery Spread (Std. Dev)
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Driver Load Distribution{" "}
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Total Senders
                      </th>
                      <th className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white">
                        Total Receivers
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {filteredData.length > 0 ? (
                      filteredData.map((transaction, index) => {
                        const std = transaction.std_deliveries_per_driver;
                        let label = "N/A";
                        let colorClass =
                          "bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white";

                        if (std == 0) {
                          label = "✅ Balanced";
                          colorClass =
                            "text-green-800 dark:bg-green-700 dark:text-white";
                        } else if (std < 1.5) {
                          label = "⚠️ Slightly Uneven";
                          colorClass =
                            "text-yellow-800 dark:bg-yellow-700 dark:text-white";
                        } else if (std >= 1.5) {
                          label = "❗ Unbalanced";
                          colorClass =
                            "text-red-800 dark:bg-red-700 dark:text-white";
                        }

                        return (
                          <tr key={index}>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {transaction.delivery_date
                                ? new Date(
                                    transaction.delivery_date
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })
                                : "N/A"}
                            </td>
                            <td className="p-4 whitespace-nowrap">
                              {(() => {
                                const statusColors = {
                                  completed:
                                    "bg-green-100 text-green-800 border-green-100 dark:bg-gray-700 dark:text-green-400 dark:border-green-500",
                                  pending:
                                    "bg-yellow-100 text-yellow-800 border-yellow-100 dark:bg-gray-700 dark:text-yellow-400 dark:border-yellow-500",
                                  cancelled:
                                    "bg-red-100 text-red-800 border-red-100 dark:bg-gray-700 dark:text-red-400 dark:border-red-500",
                                  intransit:
                                    "bg-blue-100 text-blue-800 border-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:border-blue-500",
                                };

                                const status =
                                  transaction.status?.toLowerCase();
                                const statusStyle =
                                  statusColors[status] ||
                                  "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500";

                                return (
                                  <span
                                    className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md ${statusStyle}`}>
                                    {transaction.status || "N/A"}
                                  </span>
                                );
                              })()}
                            </td>

                            <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                              {transaction.total_deliveries || "N/A"}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {transaction.unique_drivers || "N/A"}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {std !== null ? std : "N/A"}
                            </td>
                            <td
                              className={`p-4 text-xs font-medium rounded-md whitespace-nowrap ${colorClass}`}>
                              {std !== null ? label : "N/A"}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {transaction.unique_senders || "N/A"}
                            </td>
                            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                              {transaction.unique_receivers || "N/A"}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-4 text-black">
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
        {/* <!-- Card Footer --> */}
        <div className="flex items-center justify-between pt-3 sm:pt-6">
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
          <div className="flex-shrink-0 sticky">
            <button
                onClick={downloadCSV}
              className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 sm:text-sm hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700">
              Download Report
              <svg
                className="w-4 h-4 ml-1 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TransactionTable;
