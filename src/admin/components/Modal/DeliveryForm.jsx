import { useEffect, useState } from "react";
import LocationSearch from "../LocationSearch.jsx";

const DeliveryForm = ({
  isOpen,
  setIsOpen,
  mode,
  OnSubmit,
  selectedDelivery,
  setSelectedDelivery,
  setSenderModal,

  selectedSender,
  setSelectedSender,

  setDriverModal,
  selectedDriver,
  setSelectedDriver,

  selectedReceiver,
  setSelectedReceiver,
}) => {
  const [paymentResponsibility, setPaymentResponsibility] = useState("Sender");
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);

  const [sender_id, setSender_id] = useState("");
  const [receiver_id, setReceiver_id] = useState("");
  const [driver_id, setDriver_id] = useState("");
  const [pickup_address, setPickup_address] = useState("");
  const [dropoff_address, setDropoff_address] = useState("");
  const [status, setStatus] = useState("pending");
  const [payer, setPayer] = useState("sender");
  const [add_info, setAdd_info] = useState("");
  const [pickup_lat, setPickup_lat] = useState("");
  const [pickup_long, setPickup_long] = useState("");
  const [dropoff_lat, setDropoff_lat] = useState("");
  const [dropoff_long, setDropoff_long] = useState("");
  const [parcel_amount, setParcel_amount] = useState("");
  const [accepted_at, setAccepted_at] = useState("");
  const [received_at, setReceived_at] = useState("");


  const resetForm = () => {
    setSender_id("");
      setReceiver_id("");
      setDriver_id("");
      setPickup_address("");
      setDropoff_address("");
      setStatus("pending");
      setPayer("sender");
      setAdd_info("");
      setPickup_lat("");
      setPickup_long("");
      setDropoff_lat("");
      setDropoff_long("");
      setParcel_amount("");
      setAccepted_at("");
      setReceived_at("");
      setPickupLocation(null);
      setDropoffLocation(null);
      setSelectedSender(null);
      setSelectedDriver(null);
      setSelectedReceiver(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(pickupLocation, dropoffLocation);
    try {
      const selectedDelivery = {
        sender_id: selectedSender?.id ?? null,
        receiver_id: selectedReceiver?.id ?? null,
        driver_id: selectedDriver?.id ?? null,
        pickup_address: pickupLocation?.address || "",
        dropoff_address: dropoffLocation?.address || "",
        status,
        payer,
        add_info,
        pickup_lat: pickupLocation?.lat ?? null,
        pickup_long: pickupLocation?.lon ?? null,
        dropoff_lat: dropoffLocation?.lat ?? null,
        dropoff_long: dropoffLocation?.lon ?? null,
        parcel_amount: parcel_amount === "" ? null : parseFloat(parcel_amount),
        accepted_at,
        received_at,
      };
      console.log("Selected Delivery Object:", selectedDelivery);
      await OnSubmit(selectedDelivery);
      resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }

    setIsOpen(false);
  };

  // DISPLAY DATA IN MODAL
  useEffect(() => {
    if (mode === "edit" && selectedDelivery) {
      setSender_id(selectedDelivery.sender_id);
      setReceiver_id(selectedDelivery.receiver_id);
      setDriver_id(selectedDelivery.driver_id);
      setPickup_address(selectedDelivery.pickup_address);
      setDropoff_address(selectedDelivery.dropoff_address);
      setStatus(selectedDelivery.status || "pending");
      setPayer(selectedDelivery.payer);
      setAdd_info(selectedDelivery.add_info || "");
      setPickup_lat(selectedDelivery.pickup_lat);
      setPickup_long(selectedDelivery.pickup_long);
      setDropoff_lat(selectedDelivery.dropoff_lat);
      setDropoff_long(selectedDelivery.dropoff_long);
      setParcel_amount(selectedDelivery.parcel_amount);
      setAccepted_at(selectedDelivery.accepted_at || "");
      setReceived_at(selectedDelivery.received_at || "");

      if (selectedDelivery.sender_id && selectedDelivery.sender_name) {
        setSelectedSender({
          id: selectedDelivery.sender_id,
          name: selectedDelivery.sender_name,
        });
      }
      if (selectedDelivery.receiver_id && selectedDelivery.receiver_name) {
        setSelectedReceiver({
          id: selectedDelivery.receiver_id,
          name: selectedDelivery.receiver_name,
        });
      }
      if (selectedDelivery.driver_id && selectedDelivery.driver_name) {
        setSelectedDriver({
          id: selectedDelivery.driver_id,
          name: selectedDelivery.driver_name,
        });
      }

      setPickupLocation({
        lat: selectedDelivery.pickup_lat,
        lon: selectedDelivery.pickup_long,
        address: selectedDelivery.pickup_address,
      });

      setDropoffLocation({
        lat: selectedDelivery.dropoff_lat,
        lon: selectedDelivery.dropoff_long,
        address: selectedDelivery.dropoff_address,
      });
    } else {
      resetForm();
      // setSelectedDelivery(null);
    }
  }, [mode, selectedDelivery]);

  useEffect(() => {
    console.log("Mode changed:", mode);
  }, [mode]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-[999] ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 bg-white h-full shadow-lg z-[1000] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {mode === "add" ? "Add Delivery" : "Edit Delivery"}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm btn-circle">
              ✕
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit}>
              {/* Sender Field */}
              <label className="form-control w-full relative">
                <div className="label">
                  <span className="label-text font-bold">Sender</span>
                  <span className="label-text-alt">
                    {selectedSender ? `ID: ${selectedSender.id}` : ""}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedSender ? selectedSender.name : ""}
                    readOnly
                    className="input input-bordered input-s w-full pr-10"
                  />
                  {selectedSender && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-primary "
                      onClick={() => setSelectedSender(null)}>
                      ✕
                    </button>
                  )}
                </div>
                <div className="label py-0">
                  <span className="label-text font-bold-alt text-xs text-blue-700">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSenderModal(true, "sender"); // pass "sender" as type
                      }}
                      className="underline">
                      Assign Sender
                    </button>
                  </span>
                </div>
              </label>

              {/* Driver Field */}
              <label className="form-control w-full relative">
                <div className="label">
                  <span className="label-text font-bold">Driver</span>
                  <span className="label-text-alt">
                    {selectedDriver ? `ID: ${selectedDriver.id}` : ""}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedDriver ? selectedDriver.name : ""}
                    readOnly
                    className="input input-bordered input-s w-full pr-10"
                  />
                  {selectedDriver && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-primary"
                      onClick={() => setSelectedDriver(null)}>
                      ✕
                    </button>
                  )}
                </div>
                <div className="label py-0">
                  <span className="label-text font-bold-alt text-xs text-blue-700">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDriverModal(true);
                      }}
                      className="underline">
                      Assign Driver
                    </button>
                  </span>
                </div>
              </label>

              <label className="form-control w-full relative">
                <div className="label">
                  <span className="label-text font-bold">Receiver</span>
                  <span className="label-text-alt">
                    {selectedReceiver ? `ID: ${selectedReceiver.id}` : ""}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={selectedReceiver ? selectedReceiver.name : ""}
                    readOnly
                    className="input input-bordered input-s w-full pr-10"
                  />
                  {selectedReceiver && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-primary"
                      onClick={() => setSelectedReceiver(null)}>
                      ✕
                    </button>
                  )}
                </div>
                <div className="label py-0">
                  <span className="label-text font-bold-alt text-xs text-blue-700">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSenderModal(true, "receiver"); // pass "receiver" as type
                      }}
                      className="underline">
                      Assign Receiver
                    </button>
                  </span>
                </div>
              </label>

              {/* Pickup Location */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Pickup Location</span>
                </div>
                <LocationSearch
                  placeholder=""
                  onSelect={(loc) => setPickupLocation(loc)}
                  value={pickupLocation}
                />

                {pickupLocation && (
                  <>
                    <input
                      type="hidden"
                      name="pickup_lat"
                      value={pickupLocation.lat}
                    />
                    <input
                      type="hidden"
                      name="pickup_lon"
                      value={pickupLocation.lon}
                    />
                  </>
                )}
                <div className="label py-0">
                  <span className="label-text font-bold-alt text-xs">
                    Pin Location
                  </span>
                </div>
              </label>

              {/* Dropoff Location */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Dropoff Location</span>
                </div>
                <LocationSearch
                  placeholder=""
                  onSelect={(loc) => setDropoffLocation(loc)}
                  value={dropoffLocation}
                />

                {dropoffLocation && (
                  <>
                    <input
                      type="hidden"
                      name="dropoff_lat"
                      value={dropoffLocation.lat}
                    />
                    <input
                      type="hidden"
                      name="dropoff_lon"
                      value={dropoffLocation.lon}
                    />
                  </>
                )}
                <div className="label py-0">
                  <span className="label-text font-bold-alt text-xs">
                    Pin Location
                  </span>
                </div>
              </label>

              {/* Additional Info */}
              <label className="form-control mb-4">
                <div className="label">
                  <span className="label-text font-bold">
                    Additional Information
                  </span>
                </div>
                <textarea
                  value={add_info}
                  onChange={(e) => setAdd_info(e.target.value)}
                  className="textarea textarea-bordered h-24"
                  placeholder=""></textarea>
              </label>

              {/* Payment Responsibility */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold">
                    Payment Responsibility
                  </span>
                </div>
                <select
                  value={paymentResponsibility}
                  onChange={(e) => setPaymentResponsibility(e.target.value)}
                  className="select select-bordered w-full">
                  <option value="Sender">Sender Pays</option>
                  <option value="Receiver">Receiver Pays</option>
                </select>
              </label>

              {/* COD Input */}
              {paymentResponsibility === "Receiver" && (
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text font-bold">
                      Parcel Amount (COD)
                    </span>
                  </div>
                  <input
                    value={parcel_amount}
                    onChange={(e) => setParcel_amount(e.target.value)}
                    type="text"
                    className="input input-bordered input-s w-full"
                  />
                </label>
              )}

              {/* Status Select */}
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-bold">Status</span>
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select select-bordered w-full">
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="in_transit">In Transit</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>

              {/* ✅ Submit button moved inside the form */}
              <div className="pt-4 border-t mt-4">
                <button
                  type="submit"
                  className="btn btn-success bg-blue-700 border-none text-white hover:bg-blue-800 w-full">
                  {mode === "add" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryForm;
