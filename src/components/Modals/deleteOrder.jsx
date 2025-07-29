import PageHeader from "../common/pageHeader";
import ordersServices from "../../services/ordersServices";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../context/auth.context";
import { set } from "lodash";

function DeleteOrder({ setOrderDeleteStatus, orderData }) {
  if (!orderData) return null;
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleDeleteOrder = () => {
    try {
      ordersServices.deleteOrder(orderData._id);
      toast.success("Card deleted successfully");
      if (user.isAdmin) {
        navigate("/ordersManager");
      } else {
        navigate("/ordersAgent");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete Order");
    }
  };

  const handleCancel = async () => {
    let updatedOrderPayload = { ...orderData };
    updatedOrderPayload.status = "Cancelled";
    try {
      await ordersServices.updateOrder(orderData._id, updatedOrderPayload);
      toast.success("Order cancelled successfully");
      handleClose();
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel Order");
    }
  };

  const handleClose = () => {
    setOrderDeleteStatus(null);
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
          title={user.isAdmin ? "Order Deletion" : "Order Cancellation"}
          description={
            user.isAdmin
              ? "Do You Sure You Want To Delete This Order?"
              : "Do You Sure You Want To Cancel This Order?"
          }
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
            onClick={user.isAdmin ? handleDeleteOrder : handleCancel}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            {user.isAdmin ? "Delete" : "Cancel Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteOrder;
