import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./pages/users/register";
import LogIn from "./pages/users/logIn";
import Logout from "./pages/users/logOut";
import MyOrders from "./pages/orders/myOrders";
import EditUser from "./pages/users/editUser";
import OrderDetails from "./pages/orders/orderDetails";
import MakeNewOrder from "./pages/orders/makeNewOrder";
import OrdersManager from "./pages/maneger/ordersManager";
import CoinsConverter from "./pages/miniapps/coinsConverter";
import Weather from "./pages/miniapps/weather";
import UserManager from "./pages/maneger/usersManager";
import UserDetails from "./pages/users/userDetails";
import Tutorial from "./pages/tutorial";

function App() {
  return (
    <>
      <header className="header bg-body-tertiary fixed-top shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <Navbar />
      </header>
      <main className="container mt-5 pt-5 mb-5 ">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tutorial" element={<Tutorial />} />
          {/* User related routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/logOut" element={<Logout />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/usersManager" element={<UserManager />} />
          <Route path="/users/:id" element={<UserDetails />} />
          {/* Nested routes for orders */}
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/makeNewOrder" element={<MakeNewOrder />} />
          <Route path="/ordersManager" element={<OrdersManager />} />
          {/* Mini apps */}
          <Route path="/coinsConverter" element={<CoinsConverter />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </main>
      <footer className="footer"></footer>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
