import React, { useState, useEffect } from "react";

import { Header, RenderVideos, Sidebar } from "../components";
import { fetchFromAPI } from "../utils/fetchApi";
const Home = () => {
  const [active, setActive] = useState<string>("New");
  const [item, setItem] = useState<Array<any>>([]);
  const handleActive = (title: string) => {
    setActive(title);
  };
  useEffect(() => {
    const data = fetchFromAPI(`search?part=snippet&q=${active}`).then(() => {
      console.log(data);
    });
  }, [active]);
  return (
    <>
      <Header />
      <div className="flex max-sm:flex-col px-2 gap-2 bg-[#000000]">
        <Sidebar active={active} handleActive={handleActive} />
        <div className="bg-[black] flex-1 border">
          <div className="flex ">
            <p>{active} </p>
            <p>videos</p>
          </div>
          <RenderVideos videos={item} />
        </div>
      </div>
    </>
  );
};

export default Home;
