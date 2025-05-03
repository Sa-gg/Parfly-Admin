import { useEffect, useState } from "react";

const DriverModal = ({ isOpen, setIsOpen, mode, OnSubmit, driverData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [vehicle, setVehicle] = useState("Motorcycle");
  const [plate, setPlate] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const resetForm = () => {

    setName("");
    setEmail("");
    setPhone("");
    setVehicle("Motorcycle");
    setPlate("");
    setPassword("");
    setResetPassword(true); // Show password input in add mode
  }

  const handleVehicle = (e) => {
    setVehicle(e.target.value);
  };

  useEffect(() => {
    console.log("Mode changed:", mode);
  }, [mode]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const driverData = {
        full_name: name,
        email,
        phone,
        vehicle_type: vehicle,
        vehicle_plate: plate,
      };

      if (mode === "add" || resetPassword) {
        driverData.password_hash = password;
      }

      await OnSubmit(driverData);
      resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }

    setIsOpen(false);
  };

  // DISPLAY DATA IN MODAL
  useEffect(() => {
    if (mode === "edit" && driverData) {
      setName(driverData.full_name);
      setEmail(driverData.email);
      setPhone(driverData.phone);
      setVehicle(driverData.vehicle_type);
      setPlate(driverData.vehicle_plate);
      setPassword("");
      setResetPassword(false); // Hide password field by default
    } else {
      resetForm();
    }
  }, [mode, driverData]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null; // Only render when open

  return (
    <>
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-[999]"
      onClick={handleBackdropClick}
    >
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my-4_modal_3" className="modal" open={isOpen}>
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Driver" : "Driver Details"}
          </h3>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setIsOpen(false)}>
            ✕
          </button>
          <form method="dialog" onSubmit={handleSubmit}>
            {/* if there is a button in form, it will close the modal */}
            <label className="input input-bordered flex items-center gap-2 my-4">
              Name:
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="grow border-none"
                placeholder=""
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4">
              Contact:
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                className="grow border-none"
                placeholder=""
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 my-4">
              Email:
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="grow border-none"
                placeholder=""
                required
              />
            </label>

            <div className="flex justify-between gap-4 my-4">
              <select
                value={vehicle}
                onChange={handleVehicle}
                className="select select-bordered w-[calc(50%-8px)]" // 50% width minus gap
              >
                <option value="Motorcycle">Motorcycle</option>
                <option value="Bike">Bike</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="MPV">MPV</option>
                <option value="Pickup">Pickup</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
              </select>

              <label className="input input-bordered flex items-center gap-2 w-[calc(50%-8px)]">
                Plate:
                
                <input
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  type="text"
                  className="w-full border-none"
                  placeholder=""
                  required
                />
              </label>
            </div>

            {mode === "edit" && (
              <label className="flex items-center gap-2 my-4">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-lg border-black"
                  checked={resetPassword}
                  onChange={(e) => setResetPassword(e.target.checked)}
                />
                Reset Password
              </label>
            )}

            {resetPassword && (
              <label className="input input-bordered flex items-center gap-2 my-4">
                {mode === "edit" ? "New Password" : "Password"}
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="grow border-none"
                  placeholder=""
                  required={mode !== "edit"} // Only required in create mode
                />
              </label>
            )}

            <button className="btn btn-success bg-blue-700 border-none text-white hover:bg-blue-800">
              {mode === "edit" ? "Save Changes" : "Add Driver"}
            </button>
          </form>
        </div>
      </dialog>
      </div>
    </>
  );
};
export default DriverModal;
