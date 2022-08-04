import React from 'react'
import '../Styles/style-front.css';
import waqas from '../../assets/images/waqas.jpg';
import maliha from '../../assets/images/maliha.png';
import neel from '../../assets/images/neel.jpg';
import sara from '../../assets/images/sara.jpg'
import Namit from '../../assets/images/namit.jpg'


export default function Advisors() {
	return (
		<div>
			<section class="team-section" data-aos="fade-up">
				<div class="container">
					<h3>Oracles</h3>
					<div class="team_info" data-aos="fade-up">
						<img src={sara} />
						<h4>Sara</h4>
						<p>The Hero</p>
						<a href="#" target="_blank"><i class="fa fa-linkedin-square"></i></a>
					</div>
					<div class="team_info" data-aos="fade-left">
						<img src={neel} />
						<h4>Neel</h4>
						<p>Crypto Wizard</p>
						<a href="https://www.linkedin.com/in/neel-desai-5670397a" target="_blank"><i class="fa fa-linkedin-square"></i></a>
					</div>
					<div class="team_info team-info-small" data-aos="fade-up">
						<img src={Namit} />
						<h4>Namco</h4>
						<p></p>
						<a href="https://twitter.com/0xNamco" target="_blank"><i class="fab fa-twitter"></i></a>
					</div>

				</div>
			</section>
		</div>
	)
}
