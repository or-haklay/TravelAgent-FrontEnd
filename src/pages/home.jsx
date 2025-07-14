import { useEffect, useState } from "react";
import Table from "../components/common/table";
import SideBar from "../components/sidebar";
import PageHeader from "../components/common/pageHeader";
import useAuth from "../context/auth.Context";
import { useNavigate } from "react-router";
import ordersService from "../services/ordersServices";

function Home() {
  const { user, userData } = useAuth();

  function dayTime() {
    let date_ob = new Date();
    date_ob = date_ob.getHours();
    let now;
    if (date_ob < 12) {
      now = "Good Morning ";
      return now;
    } else if (date_ob < 18) {
      now = "Good Afternoon ";
      return now;
    } else {
      now = "Good Evening ";
      return now;
    }
  }
  const navigate = useNavigate();
  const [tableData2, setTableData2] = useState([]);

  const [orders, setOrders] = useState([]);

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

        if (fetchedOrders && fetchedOrders.length > 0) {
          const headers = ["Serial Number", "Date", "Status", "Price"];
          const rows = fetchedOrders.map((order, index) => [
            index + 1,
            new Date(order.orderDate).toLocaleDateString(),
            order.orderStatus,
            order.price ? order.price + " $" : "-",
          ]);
          setTableData2({ headers, rows });
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container row align-items-start justify-content-center mt-5 mb-5">
      <div className="col-8 d-flex flex-column gap-3">
        <div className="row bx-shadow px-3 py-3 justify-content-center border border-2 rounded-3">
          <PageHeader title={dayTime() + (userData?.name.first || "") + "!"} />
        </div>
        <div className="row bx-shadow px-3 py-3 justify-content-center border border-2 rounded-3">
          {user?.isAdmin && (
            <Table headers={tableData2.headers} rows={tableData2.rows} />
          )}

          <div className="col-md-6"></div>
        </div>
      </div>
      {user && <SideBar />}
    </div>
  );
}

export default Home;
