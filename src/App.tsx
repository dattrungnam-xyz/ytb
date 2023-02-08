import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, ChannelDetail, VideoDetail, SearchFeed } from "./pages";

function App() {
  return (
    <>
      {/* <Home/> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
