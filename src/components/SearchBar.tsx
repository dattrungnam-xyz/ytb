import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";

const SearchBar: FC = () => {

  const navigate = useNavigate();
  const [searchText,setSearchText] = useState("");
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearchText(e.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => 
  {
      e.preventDefault();

      navigate(`/search/${searchText}`);
      setSearchText("");
  }
  return (
    <div className="bg-white rounded-full overflow-hidden h-full pl-4 sm:mr-5 ">
      <form
        className=" py-2 px-2 max-sm:py-1 items-center flex gap-3 "
        action=""
        onSubmit={handleSubmit}
      >
        <input
          className="text-lg outline-none h-full max-sm:text-base bg-transparent"
          placeholder="Search..."
          type="text"
          value={searchText}
          onChange={handleChangeText}
        />
        <div className="items-center ">
          <SearchIcon className="text-[red] cursor-pointer items-center" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
