import React from 'react'
import '../Styles/style-inner.css';
import Fatima from '../../assets/images/fatima.png'
import Massy from '../../assets/images/massy.jpg'
import Ali from '../../assets/images/ali.png'
import Bilal from '../../assets/images/bilal.jpg'
import Sara from '../../assets/images/sara.jpg'
import waqas from '../../assets/images/waqas.jpg'
import Neel from '../../assets/images/neel.jpg';
import George from '../../assets/images/george.jpg'
import Namit from '../../assets/images/namit.jpg'
import Navbar from '../NavBar/Navbar.js';
////import Footer from '../Footer/Footer.js';
import Stickysocial from '../StickySocials/Stickysocial.js';
export default function AllTeam() {
    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>
            <section class="inner-pages">
                <div class="container core-team" data-aos="fade-up">
                    <h3>Team</h3>
                    <div class="full-team-info" data-aos="fade-right">
                        <div class="left-side"><img src={Massy} /></div>
                        <div class="right-side">
                            <h4>Massy Almubidin</h4>
                            <span>The Sage</span>
                            <a href="https://www.linkedin.com/in/massy-almubidin-2b18031aa/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                            <a href="https://twitter.com/massymace" target="_blank"><i class="fab fa-twitter"></i></a>
                            <p>Massy is a seasoned entrepreneur and an avid crypto investor who has a proven track record of building successful businesses. With her strategic mind and intuition, Massy conquers every obstacle. Her passion is taking ideas from conception to reality. </p>
                            <p>Massy credits her success to her mother, an incredible role model. An educator and mentor, Massy's mother dedicated much of her career to teaching underserved students in low-income public schools in the Middle East. Encouraged by her mother to always have faith and never give up on her dreams, Massy came to the United States at age 19 and earned her BBA in finance from the University of Houston before launching into the world of business & entrepreneurship.</p>
                            <p>When she’s not working, Massy enjoys morning walks on the beach with her beloved dogs Milo and Lamelle, and her jet-setting lifestyle. </p>
                        </div>

                    </div>
                    <div class="full-team-info" data-aos="fade-up">
                        <div class="left-side"><img src={Bilal} /></div>
                        <div class="right-side">
                            <h4>Bilal Pirzada</h4>
                            <span>The Everyman</span>
                            <a href="https://www.linkedin.com/in/mohammad-pirzada-49a22291" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                            <a href="https://twitter.com/bilalpirzada3" target="_blank"><i class="fab fa-twitter"></i></a>
                            <p>A successful developer with an eye towards enabling positive change throughout the world, Bilal Pirzada serves as Head of Development for IncubateX. He brings over 13 years of IT experience to the role, having worked for Walgreens, Discover Card, Aetna, AIG and BCBSLA.  Among his accomplishments are successful deployment of iOs and Android apps for BCBSLA and completed customer facing projects for AIG. Bilal was also named Employee of the year at AIG and earned several Employee of the Month awards at BCBSLA.</p>
                            <p>Bilal holds a bachelor’s degree in Information technology. He credits his children with inspiring him to work hard to benefit the lives of others every single day.  In his free time, Bilal enjoys watching movies, tv and playing video games.
                            </p>
                        </div>
                    </div>

                    <div class="full-team-info" data-aos="fade-left">
                        <div class="left-side"><img src={waqas} /></div>
                        <div class="right-side">
                            <h4>Waqas Hassan</h4>
                            <span>The Magician</span>
                            <a href="https://www.linkedin.com/in/waqas-hassan-180732104/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                            {/* <a href="https://twitter.com/WaqasHasX" target="_blank"><i class="fab fa-twitter"></i></a> */}
                            <p>Waqas is a force of nature. A visionary entrepreneur, with a sharp mind and a gentle heart, Waqas has always used his business acumen for the betterment of others. </p>

                            <p>An explorer by nature, Waqas thrives in uncharted territory. He was an early crypto investor and has spent over a decade in all facets of the renewable energy sector. </p>

                            <p>Waqas comes from a long line of scholars, including his Great Great Grandfather, Hazrat Sultan Bahu, a mystic poet who wrote over 100 literary works to benefit the wellbeing of humanity during the Mughal period. </p>

                            <p>Today, Waqas and his family keep their ancestor’s mission alive through various trusts and foundations dedicated to helping people overcome natural disasters, economic crises and roadblocks to education. </p>

                            <p>In his free time, Waqas enjoys watching movies, traveling and hanging out with his two dogs. </p>
                        </div>
                    </div>
                    <div class="full-team-info" data-aos="fade-right">
                        <div class="left-side"><img src={Neel} /></div>
                        <div class="right-side">
                            <h4>Neel Desai</h4>
                            <span>Crypto Wizard</span>
                            <a href="https://www.linkedin.com/in/neel-desai-5670397a" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                            <p>Neel is a successful entrepreneur with a background in cryptocurrencies, hospitality, F&B and event management. Neel currently holds the position of Chief Executive Officer at Sunrgy Solar Distribution. In his previous roles he has served as Regional Director of Sales in the hospitality industry and was the head of business development and expansion efforts into emerging markets.</p>

                            <p>A futurist by nature Neel joined the crypto culture in mid-2015 by purchasing and mining alt-coins. He continues to consult on cryptocurrency mining facilities, technical analysis as well as sustain a significant portfolio of digital assists.</p>

                        </div>
                    </div>

                    <div class="full-team-info" data-aos="fade-up">
                        <div class="left-side"><img src={George} /></div>
                        <div class="right-side">
                            <h4>George Girgis</h4>
                            <span>The Artist</span>
                            <a href="https://www.linkedin.com/in/george-mikhael-7573b0143/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                            <a href="https://twitter.com/Georgemikhaell" target="_blank"><i class="fab fa-twitter"></i></a>
                            <p>George is a technophile with a passion for art & visual aesthetics. Born in Cairo, George had studied Computer Science in Germany and worked with multiple companies throughout Europe, the UK and the USA.</p>
                            <p>As a web3 enthusiast, George views the NFT space as a perfect balance between his creative soul, analytical mind & technical skills. He aspires to create something of value in this world for everyone to enjoy.</p>
                            <p>During his free time, George likes to travel and explore new countries & meeting interesting people. He’s also an avid gamer & classical movies buff! </p>
                        </div>
                    </div>
                    <div class="full-team-info" data-aos="fade-left">
                        <div class="left-side"><img src={Namit} /></div>
                        <div class="right-side">
                            <h4>Namco</h4>
                            <span></span>
                            <a href="https://twitter.com/0xNamco" target="_blank"><i class="fab fa-twitter"></i></a>
                            <p>Namco is an established brand ambassador and manufacturing specialist. His career involves over 15+ years as a C-Suite executive bringing products to market in the industries of plastics, robotics, and cannabis. His experience includes working with large regional retailers, setting up automated manufacturing processes, and over 5 cultivation and distribution facilities across the United States.</p>
                            <p>From working with large regional and national distribution chains, Namit has considerable expertise when it comes to predicting trends, and identifying the consumers' value. More recently, since 2019, he has joined the Crypto Industry as a currency trader and NFT collector.</p>
                        </div>
                    </div>
                    <div class="full-team-info" data-aos="fade-right">
                        <div class="left-side"><img src={Sara} /></div>
                        <div class="right-side">
                            <h4>Sara</h4>
                            <span>The Hero</span>
                            <a href="" target="_blank"><i class="fa fa-linkedin-square"></i></a>
                            <a href="" target="_blank"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            </section>
            {/*<Footer />*/}
        </div>
    )
}
