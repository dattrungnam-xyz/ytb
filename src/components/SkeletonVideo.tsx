import Skeleton from "@mui/material/Skeleton/Skeleton";
import React from "react";

const SkeletonVideo = () => {
  return (
    <div className="w-[calc(50%-8px)] md:w-[calc(33%-12px)] lg:w-[calc(25%-16px)] max-w-[320px]">
      <Skeleton width="100%" height={230} sx={{ bgcolor: "grey.900" }} />
      <Skeleton width="100%" height={60} sx={{ bgcolor: "grey.900",mt: -5 }} />
      <Skeleton width="20%" height={30} sx={{ bgcolor: "grey.900" ,mt:-1}} />
    </div>
  );
};

export default SkeletonVideo;
