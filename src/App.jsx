import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Register from "./pages/register";
import LogIn from "./pages/logIn";
import Logout from "./pages/logOut";
import OrdersUser from "./pages/ordersUser";
import OrdersAgent from "./pages/ordersAgent";
import EditUser from "./pages/editUser";
import OrderDetails from "./pages/orderDetails";
import MakeNewOrder from "./pages/makeNewOrder";
import OrdersManager from "./pages/ordersManager";
import CoinsConverter from "./miniapps/coinsConverter";

function App() {
  return (
    <>
      <header className="header bg-body-tertiary fixed-top shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <Navbar />
      </header>
      <main className="container mt-5 pt-5 mb-5 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/logOut" element={<Logout />} />
          <Route path="/ordersUser" element={<OrdersUser />} />
          <Route path="/ordersAgent" element={<OrdersAgent />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/makeNewOrder" element={<MakeNewOrder />} />
          <Route path="/ordersManager" element={<OrdersManager />} />
          <Route path="/coinsConverter" element={<CoinsConverter />} />
        </Routes>
      </main>
      <footer className="footer"></footer>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
