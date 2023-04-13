import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header, RenderVideos } from "../components";
import { fetchFromAPI } from "../utils/fetchApi";
import SkeletonVideo from "../components/SkeletonVideo";
type videoProps = {
  id: { kind: string; videoId: string };
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      default: {
        url: string;
        width?: Number;
        height?: Number;
      };
      medium: {
        url: string;
        width?: Number;
        height?: Number;
      };
      high: {
        url: string;
        width?: Number;
        height?: Number;
      };
    };
  };
};

type itemProps = {
  items: Array<videoProps>;
  kind: string;
  nextPageToken: string;
  pageInfor: {
    totalResults: number;
    resultsPerPage: number;
  };
  regionCode: string;
};
const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<Array<videoProps>>([]);
  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => {
        console.log(data);
        setItems(data.items);
      })
      .then(() => {
        setLoading(false);
      });
  }, [searchTerm]);
  return (
    <>
      <Header />
      <div className="bg-[#000] px-8 max-sm:px-2 w-full min-h-[calc(100vh-61px)]">
        {!loading && (
          <RenderVideos videos={items} active={searchTerm} scroll={false} />
        )}
        {loading && (
          
              <div className="flex gap-4 flex-wrap">
                {Array(50)
                  .fill(undefined)
                  .map((item) => {
                    return <SkeletonVideo />;
                  })}
              </div>
            
        )}
      </div>
    </>
  );
};

export default SearchFeed;
