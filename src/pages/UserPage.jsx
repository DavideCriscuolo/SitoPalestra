import Header from "../components/HeaderC";
import MainUser from "../components/MainUser";
import Footer from "../components/FooterC";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function UserPage() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  console.log(email);
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);


  return (
    <div>
      <MainUser></MainUser>
    </div>
  );
}
