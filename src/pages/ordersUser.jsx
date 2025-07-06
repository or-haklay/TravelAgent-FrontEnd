import useAuth from "../context/auth.Context";
import orderServices from "../services/ordersServices";
import userService from "../services/userServices";

import { useState, useEffect } from "react";

function OrdersUser() {
  const { user, userData } = useAuth();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user._id) {
        try {
          const orders = await orderServices.getAllMyOrders(user._id);
          setUserOrders(orders);
          console.log(orders);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="container row align-items-start justify-content-center mt-5 mb-5 ">
      {userOrders.map((order) => (
        <div className="card" style={{ width: "18rem" }} key={order.orderId}>
          <div className="card-body">
            <p className=" card-title">flight</p>
            <h5 className="card-text">
              {order.flight.flightFrom} to {order.flight.flightTo}
            </h5>
            <p className="card-title">return flight</p>
            {order.returnFlight ? (
              <>
                <h5 className="card-text">
                  {order.returnFlight.flightFrom} to{" "}
                  {order.returnFlight.flightTo}
                </h5>
              </>
            ) : (
              <h5 className="card-text">no return flight</h5>
            )}
            <p className="card-text">Passengers: {order.Passengers.length}</p>
            <p className="card-text">Status: '{order.orderStatus}'</p>
            <p className="card-text">
              {order.notes ? "Notes: " + order.notes : ""}
            </p>

            <a href="#" className="btn btn-primary">
              Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersUser;
