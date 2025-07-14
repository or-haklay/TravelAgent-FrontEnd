import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

import ordersService from "../services/ordersServices";
import useAuth from "../context/auth.Context";

import PageHeader from "../components/common/pageHeader";
import LoadingSpinner from "../components/common/loadingSpinners";
import ContactStatus from "../components/Modals/contact";
import DeleteOrder from "../components/Modals/deleteOrder";
import UpdateOrder from "../components/Modals/updateOrder";
import DeletePassenger from "../components/Modals/deletePassenger";
import ApproveOrder from "../components/Modals/approveOrder";

function OrderDetails({ order }) {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderData, setOrderData] = useState(order);
  const [orderDeleteStatus, setOrderDeleteStatus] = useState(order);
  const [orderUpdateStatus, setOrderUpdateStatus] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const [selectedPassengerIndex, setSelectedPassengerIndex] = useState(null);
  const [passengerDeleteStatus, setPassengerDeleteStatus] = useState(null);
  const [approvalOrderStatus, setApprovalOrderStatus] = useState(null);
  const [canBeEdited, setCanBeEdited] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await ordersService.getOrderById(id);
        setOrderData(orderData);
        setCanBeEdited(
          user.isAgent
            ? user.isAdmin ||
                orderData.orderStatus === "Wait For Agent" ||
                orderData.orderStatus === "In Progress" ||
                orderData.orderStatus === "Pending Customer Approval"
            : orderData.orderStatus === "Wait For Agent" ||
                orderData.orderStatus === "In Progress"
        );
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [
    orderUpdateStatus,
    passengerDeleteStatus,
    approvalOrderStatus,
    orderDeleteStatus,
  ]);

  if (!orderData) {
    return <LoadingSpinner text={"Loading Order Details..."} />;
  }

  const handleDeleteOrder = () => {
    console.log("Deleting order with ID:", id);
    setOrderDeleteStatus(orderData);
  };
  const handleUpdateFlights = () => {
    setOrderUpdateStatus("Flights");
  };
  const handleUpdateGeneral = () => {
    setOrderUpdateStatus("General");
  };
  const handleEditPassenger = (index) => {
    setSelectedPassengerIndex(index);
    setOrderUpdateStatus("Passengers");
  };
  const handleDeletePassenger = (index) => {
    setSelectedPassengerIndex(index);
    setPassengerDeleteStatus(orderData);
  };

  const handleReturnToOrders = () => {
    if (user.isAdmin) {
      navigate("/ordersManager");
    } else if (user.isAgent) {
      navigate("/ordersAgent");
    } else {
      navigate("/ordersUser");
    }
  };
  const handleAgentInfo = async () => {
    try {
      if (user.isAdmin || user.isAgent) {
        setContactStatus(orderData.customer);
      } else if (!orderData.agent || !orderData.agent.number) {
        setContactStatus("null");
      } else {
        setContactStatus(orderData.agent);
      }
    } catch (error) {
      console.error("Failed to fetch agent data:", error);
    }
  };
  const handleApproveOrder = async () => {
    setApprovalOrderStatus(orderData);
  };

  return (
    <div className="container ">
      <div className="my-0 d-flex align-items-center justify-content-end gap-2">
        {!user.isAdmin && !user.isAgent ? (
          <button
            className="btn btn-info my-2 rounded-circle"
            title="Agent Contact"
            onClick={handleAgentInfo}
          >
            <i className="bi bi-info-lg"></i>
          </button>
        ) : (
          <button
            className="btn btn-info my-2 rounded-circle"
            title="Agent Contact"
            onClick={handleAgentInfo}
          >
            <i className="bi bi-info-lg"></i>
          </button>
        )}

        {canBeEdited ? (
          <button
            className="btn btn-danger my-2"
            title={user.isAdmin ? "Delete Order" : "Cancel Order"}
            onClick={handleDeleteOrder}
          >
            <i className="bi bi-trash3"></i>
          </button>
        ) : null}

        <button
          className="btn btn-secondary my-2"
          title="Return to Orders"
          onClick={handleReturnToOrders}
        >
          <i className="bi bi-arrow-return-right"></i>
        </button>
      </div>
      <PageHeader
        title={"Order Details"}
        description={"Order Number: '" + orderData._id + "'"}
      />
      <hr />
      {/*//* Flights Details: */}

      <div className=" d-flex flex-column gap-3 justify-content-center">
        {canBeEdited ? (
          <button
            className="btn btn-primary my-2 col-12 col-md-1 align-self-end"
            onClick={handleUpdateFlights}
            title="Edit Flights"
          >
            <i className="bi bi-pencil"></i>
          </button>
        ) : null}
        <div className="d-flex flex-column justify-content-around align-items-center flex-md-row gap-3">
          <div className="d-flex flex-column gap-3 justify-content-start align-items-center col-6">
            <h3 className=" text-decoration-underline">Flight:</h3>
            <h5 className="">
              {orderData.flight?.flightFrom}{" "}
              <i className="bi bi-arrow-right"></i> {orderData.flight?.flightTo}
            </h5>
            <p>
              <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
              {new Date(orderData.flight?.flightDate).toLocaleDateString() ||
                "N/A"}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Time:</span>{" "}
              {orderData.flight?.flightTime || "N/A"}
            </p>

            <p>
              <span style={{ fontWeight: "bold" }}>Flight Number:</span>{" "}
              {orderData.flight?.flightNumber || "N/A"}
            </p>
          </div>
          <div className="d-flex flex-column gap-3 justify-content-start align-items-center col-6">
            <h3 className="text-decoration-underline">Return Flight:</h3>
            {orderData.returnFlight ? (
              <>
                <h5 className="">
                  {orderData.returnFlight?.flightFrom}{" "}
                  <i className="bi bi-arrow-right"></i>{" "}
                  {orderData.returnFlight?.flightTo}
                </h5>
                <p>
                  <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                  {new Date(
                    orderData.returnFlight?.flightDate
                  ).toLocaleDateString() || "N/A"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Time:</span>{" "}
                  {orderData.returnFlight?.flightTime || "N/A"}
                </p>

                <p>
                  <span style={{ fontWeight: "bold" }}>Flight Number:</span>{" "}
                  {orderData.returnFlight?.flightNumber || "N/A"}
                </p>
              </>
            ) : (
              <p className="">No Return Flight...</p>
            )}
          </div>
        </div>{" "}
      </div>

      <hr />
      {/*//* Passengers: */}
      <div className=" d-flex flex-column gap-3 justify-content-center">
        <div className="d-flex justify-content-between align-items-center flex-md-row flex-wrap">
          <h3 className="">Passengers:</h3>
          {canBeEdited ? (
            <button
              className="btn btn-success my-2 col-12 col-md-1"
              onClick={() => handleEditPassenger(orderData.Passengers.length)}
              title="Add Passenger"
            >
              <i className="bi bi-plus-circle"></i>
            </button>
          ) : null}
        </div>

        <div className="d-flex flex-row flex-md-row flex-wrap justify-content-around gap-3 ">
          {orderData.Passengers?.map((passenger, index) => (
            <div key={index} className="border p-3 col-12 col-md-5">
              <p>
                <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                {passenger.firstName} {passenger.lastName}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Gender:</span>{" "}
                {passenger.gender}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Age:</span>{" "}
                {new Date().getFullYear() -
                  new Date(passenger.dateOfBirth).getFullYear()}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Nationality:</span>{" "}
                {passenger.nationality}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Passport Number:</span>{" "}
                {passenger.passportNumber}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>
                  Passport Expiry Date:
                </span>{" "}
                {passenger.passportDate
                  ? new Date(passenger.passportDate).toLocaleDateString()
                  : "N/A"}
              </p>
              {canBeEdited || user.isAdmin ? (
                <div className="d-flex gap-2 flex-column flex-md-row">
                  <button
                    className="btn btn-primary my-2 col-12 col-md-2"
                    onClick={() => handleEditPassenger(index)}
                    title="Edit Passenger"
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  {orderData.Passengers.length > 1 && (
                    <button
                      className="btn btn-danger my-2 col-12 col-md-2"
                      onClick={() => handleDeletePassenger(index)}
                      title="Delete Passenger"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <hr />
      {/*//* General Details: */}
      <div className=" d-flex flex-column gap-3 justify-content-center">
        {canBeEdited || user.isAdmin ? (
          <button
            className="btn btn-primary my-2 col-12 col-md-1 align-self-end"
            onClick={handleUpdateGeneral}
            title="Edit General Details"
          >
            <i className="bi bi-pencil"></i>
          </button>
        ) : null}
        {orderData?.orderStatus === "Pending Customer Approval" &&
        !user.isAgent ? (
          <button
            className="btn btn-primary my-2 col-12 col-md-2 align-self-end"
            onClick={handleApproveOrder}
            title="Edit Order"
          >
            Approve
          </button>
        ) : null}
        <p className=" text-nowrap">
          <span style={{ fontWeight: "bold" }}>Price:</span>{" "}
          {orderData.price ? orderData.price + " $" : "N/A"}
        </p>
        <p className=" text-nowrap">
          <span style={{ fontWeight: "bold" }}>Status:</span> '
          {orderData?.orderStatus}'
        </p>
        <p className="">
          <span style={{ fontWeight: "bold" }}>Notes: </span>
          {orderData?.notes ? orderData?.notes : "No Notes"}
        </p>
      </div>
      <div className="my-2"></div>
      <DeleteOrder
        setOrderDeleteStatus={setOrderDeleteStatus}
        orderData={orderDeleteStatus}
      />
      <ContactStatus setContactStatus={setContactStatus} Data={contactStatus} />
      <UpdateOrder
        setOrderUpdateStatus={setOrderUpdateStatus}
        orderUpdateStatus={orderUpdateStatus}
        orderData={orderData}
        selectedPassengerIndex={selectedPassengerIndex}
      />
      <DeletePassenger
        setPassengerDeleteStatus={setPassengerDeleteStatus}
        orderData={passengerDeleteStatus}
        selectedPassengerIndex={selectedPassengerIndex}
      />
      <ApproveOrder
        setApproveOrderStatus={setApprovalOrderStatus}
        orderData={approvalOrderStatus}
      />
    </div>
  );
}

export default OrderDetails;
