import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import useAuth from "../../context/auth.context";

import PageHeader from "../common/pageHeader";
import userService from "../../services/userServices";
import Input from "../common/input";

function ResetPassword({ setPasswordReset, userData }) {
  if (!userData) return null;
  const { user } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    try {
      userService.updatePassword(userData._id, "password123");
      toast.success("Password reset successfully");
      handleClose();
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password");
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setError((prevError) => {
      const newError = { ...prevError };
      if (name === "newPassword" && value.length < 6) {
        newError.newPassword = "Password must be at least 6 characters long";
      } else if (name === "newPassword") {
        newError.newPassword = "";
      }

      if (name === "confirmPassword") {
        if (value !== newPassword) {
          newError.confirmPassword = "Passwords do not match";
        } else {
          newError.confirmPassword = "";
        }
      }
      return newError;
    });
  };

  const handleUpdatePassword = () => {
    try {
      console.log("Updating password for user:", userData._id);
      if (error.newPassword || error.confirmPassword) {
        toast.error("Please fix the errors before updating the password");
        return;
      }
      setError({ newPassword: "", confirmPassword: "" });
      console.log(
        "Updating password for user:",
        userData._id,
        "to:",
        newPassword
      );

      userService.updatePassword(userData._id, newPassword);
      toast.success("Password updated successfully");
      handleClose();
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    }
  };

  const handleClose = () => {
    setPasswordReset(null);
  };

  if (userData._id !== user._id) {
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
            title="User Reset Password"
            description="Do You Sure You Want To Reset This User's Password To 'password123'? "
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
              onClick={handleResetPassword}
              className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          title="User Update Password"
          description="Reset your password to a new one. Please enter the new password twice
          to confirm."
        />
        <hr />
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
          error={error.newPassword}
          onBlur={handleBlur}
          autoFocus
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error.confirmPassword}
          onBlur={handleBlur}
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
            onClick={handleUpdatePassword}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
export default ResetPassword;
