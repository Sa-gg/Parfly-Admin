import DeliveriesTable from "../components/DeliveriesTable";
import DeliveryForm from "../components/Modal/DeliveryForm.jsx";
import SenderModal from "../components/Modal/SenderModal.jsx";
import DeliveryDriverModal from "../components/Modal/DeliveryDriverModal.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeliveriesPage = () => {
  const [senderData, setSenderData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);

  // FETCH DATA
  const fetchSenderData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/clients");
      setSenderData(response.data);
    } catch (err) {
      console.error("Error fetching client data:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSenderData();
  }, []);

  const fetchDriverData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/drivers");
      setDriverData(response.data);
    } catch (err) {
      console.error("Error fetching client driver:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDriverData();
  }, []);

  const fetchDeliveryData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/deliveries");
      setDeliveryData(response.data);
    } catch (err) {
      console.error("Error fetching delivery data:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchDeliveryData();
  }, []);

  // MODAL HANDLING
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [senderModal, setSenderModal] = useState(false);
  const [modalType, setModalType] = useState("sender");
  const [driverModal, setDriverModal] = useState(false);


  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const setSenderModalWithType = (open, type = "sender") => {
    setModalType(type);
    setSenderModal(open);
  };

  const handleOpen = (mode, delivery) => {
    setModalMode(mode);
    setSelectedDelivery(delivery);
    setIsOpen(true);
  };


  // DELIVERY FORM DATA
  const [selectedSender, setSelectedSender] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  const handleSelectSender = (sender) => {
    setSelectedSender(sender);
    setSenderModal(false);
  };

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
    setDriverModal(false);
  };

  const handleSelectReceiver = (receiver) => {
    setSelectedReceiver(receiver);
    setSenderModal(false);
  };

 

  //DELIVERY FORM SUBMIT
  const handleSubmit = async (newDeliveryData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/deliveries",
          newDeliveryData
        );
        console.log("delivery added", response.data);
         toast.success("Delivery Added Successfully");
  
        // Fetch the full updated delivery data
        await fetchDeliveryData(); 
  
      } catch (err) {
        console.error("Error adding delivery", err);
          toast.error("Error Adding Delivery");
      }
    } else {
      console.log("modal mode Edit");
      try {
        const response = await axios.put(
          `http://localhost:3000/api/deliveries/${selectedDelivery.delivery_id}`,
          newDeliveryData
        );
        console.log("delivery updated", response.data);
        toast.success("Delivery Updated Successfully");
  
        // Re-fetch after update
        await fetchDeliveryData();
      } catch (err) {
        console.error("Error updating delivery", err);
         toast.error("Error Updating Delivery");
      }
    }
  };
  

  return (
    <>
      <DeliveriesTable
        handleOpen={handleOpen}
        deliveryData={deliveryData}
        setDeliveryData={setDeliveryData}
      />
      <DeliveryForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mode={modalMode}
        OnSubmit={handleSubmit}
        selectedDelivery={selectedDelivery}
        setSelectedDelivery={setSelectedDelivery}
        setSenderModal={setSenderModalWithType}
        selectedSender={selectedSender}
        setSelectedSender={setSelectedSender}
        setDriverModal={setDriverModal}
        selectedDriver={selectedDriver}
        setSelectedDriver={setSelectedDriver}
        selectedReceiver={selectedReceiver}
        setSelectedReceiver={setSelectedReceiver}
      />
      <SenderModal
        isOpen={senderModal}
        setIsOpen={setSenderModal}
        setSenderData={setSenderData}
        senderData={senderData}
        onSelectSender={
          modalType === "sender" ? handleSelectSender : handleSelectReceiver
        }
        modalType={modalType}
      />
      <DeliveryDriverModal
        isOpen={driverModal}
        setIsOpen={setDriverModal}
        setDriverData={setDriverData}
        driverData={driverData}
        onSelectDriver={handleSelectDriver}
      
      />
    </>
  );
};

export default DeliveriesPage;
