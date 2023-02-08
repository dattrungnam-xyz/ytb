import React from "react";
import { Link } from "react-router-dom";

import { SearchBar } from "../components";
import { logo } from "../utils/constant";

const Header = () => {
  return (
    <div
      className="flex flex-row items-center p-2 sticky bg-[#000] top-[0]  justify-between
    "
    >
      <Link className="flex items-center" to={"/"}>
        <img className="h-[45px]" src={logo} alt="logo" />
      </Link>

      <SearchBar />
    </div>
  );
};

export default Header;
