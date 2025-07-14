import { useNavigate } from "react-router";

function OrderCard({ order }) {
  const navigate = useNavigate();
  const handleOrderDetails = () => {
    navigate(`/orders/${order?._id}`);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <p className=" card-title">flight</p>
        <h5 className="card-text">
          {order.flight?.flightFrom} <i className="bi bi-arrow-right"></i>{" "}
          {order.flight?.flightTo}
        </h5>
        <p className="card-title">return flight</p>
        {order.returnFlight ? (
          <>
            <h5 className="card-text">
              {order.returnFlight?.flightFrom}{" "}
              <i className="bi bi-arrow-right"></i>{" "}
              {order.returnFlight?.flightTo}
            </h5>
          </>
        ) : (
          <h5 className="card-text">no return flight</h5>
        )}
        <p className="card-text">Passengers: {order.Passengers?.length}</p>
        <p className="card-text text-nowrap">Status: '{order?.orderStatus}'</p>

        <button
          className="btn btn-primary"
          onClick={handleOrderDetails}
          title="Full Order Details"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default OrderCard;
