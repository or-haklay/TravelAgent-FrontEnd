function OrderCard({ order }) {
  console.log(order);
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <p className=" card-title">flight</p>
        <h5 className="card-text">
          {order.flight?.flightFrom} to {order.flight?.flightTo}
        </h5>
        <p className="card-title">return flight</p>
        {order.returnFlight ? (
          <>
            <h5 className="card-text">
              {order.returnFlight?.flightFrom} to {order.returnFlight?.flightTo}
            </h5>
          </>
        ) : (
          <h5 className="card-text">no return flight</h5>
        )}
        <p className="card-text">Passengers: {order.Passengers?.length}</p>
        <p className="card-text text-nowrap">Status: '{order?.orderStatus}'</p>
        <p className="card-text">
          {order?.notes ? "Notes: " + order?.notes : ""}
        </p>

        <a href="#" className="btn btn-primary">
          Details
        </a>
      </div>
    </div>
  );
}

export default OrderCard;
