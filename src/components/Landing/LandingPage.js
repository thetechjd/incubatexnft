import React, { useEffect, useState } from 'react';
import { useEthers } from "@usedapp/core";
import Web3 from 'web3';
import Navbar from '../../components/NavBar/Navbar.js';
import Membership from '../Membership/Membership.js';
import Banner from '../Banner/Banner.js'
import Mission from '../Mission/Mission.js';
import OurStory from '../OurStory/OurStory.js';
import OurServices from '../OurServices/OurServices.js';
import RoadMap from '../RoadMap/RoadMap.js';
import WhitePaper from '../WhitePaper/WhitePaper.js';
import UpcomingProjects from '../UpcomingProjects/UpcomingProjects.js';
import CoreTeam from '../CoreTeam/CoreTeam.js';
import Advisors from '../Advisors/Advisors.js';
import Merchandise from '../Merchandise/Merchandise.js';
import News from '../News/News.js';
//import Faq from '../Faq/Faq.js';
//import Footer from '../Footer/Footer.js';
import ContactUs from '../ContactUs/ContactUs.js';
import AsSeenOn from '../AsSeenOn/AsSeenOn.js';
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <AsSeenOn />
      <OurStory />
      <Mission />
      <Membership />
      <OurServices />
      <RoadMap />
      <WhitePaper />
      <UpcomingProjects />
      <CoreTeam />
      <Advisors />
      {/* <Merchandise/> */}
      <News />
      {/*<Faq />*/}
      <ContactUs />
      {/*<Footer />*/}
    </div>
  );
};

export default LandingPage;