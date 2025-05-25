import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import DriverTable from "../components/DriverTable";
import DriverModal from "../components/Modal/DriverModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DriversPage = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [driverData, setDriverData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/drivers`);
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode, driver) => {
    setDriverData(driver);
    setIsOpen(true);
    setModalMode(mode);
  };

  const MySwal = withReactContent(Swal);
  const handleSubmit = async (newDriverData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
       `${API_URL}/api/drivers`,
          newDriverData
        );
        console.log("driver added", response.data);
        toast.success("Driver Added Successfully");
        setTableData((prevData) => [...prevData, response.data]);
      } catch (err) {
        console.error("Error adding driver", err);
        toast.error("Error Adding Driver");
      }

      console.log("modal mode add");
    } else {
      const result = await MySwal.fire({
        title: "Update Driver?",
        text: "Do you want to proceed with updating this driver's information?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update",
        cancelButtonText: "Cancel",
      });

      if (!result.isConfirmed) return;

      try {
        const response = await axios.put(
          `${API_URL}/api/drivers/${driverData.user_id}`,
          newDriverData
        );
        console.log("driver updated", response.data);
        toast.success("Driver Updated Successfully");

        setTableData((prevData) =>
          prevData.map((driver) =>
            driver.user_id === driverData.user_id ? response.data : driver
          )
        );
      } catch (err) {
        console.error("Error updating driver", err);
        toast.error("Error Updating Driver");
      }
    }
  };

  return (
    <>
      <DriverTable
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
      />
      <DriverModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={modalMode}
        OnSubmit={handleSubmit}
        driverData={driverData}
      />
    </>
  );
};

export default DriversPage;
