import Logo from "../assets/logo.png";
import { NavLink } from "react-router";
import useAuth from "../context/auth.context";
import { useTheme } from "../context/theme.context";

function NavBar() {
  const { user, userData } = useAuth();
  const { toggleTheme, theme } = useTheme();

  async () => {
    await userData;
    await user;
  };

  return (
    <nav className="navbar-dark navbar navbar-expand-md bg-primary fixed-top">
      <div className="container-fluid container">
        <NavLink to="/" className="navbar-brand">
          <img
            src={Logo}
            alt="logo"
            className="d-inline-block align-text-top"
            style={{ width: "50px", height: "40px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link " aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link " aria-current="page">
                About
              </NavLink>
            </li>
            <li
              className="nav-item dropdown"
              style={{ display: user ? "block" : "none" }}
            >
              <NavLink
                to={user?.isAgent ? "/ordersAgent" : "/ordersUser"}
                className="nav-link "
                aria-current="page"
              >
                Orders
              </NavLink>
            </li>
            <li
              className="nav-item dropdown"
              style={{ display: user?.isAdmin ? "block" : "none" }}
            >
              <NavLink
                to="/ordersManager"
                className="nav-link "
                aria-current="page"
              >
                Orders Manager
              </NavLink>
            </li>
          </ul>

          <ul className="navbar-nav mr-5  pr-5 mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <button
                className="btn   btn-secondary rounded-circle ms-2"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  // Sun icon for dark mode
                  <i className="bi bi-sun-fill"></i>
                ) : (
                  // Moon icon for light mode
                  <i className="bi bi-moon-stars-fill"></i>
                )}
              </button>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white fw-bold d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center ">
                  <p className="text-white fw-bold mb-0 me-2">
                    {user
                      ? (userData?.name.first || "") +
                        " " +
                        (userData?.name.last || "")
                      : "Guest"}
                  </p>
                  {user ? (
                    user.isAgent ? (
                      <img
                        src={
                          "https://cdn-icons-png.freepik.com/512/12483/12483674.png?ga=GA1.1.1178628401.1743495898"
                        }
                        alt="business profile"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    ) : (
                      <img
                        src={
                          "https://cdn-icons-png.freepik.com/512/12483/12483574.png?ga=GA1.1.1178628401.1743495898"
                        }
                        alt="normal profile"
                        className="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />
                    )
                  ) : (
                    <i className="bi bi-person-circle fs-4"></i>
                  )}
                </div>
              </a>
              <ul className="dropdown-menu">
                <li
                  className="nav-item"
                  style={{ display: user ? "none" : "block" }}
                >
                  <NavLink
                    to="/logIn"
                    className="dropdown-item"
                    aria-current="page"
                  >
                    LogIn
                  </NavLink>
                </li>
                <li
                  className="nav-item"
                  style={{ display: user ? "block" : "none" }}
                >
                  <NavLink
                    to="/editUser"
                    className="dropdown-item "
                    aria-current="page"
                  >
                    Edit User
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li
                  className="nav-item"
                  style={{ display: user ? "none" : "block" }}
                >
                  <NavLink
                    to="/register"
                    className="dropdown-item "
                    aria-current="page"
                  >
                    Register
                  </NavLink>
                </li>

                <li
                  className="nav-item"
                  style={{ display: user ? "block" : "none" }}
                >
                  <NavLink
                    to="/logOut"
                    className="dropdown-item "
                    aria-current="page"
                  >
                    Log-Out
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
