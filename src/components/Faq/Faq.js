import React from 'react'
import '../Styles/style-front.css'
import lineimg from '../../assets/images/line_img.png';

export default function Faq() {
    return (
        <div>
        <section class="faq-section" id="faq" data-aos="fade-up">
	 <div class="container">
          <h3>FAQs</h3>
     	   <div class="acc-panel">
            <button class="accordion">What is an NFT?</button>
            <div class="panel">
            <p>An NFT (non-fungible token) is a unique item created on a blockchain that can be distinguished from other digital items by its one-of-a-kind and immutable characteristics. </p> 
            <p>Over the last few years, NFTs have become known as the next generation of things like collectibles, in-game items and art pieces.</p> 
            <p>Provable ownership and blockchain-backed security are a couple of the most important reasons that NFTs are so popular among collectors, players and art enthusiasts.</p>
            </div>
            
            <button class="accordion">What is IncubateX?</button>
            <div class="panel">
            <p>IncubateX is the very first women-led incubator project on web3, paving the way for projects that make a positive impact IRL.</p> 
            <p>We focus on supporting unique and big ideas. Ideas to make the world a 10x better place. Things like no-fuel-needed engines, 3D printed housing, indigenous language preservation, and more.</p>
            </div>
            
            <button class="accordion">What makes IncubateX different?</button>
            <div class="panel">
            <p>We wanted to build a platform that goes beyond validating & launching projects; we wanted to get behind innovators in web3 who are working on things that directly impact the communities in which they operate, for reasons that go beyond just celebrity endorsed art & unfounded hype. </p> 
            <p>It was also important to us that we make this platform inclusive & affordable for our tribe to join. We’ve seen other launchpads in the market & know they can cost tens of thousands of dollars to join, so we priced our membership to make it accessible.</p>
            </div>
            
            <button class="accordion">How can I participate?</button>
            <div class="panel">
            <p>To join the tribe, you need to hold one of the IncubateX NFTs.</p>
            </div>

            <button class="accordion">How does it work for IncubateX NFT holders?</button>
            <div class="panel">
            <p>We work closely with each team to present trustworthy, one of a kind projects that are exclusively available for IncubateX members first before they become available to the public.  </p>
            <p>In order to participate in these exclusive future projects, you need to hold an IncubateX Genesis Membership NFT in your wallet at the time of project release.</p>
            </div>

            <button class="accordion">How does it work for project creators?</button>
            <div class="panel">
            <p>Project creators submit their projects on our website for incubation. Our team of experts researches and validates each submitted project, their goals and teams through an extensive background check process. Once a project is vetted and selected for incubation, we will work closely with that project’s team and offer them the services they need. Once the project is ready, IncubateX will launch it on our platform and work with the team all the way until the mint is complete. </p>
            </div>

        

            <button class="accordion">Wen Mint?</button>
            <div class="panel">
            <p>July 2nd 2022</p>
            </div>
            <button class="accordion">How much are the IncubateX Membership NFTs?</button>
            <div class="panel">
            <p>The IncubateX Genesis Membership NFT is priced at 0.20 ETH, while the Meta Access Capsule is priced at 0.09 ETH </p>
            </div>


            <button class="accordion">Who’s on the team?</button>
            <div class="panel">
            <p>We’re a fully doxxed team of professionals from varying backgrounds that include M&A, web3, renewable energy, consulting,  marketing, and finance. Our team  includes successful entrepreneurs & executives who sit on the board of multiple organizations. </p>
            <p>We’ve done good in the world and in business, and now we’ve come together to use the skills we acquired to illuminate the path for others. </p>
            <p>Read more about <a href="/allteam"style={{color: "#fff"}}>our team here…</a></p>
            </div>

         
            
      </div>
	</div>
</section>
        </div>
    )
}
