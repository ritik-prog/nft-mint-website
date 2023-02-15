import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Data from "../../source/data.json";

function Header() {
  return (
    <header className="header">
      <img
        src={require(`../../assets/${Data.headerLogo}`)}
        alt="Logo"
        className="logo"
      />
      <nav className="navbar">
        {/* <a href="#">Connect Wallet</a> */}
        <ConnectWallet className="ConnectWallet" />
      </nav>
    </header>
  );
}

export default Header;
