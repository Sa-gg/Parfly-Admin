import CustomerTable from "../components/CustomerTable";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerModal from "../components/Modal/CustomerModal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CustomersPage = () => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; 
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/clients`);
      setTableData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (mode, client) => {
    setModalMode(mode);
    setClientData({ ...client, _trigger: Date.now() }); // Add dummy field to trigger effect
    setIsOpen(true);
  };
  const MySwal = withReactContent(Swal);
  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          `${API_URL}/api/clients`,
          newClientData
        );
        console.log("client added", response.data);
        toast.success("Customer Added Successfully");
        setTableData((prevData) => [...prevData, response.data]);
      } catch (err) {
        console.error("Error adding client", err);
        toast.error("Error Adding Customer");
      }
  
      console.log("modal mode add");
    } else {
      console.log("modal mode Edit");
      console.log("clientData.user_id", clientData.user_id);
      console.log("Updating Client with ID", clientData.user_id);
  
      const result = await MySwal.fire({
        title: "Update Client?",
        text: "Do you want to apply the changes to this client?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update",
        cancelButtonText: "Cancel",
      });
  
      if (!result.isConfirmed) return;
  
      try {
        const response = await axios.put(
          `${API_URL}/api/clients/${clientData.user_id}`,
          newClientData
        );
        console.log("client updated", response.data);
        toast.success("Customer Updated Successfully");
  
        setTableData((prevData) =>
          prevData.map((client) =>
            client.user_id === clientData.user_id ? response.data : client
          )
        );
      } catch (err) {
        console.error("Error updating client", err);
        toast.error("Error Updating Customer");
      }
    }
  };

  return (
    <>
      <CustomerTable
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
      />
      <CustomerModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={modalMode}
        OnSubmit={handleSubmit}
        clientData={clientData}
      />
    </>
  );
};

export default CustomersPage;
