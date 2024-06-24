import React from "react";
import NavBar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import ResetPassword from "../features/auth/components/ResetPassword";

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return (
    <div>
      <NavBar>
        <ResetPassword></ResetPassword>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}
