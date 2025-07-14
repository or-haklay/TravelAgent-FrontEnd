import PageHeader from "../common/pageHeader";
import ordersServices from "../../services/ordersServices";
import { toast } from "react-hot-toast";

function ApproveOrder({ setApproveOrderStatus, orderData }) {
  if (!orderData) return null;

  const handleApproveOrder = async (value) => {
    try {
      let updatedOrderPayload = { ...orderData };
      updatedOrderPayload.status = value ? "Confirmed" : "In Progress";
      console.log("Updated Order Payload:", updatedOrderPayload);
      const response = await ordersServices.updateOrder(
        orderData._id,
        updatedOrderPayload
      );
      handleClose();
      toast.success("Order approved successfully");
    } catch (error) {
      console.error("Error approved Order:", error);
      toast.error("Failed to approved Order");
    }
  };

  const handleClose = () => {
    setApproveOrderStatus(null);
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
          title={"Approve Order"}
          description={"Do You Sure You Want To Approve This Order?"}
        />
        <div className="my-2 d-flex align-items-center justify-content-center">
          <button
            type="button"
            onClick={() => handleApproveOrder(false)}
            className="btn btn-danger col-5 col-md-4  mx-auto d-block"
          >
            Do Not Approve
          </button>
          <button
            type="button"
            onClick={() => handleApproveOrder(true)}
            className="btn btn-success col-5 col-md-4  mx-auto d-block liveToastBtn"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
export default ApproveOrder;
