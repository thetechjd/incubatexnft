
import React from 'react'
import '../Styles/style-front.css';
import one from '../../assets/images/1-1.png';
import two from '../../assets/images/2-2.png';
import three from '../../assets/images/3-3.png';
import four from '../../assets/images/4-4.png';
import five from '../../assets/images/5-5.png';
import six from '../../assets/images/6-6.png';
import seven from '../../assets/images/7-7.png';
import eight from '../../assets/images/8-8.png';
import nine from '../../assets/images/9-9.png';
import ten from '../../assets/images/10-10.png';
import eleven from '../../assets/images/11-11.png';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

var imgArray=[
    {image:one,link:"https://finance.yahoo.com/news/incubatex-launches-1st-women-led-121000094.html"},
    {image:two,link:"https://www.wpgxfox28.com/story/46440606/incubatex-launches-the-1st-womenled-incubator-and-nft-launchpad-on-polygon"},
    {image:three,link:"https://www.benzinga.com/pressreleases/22/05/g27045145/incubatex-launches-the-1st-women-led-incubator-and-nft-launchpad-on-polygon"},
    {image:four,link:"https://www.benzinga.com/pressreleases/22/05/g27045145/incubatex-launches-the-1st-women-led-incubator-and-nft-launchpad-on-polygon"},
    {image:five,link:"https://www.digitaljournal.com/pr/incubatex-launches-the-1st-women-led-incubator-and-nft-launchpad-on-polygon"},
    {image:six,link:"https://www.snntv.com/story/46440606/incubatex-launches-the-1st-womenled-incubator-and-nft-launchpad-on-polygon"},
    {image:seven,link:"https://www.rfdtv.com/story/46440606/incubatex-launches-the-1st-womenled-incubator-and-nft-launchpad-on-polygon"},
    {image:eight,link:"https://www.marketwatch.com/press-release/incubatex-launches-the-1st-women-led-incubator-and-nft-launchpad-on-polygon-2022-05-06"},
    {image:nine,link:""},
    {image:ten,link:"https://www.streetinsider.com/Globe+Newswire/IncubateX+Launches+the+1st+Women-led+Incubator+and+NFT+Launchpad+on+Polygon/20031996.html"},
    {image:eleven,link:"https://rapid-meta.com/news/incubatex-launches-1st-women-led-incubator-and-nft-launchpad-on-polygon/"},
  ]
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
export default function AsSeenOn() {
    return (
        <div>
        {/* <!--story section--> */}
        <section class="story-section"  data-aos="fade-up">
            <div class="container">
                <h3>AS SEEN ON</h3>
                <Carousel
            centerMode={false}
            swipeable={true}
            draggable={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            transitionDuration={400}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-20-px"
          >
              {imgArray.map((item) => (
            <div><a href={item.link} target="_blank"><img src={item.image} alt="Italian Trulli" /></a></div>
            ))}
          </Carousel>
            </div>
        </section>
    </div>
    )
}

