import React, { FC } from "react";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar: FC = () => {
  return (
    <div className="bg-white rounded-full overflow-hidden h-full pl-4 sm:mr-5 ">
      <form
        className=" py-2 px-2 max-sm:py-1 items-center flex gap-3 "
        action=""
      >
        <input
          className="text-lg outline-none h-full max-sm:text-base bg-transparent"
          placeholder="Search..."
          type="text"
        />
        <div className="items-center ">
          <SearchIcon className="text-[red] cursor-pointer items-center" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
