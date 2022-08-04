import React, { useState, useEffect } from 'react'
// import '../Styles/Responsive.css'
import '../Styles/style-front.css';
import defaultimg from '../../assets/images/default-img.png';
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import axios from 'axios';
export default function News() {

  const [newsContent, setNewsContent] = useState([]);
  const [newsContenttemp, setNewsConetenttemp] = useState([]);

  useEffect(() => {
    // getNewsDetails()
    getNewsfromMedium()
  }, [])


  const getNewsfromMedium=()=>{
    axios.get("https://tranquil-garden-15529.herokuapp.com/https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@IncubateX_NFT")
    .then((result)=>{
      console.log("result is",result.data.items)
      setNewsContent(result.data.items);
      setNewsConetenttemp(result.data.items)
    }).catch((e)=>{
      console.log("error in getNewsfromMedium",e)
    })
  }
  const getNewsDetails = async () => {

    const querySnapshot = await getDocs(collection(db, "News"));
    console.log("querySnapshot",querySnapshot)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      var data = doc.data()
      console.log("data",data)
      if (newsContent.filter(x => x.id === data.id).length === 0) {
        newsContent.push(data);
        newsContenttemp.push(data)
        setNewsConetenttemp([...newsContent, data])
        console.log("newsContent", newsContent)
      }
      else {
        console.log("duplicate collection")
      }
    });
  }
  const gotoDetailPage=(id)=>{
    window.location.href = "/newsdetails?detail="+id;
}
  return (
    <div>
      <section class="news-section" data-aos="fade-up">
        <div class="container">
          <h3>News and Press</h3>
          {newsContent.length > 0 ?
          <div>
               {newsContent.slice(0,6).map((item) => (
          <div class="news-info">
       
            <div class="news-block">
            <a href={item.link} target='_blank' ><img  src={item.thumbnail} ></img></a>  
            <h4 >{(item.title).slice(0,20)+'...'}</h4>
              <span>{item.pubDate}</span>
              <p>{item.newsContent}</p>
            </div>
           
          </div>
             ))}
          </div>
          : <h1>No News Added</h1>}
        </div>
      </section>
    </div>
  )
}
