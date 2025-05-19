import StatCards from "../components/StatCards";
import TransactionTable from "../components/TransactionTable";
import DeliveryStatusCards from "../components/DeliveryStatusCards";

import { useState, useEffect } from "react";
import axios from "axios";

const DeliveryReports = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [tableData, setTableData] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([
    "completed",
    "cancelled",
    "in_transit",
    "pending"
  ]);
  
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);
  
  const formatDate = (date) => date.toISOString().split("T")[0];
  
  const [dateRange, setDateRange] = useState({
    startDate: formatDate(sevenDaysAgo),
    endDate: formatDate(today),
  });
  

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();

      selectedStatuses.forEach((status) => params.append("status", status));
      if (dateRange.startDate) {
        params.append("startDate", dateRange.startDate);
      }
      if (dateRange.endDate) {
        params.append("endDate", dateRange.endDate);
      }

      const response = await axios.get(`${API_URL}/api/transactions?${params}`);
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching transactions data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange, selectedStatuses]);

  return (
    <>
      <DeliveryStatusCards tableData={tableData} />
      <TransactionTable
        tableData={tableData}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        onDateRangeChange={setDateRange}
      />
    </>
  );
};
export default DeliveryReports;
