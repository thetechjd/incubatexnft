import React from 'react'
import '../Styles/style-front.css';
import marketing from '../../assets/images/marketing.png';
import technical from '../../assets/images/technical.png';
import art from '../../assets/images/art.png';
import video from '../../assets/images/video.png';
import advisory from '../../assets/images/advisory.png';
import legal from '../../assets/images/legal.png';
import strategic from '../../assets/images/strategic.png';
import tokenomics from '../../assets/images/tokenomics.png';
import access from '../../assets/images/access.png';


export default function OurServices() {
       return (
              <div>
                     {/* <!--services section--> */}
                     <div class="service-section"  data-aos="fade-up">
                            <div class="container">
                                   <h3>Incubator Services</h3>
                                   <span class="below-title">"Via our incubator program, innovative projects have access to the following services"</span>
                                   <div class="service-content">
                                          <div class="serv_1" data-aos="fade-right">
                                                 <img src={marketing} />
                                                 <p class="title">Marketing & Branding</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p>Our marketing team can help you push your campaigns through our social media channels and grow your social media presence.</p>
                                                 </div>
                                          </div>
                                          <div class="serv_1" data-aos="fade-up">
                                                 <img src={technical} />
                                                 <p class="title">Technical Development</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p>We have a full team of in-house software developers, and have also partnered with several development software companies.</p>
                                                 </div>
                                          </div>
                                          <div class="serv_1" data-aos="fade-left">
                                                 <img src={advisory} />
                                                 <p class="title">Advisory</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p>We help projects cohesively create their growth and marketing strategy, and help to advise projects on the best direction for their fund-raising and launch.</p>
                                                 </div>
                                          </div>
                                          <div class="serv_1" data-aos="fade-right">
                                                 <img src={legal} />
                                                 <p class="title">Legal</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p>Our legal partners can assist right from the inception with company formation to secure your idea by protecting your IP.</p>
                                                 </div>
                                          </div>
                                          <div class="serv_1" data-aos="fade-up">
                                                 <img src={strategic} />
                                                 <p class="title">Strategic Partnerships</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p>We will pull experts from our network of advisors to fill in gaps in your business model and strategy.</p>
                                                 </div>
                                          </div>
                                          <div class="serv_1" data-aos="fade-left">
                                                 <img src={tokenomics} />
                                                 <p class="title">Tokenomics</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p>We can design your tokenomics to ensure you raise the funds you need to support your ecosystem.</p>
                                                 </div>
                                          </div>
                                          {/* <div class="serv_1">
                                                 <img src={access} />
                                                 <p class="title">Access to influencer<br />network</p>
                                                 <div class="overlay"></div>
                                                 <div class="serv-para">
                                                        <p class="ser-last-text">Our network of influencers can help projects expand and grow!</p>
                                                 </div>
                                          </div> */}
                                   </div>
                            </div>
                     </div>
              </div>
       )
}
