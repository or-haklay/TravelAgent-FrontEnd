import { useState, useEffect } from "react";

import userService from "../../services/userServices";
import ordersService from "../../services/ordersServices";
import useAuth from "../../context/auth.Context";
import { useNavigate } from "react-router";

import Table from "../../components/common/table";
import PageHeader from "../../components/common/pageHeader";
import LoadingSpinner from "../../components/common/loadingSpinners";
import ProgressBar from "../../components/common/progressBar";

function UserManager() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agentTable, setAgentTable] = useState({
    headers: [],
    rows: [],
  });
  const [userTable, setUserTable] = useState({
    headers: [],
    rows: [],
  });

  useEffect(() => {
    try {
      const fetchAll = async () => {
        const fetchedOrders = await ordersService.getAllOrders();
        const fetchedAgents = await userService.getAllAgents();
        const fetchedUsers = await userService.getAllUsers();
        setAllOrders(fetchedOrders);
        setAgents(fetchedAgents);
        if (fetchedAgents && fetchedAgents.length > 0) {
          const agentHeaders = ["Name", "Email", "Phone", "Status", "Orders"];
          const agentRows = fetchedAgents.map((agent) => {
            let assignedOrders = [];
            for (let i = 0; i < fetchedOrders.length; i++) {
              if (fetchedOrders[i].agent?.number === agent._id) {
                assignedOrders.push(fetchedOrders[i]);
              }
            }
            return [
              <span
                className="fw-bold"
                style={{ cursor: "pointer" }}
                title={`View ${user.name.first} ${user.name.last}'s Details`}
                onClick={() => navigate("/users/" + agent._id)}
              >
                {agent.name.first} {agent.name.last}
              </span>,
              agent.email,
              agent.phone || "-",
              <span
                className={"fw-bold " + (agent.isAdmin ? "text-success" : "")}
              >
                {agent.isAdmin ? "Admin" : "Agent"}
              </span>,
              <span
                className="fw-bold "
                style={{ cursor: "pointer" }}
                title="Orders Manager"
                onClick={() => navigate("/ordersManager")}
              >
                {assignedOrders.length > 0 ? assignedOrders.length : "-"}
              </span>,
            ];
          });
          setAgentTable({ headers: agentHeaders, rows: agentRows });
        }
        if (fetchedUsers && fetchedUsers.length > 0) {
          const userHeaders = ["Name", "Email", "Phone", "Orders"];
          const userRows = fetchedUsers.map((user) => {
            let assignedOrders = [];
            for (let i = 0; i < fetchedOrders.length; i++) {
              if (fetchedOrders[i].customer?.number === user._id) {
                assignedOrders.push(fetchedOrders[i]);
              }
            }

            return [
              <span
                className="fw-bold"
                style={{ cursor: "pointer" }}
                title={`View ${user.name.first} ${user.name.last}'s Details`}
                onClick={() => navigate("/users/" + user._id)}
              >
                {user.name.first} {user.name.last}
              </span>,
              user.email,
              user.phone || "-",

              <span
                className="fw-bold "
                style={{ cursor: "pointer" }}
                title="Orders Manager"
                onClick={() => navigate("/ordersManager")}
              >
                {assignedOrders.length > 0 ? assignedOrders.length : "-"}
              </span>,
            ];
          });
          setUserTable({ headers: userHeaders, rows: userRows });
        }
      };

      fetchAll();
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }, []);

  if (!userData) {
    return (
      <div className="container">
        <PageHeader
          title="Users Manager"
          description={"Loading Users Data..."}
        />
        <LoadingSpinner text={"Loading Users Data..."} />
      </div>
    );
  }

  return (
    <div className="container">
      <PageHeader title={"Users Manager"} description={"Manage All Users."} />
      <Table headers={userTable.headers} rows={userTable.rows} />
      <hr className="my-4 " />
      <PageHeader title={"Agents Manager"} description={"Manage All Agents."} />
      <Table headers={agentTable.headers} rows={agentTable.rows} />
      <hr className="my-4 " />
      <div className="d-flex justify-content-center flex-wrap gap-3 mt-4 mb-4 col-12">
        <h4 className="text-center">Agents workload</h4>
        {agents.map((agent) => {
          const agentOrders = allOrders.filter(
            (order) => order.agent?.number === agent._id
          ).length;
          return (
            <ProgressBar
              key={agent._id}
              className="mt-2"
              value={agentOrders}
              title={agent.name.first + " " + agent.name.last}
              progress={(agentOrders / allOrders.length) * 100}
              color={
                agentOrders <= allOrders.length / 2 ? "success" : "warning"
              }
              showValue={agentOrders > 0 ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UserManager;
