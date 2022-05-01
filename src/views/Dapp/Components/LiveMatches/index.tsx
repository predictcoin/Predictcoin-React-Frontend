import "./live_matches.styles.scss";
import { FC, useEffect } from "react";
import LiveMatch from "./LiveMatch";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Autoplay, Pagination, FreeMode } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { skeletonBaseColor, skeletonHighlightColor } from "../../constants/colors";

const LiveMatches: FC = () => {
    const { isLoadingLiveMatches, liveMatches, getLiveMatches } =
    useSportPredictionViewModel();
    useEffect(() => {
        getLiveMatches();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const LiveMatchesSkeleton = () => {
      return(
        <SkeletonTheme
            enableAnimation={true}
            baseColor={skeletonBaseColor}
            highlightColor={skeletonHighlightColor}
        >
            <div className="live_match_skeleton">
                <Skeleton width="100%" height= "100%"/>
            </div>
        </SkeletonTheme>
      );
    }

    return (
        <div className="live__matches__container">
            {isLoadingLiveMatches &&  <Swiper
              slidesPerView={"auto"}
              loop={true}
              freeMode={true}
              pagination={{
                clickable: true,
                renderBullet: function (index: number, className: string) {
                  return `<span class = "${className} custom_pagination"></span>`;
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, FreeMode]}
              className="mySwiper"
            >
            {Array(6).fill(undefined).map((val:undefined, index:number) => <SwiperSlide key={index}><LiveMatchesSkeleton /></SwiperSlide>)}
            
          </Swiper>}

          {!isLoadingLiveMatches && liveMatches.length !==0 &&  <Swiper
              slidesPerView={"auto"}
              // loop={true}
              freeMode={true}
              pagination={{
                clickable: true,
                renderBullet: function (index: number, className: string) {
                  return `<span class = "${className} custom_pagination"></span>`;
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, FreeMode]}
              className="mySwiper"
            >

            {liveMatches.map(data => <SwiperSlide key={data.id}><LiveMatch {...data} /></SwiperSlide>)}
            
          </Swiper>}

            {!isLoadingLiveMatches && liveMatches.length === 0 && (
                <p className="no__live__matches">
                    No matches currently ongoing
                </p>
            )}
      </div>
    );
};

export default LiveMatches;
