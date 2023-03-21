import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {BsFillCheckCircleFill} from 'react-icons/bs'

import { Header } from "../components";
import { fetchFromAPI } from "../utils/fetchApi";

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
const ChannelDetail = () => {
  const [dataChannel, setDataChannel] = useState<dataType>();
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet,statistics&id=${id}`).then(
      (data: any) => {
        setDataChannel(data);
        console.log(dataChannel);
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <section>
      <Header />
      <div className="h-[300px] bg-gradient-to-r from-violet-500 to-fuchsia-500" >
     
      </div>
      <div className="mt-[-93px] w-full h-[180px] flex items-center justify-center">
        <img className="w-[180px] h-[180px] rounded-full" src={dataChannel?.items[0].snippet.thumbnails.medium.url} alt="logo" />
      </div>
      <div className="flex flex-col mt-4 items-center justify-center">
        <div className="flex items-center justify-center">
          <p className="mr-1 text-[18px]">{dataChannel?.items[0].snippet.title}</p>
          <BsFillCheckCircleFill style={{ fontSize: '14px', color: 'gray'}} color="gray"/>
        </div>
        <div>
          <p className="text-[15px]">{dataChannel?.items[0].statistics.subscriberCount} Subscribers</p>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
};

export default ChannelDetail;
