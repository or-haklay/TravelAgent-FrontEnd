import PageHeader from "../common/pageHeader";
import ordersServices from "../../services/ordersServices";
import { toast } from "react-hot-toast";

function DeletePassenger({
  setPassengerDeleteStatus,
  orderData,
  selectedPassengerIndex,
}) {
  if (!orderData) return null;

  const handleDeletePassenger = async () => {
    try {
      let updatedOrderPayload = { ...orderData };

      updatedOrderPayload.Passengers = [
        ...(updatedOrderPayload.Passengers || []),
      ];
      updatedOrderPayload.Passengers.pop(selectedPassengerIndex);
      const response = await ordersServices.updateOrderByAgent(
        orderData._id,
        updatedOrderPayload
      );
      setPassengerDeleteStatus(null);
      toast.success("Card deleted successfully");
    } catch (error) {
      console.error("Error deleting passenger:", error);
      toast.error("Failed to delete Passenger");
    }
  };

  const handleClose = () => {
    setPassengerDeleteStatus(null);
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
          title={"Passenger Deletion"}
          description={"Do You Sure You Want To Delete This Passenger?"}
        />
        <div className="my-2 d-flex align-items-center justify-content-center">
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-secondary col-5 col-md-4  mx-auto d-block"
          >
            cancel
          </button>
          <button
            type="button"
            onClick={handleDeletePassenger}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletePassenger;
