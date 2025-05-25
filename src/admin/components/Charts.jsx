import React from "react";
import StatusChart from "./charts/StatusChart";
import DriverChart from "./charts/DriverChart";
import DailyDeliveriesChart from "./charts/DailyDeliveriesChart";
import { useState, useEffect } from "react";
import axios from "axios";

const Charts = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const [statusData, setStatusData] = useState([]);

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  const formatDate= (date) => date.toLocaleDateString("en-CA"); // YYYY-MM-DD

  const [dateRange, setDateRange] = useState({
    startDate: formatDate(sevenDaysAgo),
    endDate: formatDate(today),
  });

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();

      if (dateRange.startDate) {
        params.append("startDate", dateRange.startDate);
      }
      if (dateRange.endDate) {
        params.append("endDate", dateRange.endDate);
      }

      console.log("dateforchart: ", dateRange)

      const response = await axios.get(`${API_URL}/api/transactions?${params}`);
      setStatusData(response.data);
    } catch (err) {
      console.error("Error fetching transactions data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);


  // DRIVER CHART

  const [driverDeliverySpreadData, setDriverDeliverySpreadData] = useState([]);
  const [driverDateRange, setDriverDateRange] = useState({
    startDate: formatDate(sevenDaysAgo),
    endDate: formatDate(today),
  });


  const fetchDriverChartData = async () => {
    try {
      const params = new URLSearchParams();

      if (driverDateRange.startDate) {
        params.append("startDate", driverDateRange.startDate);
      }
      if (driverDateRange.endDate) {
        params.append("endDate", driverDateRange.endDate);
      }

      const response = await axios.get(`${API_URL}/api/transactions?${params}`);
      setDriverDeliverySpreadData(response.data);
    } catch (err) {
      console.error("Error fetching transactions data:", err);
    }
  };

  useEffect(() => {
    fetchDriverChartData();
  }, [driverDateRange]);


  // dailyDeliveriesData

  const [dailyDeliveriesData, setDailyDeliveriesData] = useState([]);
  const [deliveryDateRange, setDeliveryDateRange] = useState({
    startDate: formatDate(sevenDaysAgo),
    endDate: formatDate(today),
  });


  const fetchDailyDeliveriesData = async () => {
    try {
      const params = new URLSearchParams();

      if (deliveryDateRange.startDate) {
        params.append("startDate", deliveryDateRange.startDate);
      }
      if (deliveryDateRange.endDate) {
        params.append("endDate", deliveryDateRange.endDate);
      }

      const response = await axios.get(`${API_URL}/api/transactions?${params}`);
      setDailyDeliveriesData(response.data);
    } catch (err) {
      console.error("Error fetching transactions data:", err);
    }
  };

  useEffect(() => {
    fetchDailyDeliveriesData();
  }, [deliveryDateRange]);


  return (
    <div
      id="charts"
      class="flex flex-row w-full gap-2.5 justify-start content-start flex-wrap mb-8">
      <div class="chart h-auto max-w-[300px] flex-[0_1_300px]">
        <StatusChart statusData={statusData} onDateRangeChange={setDateRange} />
      </div>
      <div class="chart h-auto max-w-[300px] flex-[0_1_300px]">
        <DriverChart  driverDeliverySpreadData={driverDeliverySpreadData} onDateRangeChange={setDriverDateRange}/>
      </div>
      <div class="chart h-auto max-w-[300px] flex-[0_1_300px]">
        <DailyDeliveriesChart dailyDeliveriesData={dailyDeliveriesData} onDateRangeChange={setDeliveryDateRange}/>
      </div>
    </div>
  );
};

export default Charts;
