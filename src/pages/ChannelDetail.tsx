import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { Header, Loading, RenderVideos } from "../components";
import { fetchFromAPI } from "../utils/fetchApi";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import SkeletonVideo from "../components/SkeletonVideo";

type dataType = {
  items: [
    {
      brandingSettings: {
        channel: {
          country: String;
          description: String;
          keywords: string;
          title: string;
          unsubscribedTrailer: string;
        };
        image: {
          bannerExternalUrl: string;
        };
      };
      contentDetails: {
        relatedPlaylists: {
          likes: string;
          uploads: string;
        };
      };
      id: string;
      kind: string;
      snippet: {
        country: string;
        customUrl: string;
        description: string;
        localized: {
          description: string;
          title: string;
        };
        publishedAt: string;
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
        title: string;
      };
      statistics: {
        hiddenSubscriberCount: boolean;
        subscriberCount: string;
        videoCount: string;
        viewCount: string;
      };
    }
  ];
  kind: String;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
};
type itemProps = {
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

const ChannelDetail = () => {
  const [dataChannel, setDataChannel] = useState<dataType>();
  const [item, setItem] = useState<Array<itemProps>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { id } = useParams();

  const getVideo = () => {
    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`).then(
      (data: any) => {
        setItem(data.items);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
      .then((data: any) => {
        setDataChannel(data);
        getVideo();
      })
      .then(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <section className="bg-black min-h-screen">
      <Header />
      <div className="h-[300px] bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>

      <div className="mt-[-93px] w-full h-[180px] flex items-center justify-center ">
        {loading ? (
          <>
            <div>
              <Skeleton
                variant="circular"
                width={180}
                sx={{ bgcolor: "grey.900" }}
                height={180}
              />
            </div>
          </>
        ) : (
          <img
            className="w-[180px] h-[180px] rounded-full border"
            src={dataChannel?.items[0].snippet.thumbnails.medium.url}
            alt="logo"
          />
        )}
      </div>
      <div className="flex flex-col mt-4 items-center justify-center">
        <div className="flex  items-center justify-center">
          {loading ? (
            <div className="flex  items-center justify-center flex-col">
              <Skeleton width={210} height={28} sx={{ bgcolor: "grey.900" }} />

              <Skeleton width={160} height={24} sx={{ bgcolor: "grey.900" }} />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="mr-1 text-[18px]  text-white">
                {dataChannel?.items[0].snippet.title}
              </p>
              <BsFillCheckCircleFill
                style={{ fontSize: "14px", color: "gray" }}
                color="gray"
              />
            </div>
          )}
        </div>

        <div>
          {!loading && (
            <p className="text-[15px] text-[gray]">
              {dataChannel?.items[0].statistics.subscriberCount &&
                parseInt(
                  dataChannel?.items[0].statistics.subscriberCount
                ).toLocaleString()}
              Subscribers
            </p>
          )}
        </div>
      </div>
      <div className=" mt-8 bg-black px-8 max-sm:px-2">
        {loading ? (
          <div className="w-full flex flex-wrap gap-4 items-center justify-center">
            {loading &&
              Array(50)
                .fill(undefined)
                .map((item) => {
                  return <SkeletonVideo />;
                })}
          </div>
        ) : (
          <RenderVideos videos={item} channelDetail={true} scroll={false} />
        )}
      </div>
    </section>
  );
};

export default ChannelDetail;
