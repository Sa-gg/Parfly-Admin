import { useEffect, useState } from "react";

const CustomerModal = ({ isOpen, setIsOpen, mode, OnSubmit, clientData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setResetPassword(mode !== "edit"); // true for add, false for edit
  };

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && clientData) {
        setName(clientData.full_name);
        setEmail(clientData.email);
        setPhone(clientData.phone);
        setPassword("");
        setResetPassword(false);
      } else {
        resetForm();
      }
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clientPayload = {
        full_name: name,
        email,
        phone,
      };
      if (mode === "add" || resetPassword) {
        clientPayload.password_hash = password;
      }
      await OnSubmit(clientPayload);
      resetForm();
      setIsOpen(false);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
     
    }
  };

  

  if (!isOpen) return null; // Only render when open

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-[999]"
      onClick={handleBackdropClick}
    >
      <dialog
        open
        className="modal-box bg-white relative rounded-lg shadow-lg w-11/12 max-w-md"
      >
        <h3 className="font-bold text-lg py-4">
          {mode === "edit" ? "Edit Customer" : "Customer Details"}
        </h3>
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <form method="dialog" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 my-4">
            Name:
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="grow border-none"
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
              required
            />
          </label>

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
                required={mode !== "edit"}
              />
            </label>
          )}

          <button className="btn btn-success bg-blue-700 border-none text-white hover:bg-blue-800 w-full mt-4">
            {mode === "edit" ? "Save Changes" : "Add Customer"}
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default CustomerModal;
