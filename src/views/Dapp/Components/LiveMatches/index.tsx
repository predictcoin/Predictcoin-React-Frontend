import './live_matches.styles.scss'
import { FC } from 'react'
import LiveMatch from './LiveMatch'
import liveMatchData from '../../data/liveMatchesData'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Autoplay, Pagination, FreeMode } from "swiper";
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import "swiper/modules/free-mode/free-mode.min.css";

const LiveMatches: FC = () => {

  return (
    <div className="live__matches__container" >
      <Swiper
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
        {liveMatchData.map(data => <SwiperSlide key={data.id}><LiveMatch {...data} /></SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default LiveMatches