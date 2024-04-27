import * as React from "react";
import oaLogo from "./images/oceanacademy Logo.svg";
import "./navbarStyle.css";
function Navbar() {
  return (
    <div className="navbar_container">
      {/* <img src={oaLogo} /> */}
      <div className="navbar_title">MCQ'S Admin</div>
    </div>
  );
}
export default Navbar;
