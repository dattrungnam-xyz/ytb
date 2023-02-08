import React, { FC } from "react";

import { categories } from "../utils/constant";

type SidebarProps = {
  active: String;
  handleActive: (title: string) => void;
};

const Sidebar: FC<SidebarProps> = ({ active, handleActive }) => {
  return (
    <div className="w-[216px] h-[calc(100vh-61px)] max-sm:w-full max-sm:h-auto max-sm:flex overflow-y-auto   ">
      {categories.map((item) => {
        if (item.name === active) {
          return (
            <div
              key={item.name}
              className="flex gap-2 my-2 max-sm:gap-0 max-sm:my-1 max-sm:mx-2 group rounded-full bg-[red] hover:opacity-80 cursor-pointer transition"
              onClick={() => handleActive(item.name)}
            >
              <div className=" flex ml-2 p-2 max-sm:min-w max-sm:p-1 items-center justify-cente text-white">
                {item.icon}
              </div>
              <div className=" flex px-2  max-sm:flex-1 font-normal text-white  items-center justify-center mr-3">
                {item.name}
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={item.name}
              className="flex gap-2 my-2 max-sm:gap-0 max-sm:my-1 max-sm:mx-2 group rounded-full hover:bg-[red] hover:opacity-80 cursor-pointer transition"
              onClick={() => handleActive(item.name)}
            >
              <div className=" flex ml-2 p-2 max-sm:min-w max-sm:p-1 items-center justify-cente  text-[red] group-hover:text-white">
                {item.icon}
              </div>
              <div className=" flex px-2  max-sm:flex-1 font-normal text-white  items-center justify-center mr-3">
                {item.name}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Sidebar;
