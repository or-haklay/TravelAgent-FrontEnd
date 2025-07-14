import useAuth from "../context/auth.Context";
import { useNavigate } from "react-router";

function SideBar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container col-4">
      <div className="row bx-shadow mx-1 p-3 justify-content-center border border-2 rounded-3">
        <h4>Tools Bar</h4>
        <div className="px-2">
          <hr />
        </div>
        {!user?.isAgent && (
          <button
            className="btn border-secondary btn-sm mb-2"
            onClick={() => navigate("/makeNewOrder")}
          >
            Make New Order{" "}
            <i className="bi bi-plus-circle fw-bold fs-5 ms-2 d-none d-md-inline-block" />
          </button>
        )}
        <button
          className="btn border-secondary btn-sm mb-2"
          onClick={() => navigate("/coinsConverter")}
        >
          Coin Converter{" "}
          <i className="bi bi-currency-exchange fw-bold fs-5 ms-2 d-none d-md-inline-block" />
        </button>
        <button className="btn border-secondary btn-sm mb-2 ">Button 1</button>
        <button className="btn border-secondary btn-sm mb-2 ">Button 2</button>
      </div>
    </div>
  );
}

export default SideBar;
// Compare this snippet from travelAgent/src/components/navbar.jsx:
