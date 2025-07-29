import useAuth from "../context/auth.context";
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
          title="Coin Converter"
        >
          Coin Converter{" "}
          <i className="bi bi-currency-exchange fw-bold fs-5 ms-2 d-none d-md-inline-block" />
        </button>
        <button
          className="btn border-secondary btn-sm mb-2"
          onClick={() => navigate("/weather")}
          title="Weather Forecast"
        >
          Weather{" "}
          <i className="bi bi bi-cloud-sun fw-bold fs-5 ms-2 d-none d-md-inline-block" />
        </button>
        <a
          className="btn border-secondary btn-sm mb-2"
          href="https://www.world-airport-codes.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="World Airport Codes - website"
        >
          World Airport Codes{" "}
          <i className="bi bi bi-box-arrow-up-right fw-bold fs-5 ms-2 d-none d-md-inline-block" />
        </a>
        <a
          className="btn border-secondary btn-sm mb-2"
          href="https://www.flightaware.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="flightaware - website"
        >
          Flight Finder{" "}
          <i className="bi bi bi-box-arrow-up-right fw-bold fs-5 ms-2 d-none d-md-inline-block" />
        </a>
      </div>
    </div>
  );
}

export default SideBar;
// Compare this snippet from travelAgent/src/components/navbar.jsx:
