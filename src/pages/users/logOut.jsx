import useAuth from "../../context/auth.context";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function LogOut() {
  const { logOut } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    logOut();
    toast.success("You have been logged out successfully."); //רץ פעמיים רק בגלל הסביבת פיתוח אם רוצים שירוץ פעם אחת מוחקים פשוט את StrictMode בקובץ MAIN
    navigate("/");
  }, []);

  return;
}
export default LogOut;
