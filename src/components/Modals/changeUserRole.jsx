import { toast } from "react-hot-toast";
import { useState } from "react";

import userService from "../../services/userServices";

import PageHeader from "../common/pageHeader";
import Input from "../common/input";

function ChangeUserRole({ setUserRole, userData }) {
  if (!userData) return null;

  const [newRole, setNewRole] = useState("");
  const handleChange = (e) => {
    setNewRole(e.target.value);
    console.log("New role selected:", e.target.value);
  };

  const handleChangeUserRole = () => {
    if (!newRole) {
      toast.error("Please select a role.");
      return;
    }
    if (newRole === userData.role) {
      toast.info("User already has this role.");
      return;
    }
    try {
      userService.changeUserRole(userData._id, newRole);
      toast.success("User role changed successfully");
      handleClose();
    } catch (error) {
      console.error("Error changing user role:", error);
      toast.error("Failed to change user role");
    }
  };

  const handleClose = () => {
    setUserRole(null);
  };

  return (
    <div
      className="position-fixed top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
      style={{ zIndex: 1050 }}
    >
      <div
        className="bg-body border border-success p-4 rounded shadow-lg"
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          width: "600px",
        }}
      >
        <div className="my-0 d-flex align-items-center justify-content-end ">
          <button
            type="button"
            aria-label="Close"
            className="btn btn-success d-block btn-close"
            onClick={handleClose}
          ></button>
        </div>
        <PageHeader
          title="User Role Change"
          description="Choose a new role for the user."
        />
        <Input
          name="role"
          label="New Role"
          type="select"
          children={[
            { label: "Select Role", value: "" },
            { label: "Customer", value: "customer" },
            { label: "Agent", value: "agent" },
            { label: "Admin", value: "admin" },
          ]}
          onChange={handleChange}
          className="form-select"
          autoFocus
          autoComplete="off"
          placeholder="Select Role"
          required
        />
        <div className="my-2 d-flex align-items-center justify-content-center">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-secondary col-5 col-md-4  mx-auto d-block"
          >
            Exit
          </button>
          <button
            type="button"
            onClick={handleChangeUserRole}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            Change User Role
          </button>
        </div>
      </div>
    </div>
  );
}
export default ChangeUserRole;
