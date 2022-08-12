import React from 'react'

import '../../components/Styles/style-front.css';
import launch from '../../assets/images/launch.png';
import mision_img from '../../assets/images/mision_img.png'
import text from '../../assets/images/text.png';
import banner from '../../assets/images/incubatex-video.mp4';
import genesis from '../../assets/images/genesis.mp4';
import meta from '../../assets/images/meta.mp4';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function Banner() {
  return (
    <div>
      <div class="sticky-social" data-aos="fade-left">
        <ul class="social">
          <li><a href="https://discord.gg/4ayCtuwRMp" target="blank" class="discord"><i class="fab fa-discord" aria-hidden="true"></i></a></li>
          <li><a href="https://www.instagram.com/incubatex_nft/" target="blank" class="instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
          <li><a href="https://www.youtube.com/channel/UCyL7eRZ9CQAG3tGnfG2HM2g" target="blank" class="youtube"><i class="fab fa-youtube" aria-hidden="true"></i></a></li>
          <li><a href="https://www.tiktok.com/@incubatex_nft" target="blank" class="tiktok"><i class="fab fa-tiktok" aria-hidden="true"></i></a></li>
          <li><a href="https://medium.com/@IncubateX_NFT" target="blank" class="medium"><i class="fab fa-medium" aria-hidden="true"></i></a></li>
        </ul>
      </div>
      <section class="banner-section">
        {/* <div class="container-100 banner-text" data-aos="zoom-in"> */}
        <div class="container-100 banner-text">

          <div class="per-50-left">
            <h1>INCUBATEX</h1>
            <h2>Revolutionizing <br />the world of</h2>
            <h3>NFT LAUNCHPADS</h3>
            <p>First women-led incubator on web3.<br />
              Paving the way for projects that make a positive impact IRL.</p>

            <div class="banner-buttons">

            </div>
          </div>
          <div class="per-50-right">
            <Carousel
              showArrows={true}
              swipeable={true}
              showIndicators={true}
              showThumbs={true}
              interval={10000}
              infiniteLoop={true}
              autoPlay={true}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div class="inner-shadow"></div><video width="auto" height="600px" className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src=${meta} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: `<div class="inner-shadow"></div><video width="auto" height="600px" className="app__backgroundVideo" autoplay loop muted playsinline>
      <source src=${genesis} type="video/mp4" />
      Your browser does not support the video tag.
</video>`,
                }}
              />

            </Carousel>
          </div>
        </div>
      </section>


    </div>
  )
}
