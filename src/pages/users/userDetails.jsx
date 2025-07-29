import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import userService from "../../services/userServices";
import useAuth from "../../context/auth.context";

import PageHeader from "../../components/common/pageHeader";
import LoadingSpinner from "../../components/common/loadingSpinners";
import DeleteUser from "../../components/Modals/deleteUser";
import ResetPassword from "../../components/Modals/resetPassword";
import ChangeUserRole from "../../components/Modals/changeUserRole";
function UserDetails() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  const [roleSet, setRoleSet] = useState(null);
  const [passwordReset, setPasswordReset] = useState(null);
  const [userDelete, setUserDelete] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = await userService.getUserDetails(id);
        setUserDetails(userData);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
    fetchUserDetails();
  }, [id, roleSet]);

  const handleDeleteUser = async () => {
    setUserDelete(userDetails);
  };

  const handleResetPassword = async () => {
    setPasswordReset(userDetails);
  };

  const handleSetRole = async () => {
    setRoleSet(userDetails);
  };

  if (!userDetails || Object.keys(userDetails).length === 0) {
    return (
      <div className="container">
        <PageHeader title="User Details" description={"Loading User Data..."} />
        <LoadingSpinner text={"Loading User Data..."} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-end col-12 align-items-end gap-2">
        {user._id !== id && (
          <button
            className="btn btn-info my-2 "
            title="Change User Role"
            onClick={handleSetRole}
          >
            Role <i className="bi bi-arrow-left-right"></i>
          </button>
        )}
        {user._id === id && (
          <button
            className="btn btn-primary my-2 "
            title="Edit User"
            onClick={() => navigate("/editUser")}
          >
            <i className="bi bi-pencil"></i>
          </button>
        )}
        <button
          className="btn btn-warning my-2 fw-bold"
          title="Reset Password"
          onClick={handleResetPassword}
        >
          <i className="bi bi-key-fill"></i>
        </button>

        {user.isAdmin && (
          <button
            className="btn btn-danger my-2 "
            title="Delete User"
            onClick={handleDeleteUser}
          >
            <i className="bi bi-trash3"></i>
          </button>
        )}
      </div>
      <PageHeader
        title="User Details"
        description={
          userDetails.name?.first + " " + userDetails.name?.last + " - " + id
        }
      />
      <hr />
      <div className="container mt-4">
        <h3>User Information</h3>
        <p>
          <strong>Email:</strong> {userDetails.email}
        </p>
        <p>
          <strong>Phone:</strong> {userDetails.phone}
        </p>
        <p className="d-flex align-items-center gap-2">
          <strong>Role:</strong>{" "}
          {userDetails.isAdmin ? (
            <>
              Admin <i className="bi bi-award-fill"></i>
            </>
          ) : userDetails.isAgent ? (
            <>
              Agent <i className="bi bi-award"></i>
            </>
          ) : (
            "Customer"
          )}
        </p>
      </div>

      <hr />
      <div className="container mt-4">
        <h5>User Address</h5>
        <p>
          <strong>Street:</strong> {userDetails.address?.street || "-"}
        </p>
        <p>
          <strong>City:</strong> {userDetails.address?.city || "-"}
        </p>
        <p>
          <strong>Country:</strong> {userDetails.address?.country || "-"}
        </p>
        <p>
          <strong>House Number:</strong>{" "}
          {userDetails.address?.houseNumber || "-"}
        </p>
        <p>
          <strong>Zip Code:</strong> {userDetails.address?.zip || "-"}
        </p>
      </div>
      <hr />
      <div className="container mt-4">
        <h5>User Passport</h5>
        <p>
          <strong>Passport Number:</strong>{" "}
          {userDetails.passport?.passportNumber || "-"}
        </p>
        <p>
          <strong>Passport Date:</strong>{" "}
          {userDetails.passport?.passportDate
            ? new Date(userDetails.passport.passportDate).toLocaleDateString()
            : "-"}
        </p>
        <p>
          <strong>Passport Country:</strong>{" "}
          {userDetails.passport?.passportCountry || "-"}
        </p>
      </div>
      <DeleteUser setUserDelete={setUserDelete} userData={userDelete} />
      <ResetPassword
        setPasswordReset={setPasswordReset}
        userData={passwordReset}
      />
      <ChangeUserRole setUserRole={setRoleSet} userData={roleSet} />
    </div>
  );
}

export default UserDetails;
