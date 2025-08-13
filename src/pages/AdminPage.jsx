import Header from "../components/HeaderC";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MainAdmin from "../components/MainAdmin";
import Footer from "../components/FooterC";
export default function AdminPage() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");
  console.log(email);
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return (
    <>
      <MainAdmin></MainAdmin>
    </>
  );
}
