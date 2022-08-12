import React from 'react'
import '../Styles/style-front.css';
import Fatima from '../../assets/images/fatima.png'
import Massy from '../../assets/images/massy.jpg'
import Ali from '../../assets/images/ali.png'
import sara from '../../assets/images/sara.jpg';
import Bilal from '../../assets/images/bilal.jpg'
import George from '../../assets/images/george.jpg'
import Namit from '../../assets/images/namit.jpg'
import waqas from '../../assets/images/waqas.jpg';
import kevan from '../../assets/images/kevan.jpeg';
import daniel from '../../assets/images/daniel.jpeg';



export default function CoreTeam() {
	return (
		<div>
			{/* <!--team section--> */}
			<section class="team-section" id="team" data-aos="fade-up">
				<div class="container">
					<h3>TRIBE LEADERS</h3>
					<div class="team_info" data-aos="fade-right">
						<img src={Massy} />
						<h4>Massy</h4>
						<p>The Sage</p>
						<a href="https://www.linkedin.com/in/massy-almubidin-2b18031aa/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
						<a href="https://twitter.com/massymace" target="_blank"><i class="fab fa-twitter"></i></a>
					</div>

					<div class="team_info" data-aos="fade-right">
						<img src={waqas} />
						<h4>Waqas</h4>
						<p>The Magician</p>
						<a href="https://www.linkedin.com/in/waqas-hassan-180732104/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
						{/* <a href="https://twitter.com/WaqasHasX" target="_blank"><i class="fab fa-twitter"></i></a> */}
					</div>

					<div class="team_info" data-aos="fade-up">
						<img src={Bilal} />
						<h4>Bilal</h4>
						<p>The Everyman</p>
						<a href="https://www.linkedin.com/in/mohammad-pirzada-49a22291" target="_blank"><i class="fa fa-linkedin-square"></i></a>
						<a href="https://twitter.com/bilalpirzada3" target="_blank"><i class="fab fa-twitter"></i></a>
					</div>

					<div class="team_info " data-aos="fade-left">
						<img src={George} />
						<h4>George</h4>
						<p>The Artist</p>
						<a href="https://www.linkedin.com/in/george-mikhael-7573b0143/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
						<a href="https://twitter.com/Georgemikhaell" target="_blank"><i class="fab fa-twitter"></i></a>
					</div>
					<div class="team_info" data-aos="fade-up">
						<img src={sara} />
						<h4>Sara</h4>
						<p>The Hero</p>
						<a href="#" target="_blank"><i class="fa fa-linkedin-square"></i></a>
					</div>
					<div class="team_info" data-aos="fade-up">
						<img src={kevan} />
						<h4>Kevan</h4>
						<p>The Tech Ninja</p>
						<a href="https://www.linkedin.com/in/kevan-williams-317a80a1/" target="_blank"><i class="fa fa-linkedin-square"></i></a>
					</div>
					<div class="team_info" data-aos="fade-up">
						<img src={daniel} />
						<h4>Daniel Wussu</h4>
						<p>The StoryTeller</p>
						<a href="#" target="_blank"><i class="fa fa-linkedin-square"></i></a>
					</div>
				</div>
			</section>
			<section class="team-section" id="team" data-aos="fade-up">
				<div class="container">

					<button onClick={() => { window.location.href = "/allteam" }} class="submit-project-btn" type="submit" ><span>More about the team</span></button>
				</div>
			</section>
		</div>
	)
}
