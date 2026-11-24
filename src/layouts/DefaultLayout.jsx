import { Outlet } from "react-router-dom";
import HeaderC from "./../components/HeaderC";
import FooterC from "./../components/FooterC";
import MobileActionBar from "./../components/MobileActionBar";

export default function Defaultlayout() {
  return (
    <>
      <HeaderC></HeaderC>
      <Outlet></Outlet>
      <FooterC></FooterC>
      <MobileActionBar />
    </>
  );
}
