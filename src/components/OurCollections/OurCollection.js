import React from 'react'
import img1 from '../../assets/images/bannerimage.png'
import img2 from '../../assets/images/bannerimage1.png'
import img3 from '../../assets/images/bannerimage2.png'





export default function OurCollection() {
    return (
        <div>
           {/* <!-- Second Section --> */}
<section class="second-section" id="collection" data-aos="fade-up">
        <h2 class="">OUR COLLECTION</h2>
        <div class="image-caro">
        	<div class="card-carousel">
              <div class="my-card"><img src={img1}/></div>
              <div class="my-card"><img src={img2}/></div>
              <div class="my-card"><img src={img3}/></div>
              <div class="my-card"><img src={img1}/></div>
              <div class="my-card"><img src={img2}/></div>
              <div class="my-card"><img src={img3}/></div>
              <div class="my-card"><img src={img1}/></div>
            </div>
            <div class="card-carousel1"><img src={img1}/></div>
        </div>
        <div class="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse mauris sapien, venenatis non volutpat nec, dapibus vel nisl. Curabitur pharetra augue sed nibh dignissim gravida. Ut ac magna id libero dignissim tristique ac ut lorem. </p>
        
        <p>Proin ultricies tempor mi in imperdiet. Morbi condimentum a leo ac malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
        
        <p>Proin sit amet felis sit amet ex elementum malesuada auctor et purus. Duis accumsan, sem et pharetra bibendum, erat est aliquam arcu, et gravida est dui eget nunc. Proin vulputate mattis erat, eget vulputate neque eleifend et.</p>
        </div>
</section>
        </div>
    )
}
