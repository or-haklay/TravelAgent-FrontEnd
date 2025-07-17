import PageHeader from "../common/pageHeader";
import userService from "../../services/userServices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

function DeleteUser({ setUserDelete, userData }) {
  if (!userData) return null;
  const navigate = useNavigate();

  const handleDeleteUser = () => {
    try {
      userService.deleteUser(userData._id);
      toast.success("User deleted successfully");
      navigate("/usersManager");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete User");
    }
  };

  const handleClose = () => {
    setUserDelete(null);
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
          title="User Deletion"
          description="Do You Sure You Want To Delete This User?"
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
            onClick={handleDeleteUser}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteUser;
