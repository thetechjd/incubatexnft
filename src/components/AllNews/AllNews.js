import React, { useState, useEffect } from 'react'
import Navbar from '../NavBar/Navbar.js'
import '../Styles/style-front.css';
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import Stickysocial from '../StickySocials/Stickysocial.js';
import axios from 'axios';


export default function AllNews() {

    const [allnewsContent, setAllNewsContent] = useState([]);
    const [allnewsContenttemp, setAllNewsConetenttemp] = useState([]);


    useEffect(() => {
        getNewsfromMedium()
    }, [])

    const getNewsfromMedium = () => {
        axios.get("https://tranquil-garden-15529.herokuapp.com/https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@IncubateX_NFT")
            .then((result) => {
                setAllNewsContent(result.data.items);
                setAllNewsConetenttemp(result.data.items)
            }).catch((e) => {
                console.log("error in getNewsfromMedium", e)
            })
    }


    const getNewsDetails = async () => {

        const querySnapshot = await getDocs(collection(db, "News"));
        querySnapshot.forEach((doc) => {
            var data = doc.data()
            if (allnewsContent.filter(x => x.id === data.id).length === 0) {
                allnewsContent.push(data);
                allnewsContenttemp.push(data)
                setAllNewsConetenttemp([...allnewsContent, data])
            }
            else {
                console.log("duplicate collection")
            }
        });
    }

    const gotoDetailPage = (id) => {
        window.location.href = "/newsdetails?detail=" + id;
    }

    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>

            <section class="inner-pages" data-aos="fade-up">
                <div class="container">
                    <h3>News and Press</h3>
                    {allnewsContent.length > 0 ?
                        <div>
                            {allnewsContent.map((item) => (
                                <div class="news-info">

                                    <div class="news-block">
                                        <a href={item.link} target='_blank' ><img src={item.thumbnail} ></img></a>
                                        <h4 >{(item.title).slice(0, 20) + '...'}</h4>
                                        <span>{item.pubDate}</span>
                                        <p>{item.newsContent}</p>
                                    </div>

                                </div>
                            )).sort()}
                        </div>
                        : <h1>No News Added</h1>}
                </div>
            </section>

        </div>
    )
}
