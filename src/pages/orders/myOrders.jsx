import useAuth from "../../context/auth.context";
import orderServices from "../../services/ordersServices";
import PageHeader from "../../components/common/pageHeader";
import LoadingSpinner from "../../components/common/loadingSpinners";
import { useState, useEffect } from "react";
import OrderCard from "../../components/orderCard";

function MyOrders() {
  const { user, userData } = useAuth();
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user._id) {
        try {
          const orders = await orderServices.getAllMyOrders();
          setUserOrders(orders);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (!userData) {
    return (
      <div className="container">
        <PageHeader title="My Orders" description={"Loading Orders Data..."} />
        <LoadingSpinner text={"Loading Orders Data..."} />
      </div>
    );
  }
  if (!userOrders) {
    return (
      <>
        <PageHeader
          title="My Orders"
          description={`Manage and edit all client orders under your responsibility. You have: ${userOrders.length}`}
        />
        ; <LoadingSpinner text={"Loading Details..."} />;
      </>
    );
  }

  return (
    <div className="container">
      <PageHeader
        title="My Orders"
        description={`Manage and edit all client orders under your responsibility. You have: ${userOrders.length}`}
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

export default MyOrders;
