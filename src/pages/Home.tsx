import React, { useState } from "react";

import { Header, Sidebar } from "../components";

const Home = () => {
  const [active, setActive] = useState<string>("New");
  const handleActive = (title: string) => {
    setActive(title);
  };
  return (
    <>
      <Header />
      <div className="flex max-sm:flex-col px-2 gap-2 bg-[#000000]">
        <Sidebar active={active} handleActive={handleActive} />
        <div className="bg-[yellow] flex-1 border">aa</div>
      </div>
    </>
  );
};

export default Home;
