import useAuth from "../context/auth.Context";
import orderServices from "../services/ordersServices";
import PageHeader from "../components/common/pageHeader";
import LoadingSpinner from "../components/common/loadingSpinners";
import { useState, useEffect } from "react";
import OrderCard from "../components/orderCard";
import { useNavigate } from "react-router";

function OrdersUser() {
  const { user, userData } = useAuth();
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user._id) {
        try {
          const orders = await orderServices.getAllMyOrders(user._id);
          setUserOrders(orders);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  const handleMakeNewOrder = () => {
    navigate("/makeNewOrder");
  };

  if (!userData) {
    return (
      <div className="container">
        <button
          className="btn btn-primary my-2 col-12 col-md-1 align-self-start"
          onClick={handleMakeNewOrder}
          title="Add New"
        >
          <i className="bi bi-plus-circle"></i>
        </button>
        <PageHeader title="My Orders" description={"Loading Orders Data..."} />
        <LoadingSpinner text={"Loading Orders Data..."} />
      </div>
    );
  }

  return (
    <div className="container align-items-center">
      <div className="my-2 align-self-end">
        <button
          className="btn btn-primary my-2 col-12 col-md-1 align-self-start"
          onClick={handleMakeNewOrder}
          title="Add New"
        >
          <i className="bi bi-plus-circle"></i>
        </button>
      </div>
      <PageHeader
        title="My Orders"
        description={`Watch all your's orders and make new ones. You have: ${userOrders.length}`}
      />

      <div className="container row border s-start justify-content-center mt-2 mb-2 p-4 gap-3">
        {userOrders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}

        {userOrders.length === 0 && "You have no orders yet."}
      </div>
    </div>
  );
}

export default OrdersUser;
