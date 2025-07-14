import { useState, useEffect } from "react";

import ordersService from "../services/ordersServices";
import useAuth from "../context/auth.Context";
import { useNavigate } from "react-router";

import Table from "../components/common/table";
import PageHeader from "../components/common/pageHeader";
import LoadingSpinner from "../components/common/loadingSpinners";
import ProgressBar from "../components/common/progressBar";
import SetAgent from "../components/Modals/setAgent";

function OrdersManager() {
  const [orders, setOrders] = useState([]);
  const [agentSet, setAgentSet] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [waitForCustomerApprovalOrders, setWaitForCustomerApprovalOrders] =
    useState([]);

  const [tableData, setTableData] = useState({
    headers: [],
    rows: [],
  });
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let fetchedOrders = [];
        if (user?.isAdmin) {
          fetchedOrders = await ordersService.getAllOrders();
        } else if (user?.isAgent) {
          fetchedOrders = await ordersService.getAllMyOrders();
        }
        setOrders(fetchedOrders);
        setConfirmedOrders(
          fetchedOrders.filter((order) => order.orderStatus === "Confirmed")
        );
        setInProgressOrders(
          fetchedOrders.filter((order) => order.orderStatus === "In Progress")
        );
        setWaitForCustomerApprovalOrders(
          fetchedOrders.filter(
            (order) => order.orderStatus === "Pending Customer Approval"
          )
        );
        setInProgressOrders(
          fetchedOrders.filter((order) => order.orderStatus === "In Progress")
        );
        setPendingOrders(
          fetchedOrders.filter(
            (order) => order.orderStatus === "Wait For Agent"
          )
        );

        setCanceledOrders(
          fetchedOrders.filter((order) => order.orderStatus === "Cancelled")
        );

        if (fetchedOrders && fetchedOrders.length > 0) {
          const headers = ["Order Number", "Date", "Status", "Price", "Agent"];
          const rows = fetchedOrders.map((order, index) => [
            <span
              className="fw-bold"
              onClick={() => navigate("/orders/" + order._id)}
            >
              {order._id + 1}
            </span>,
            new Date(order.orderDate).toLocaleDateString(),
            <span
              className={
                order.orderStatus == "Cancelled"
                  ? "text-danger"
                  : order.orderStatus == "Confirmed"
                  ? "text-success fw-bold"
                  : null
              }
            >
              {order.orderStatus}
            </span>,
            order.price ? order.price + " $" : "-",
            !order.agent ? (
              <button
                className="btn btn-info py-0"
                title="View Details"
                onClick={() => handleSetAgent(order)}
              >
                <i className="bi bi-link-45deg fs-5"></i>
              </button>
            ) : (
              <span className="fw-bold" onClick={() => handleSetAgent(order)}>
                {order.agent.name}
              </span>
            ),
          ]);
          setTableData({ headers, rows });
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [agentSet || user.isAdmin]);

  const handleSetAgent = (order) => {
    setAgentSet(order);
  };

  return (
    <div className="container">
      <PageHeader title={"Orders Manager"} description={"Manage All Orders."} />
      <div className="d-flex">
        <ProgressBar
          title={"Pending Orders"}
          progress={(pendingOrders.length / orders.length) * 100}
          color="warning"
          showValue={pendingOrders.length > 0 ? true : false}
          value={pendingOrders.length}
          onClick={() => navigate("/ordersAgent")}
        />
        <ProgressBar
          title={"in Progress Orders"}
          color="info"
          progress={(inProgressOrders.length / orders.length) * 100}
          showValue={inProgressOrders.length > 0 ? true : false}
          value={inProgressOrders.length}
        />
        <ProgressBar
          title={"Wait For Customer"}
          progress={
            (waitForCustomerApprovalOrders.length / orders.length) * 100
          }
          color="primary"
          showValue={waitForCustomerApprovalOrders.length > 0 ? true : false}
          value={waitForCustomerApprovalOrders.length}
          onClick={() => navigate("/ordersAgent")}
        />
      </div>
      <div className="d-flex">
        <ProgressBar
          title={"Confirmed Orders"}
          color="success"
          progress={(confirmedOrders.length / orders.length) * 100}
          showValue={confirmedOrders.length > 0 ? true : false}
          value={confirmedOrders.length}
        />
        <ProgressBar
          title={"Canceled Orders"}
          color="danger"
          progress={(canceledOrders.length / orders.length) * 100}
          showValue={canceledOrders.length > 0 ? true : false}
          value={canceledOrders.length}
        />
      </div>

      <Table headers={tableData.headers} rows={tableData.rows} />
      <SetAgent orderData={agentSet} setAgentSet={setAgentSet} />
    </div>
  );
}

export default OrdersManager;
