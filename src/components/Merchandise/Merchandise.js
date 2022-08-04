import React from 'react'
import '../Styles/style-front.css';
import markettext from '../../assets/images/market-text.png';
import markimg from '../../assets/images/mark-img.png';



export default function Merchandise() {
    return (
        <div>
<section class="market-section">
	<div class="container">
			<div class="market-img">
			    <img src={markimg} />
			</div>
			<div class="market-text">
			  <h3>Merchandise</h3>
			  <img src={markettext} />
			  <h4>coming soon</h4>
                <input type="email" class="form-control" placeholder="Email address" />
                <button class="subscribe-btn" type="submit" ><span>Subscribe</span></button>
			</div>
	</div>
</section>
        </div>
    )
}
