import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderC from "./../components/HeaderC";
import FooterC from "./../components/FooterC";
export default function Defaultlayout() {
  return (
    <>
      <HeaderC></HeaderC>
      <Outlet></Outlet>
      <FooterC></FooterC>
    </>
  );
}
