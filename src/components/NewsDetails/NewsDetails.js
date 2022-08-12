import React, { useState, useEffect } from 'react'
import Stickysocial from '../StickySocials/Stickysocial.js'
import newsImg from '../../assets/images/news-img.png'
import Navbar from '../NavBar/Navbar.js'
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "./../../config/firebase-config";
import Footer from '../Footer/Footer.js';

export default function NewsDetails() {
    const search = useLocation().search;
    const queryParam = new URLSearchParams(search).get('detail');
    const [newsTite, setNewsTitle] = useState("");
    const [newsDate, setNewsDate] = useState("");
    const [newsImg, setNewsImg] = useState("");
    const [newsContent, setNewsContent] = useState("");



    useEffect(() => {
        getNewsContent()
    }, [])

    const getNewsContent = async () => {
        const docRef = doc(db, "News", queryParam.toLowerCase());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const NewsData = docSnap.data();
            console.log("NewsData Detail Page", NewsData)
            setNewsTitle(NewsData.newsTitle);
            setNewsDate(NewsData.publishDate);
            setNewsImg(NewsData.newsImage)
            setNewsContent(NewsData.newsContent)

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return (
        <div>
            <Navbar />
            <Stickysocial />
            <section class="inner-banner"></section>
            <section class="inner-pages" data-aos="fade-up">

                <div class="container news-detail-page">
                    <h3>{newsTite}</h3>
                    <h6>{newsDate}</h6>
                    <img src={newsImg} />

                    <p>{newsContent}</p>

                    {/* <p><b>Heading goes here..</b></p> */}

                    {/* <p>Maecenas lacinia facilisis nunc, sed congue magna vestibulum in. In vestibulum, nisi vel imperdiet tincidunt, diam lectus pulvinar leo, quis lobortis erat sem in libero. Donec pretium varius blandit. Nunc eget vestibulum magna. Proin eu pellentesque lorem, sit amet interdum erat. Sed tincidunt orci arcu, vitae feugiat dui lacinia ac. Integer sodales ligula sed odio ultrices, vel blandit leo condimentum. Vestibulum et ligula id ligula tincidunt gravida vitae nec turpis. Praesent libero magna, aliquet sit amet ipsum sed, feugiat tincidunt nulla. Nam egestas vitae libero non tempor. Maecenas condimentum semper nibh.</p> */}

                </div>
            </section>

            <Footer />
        </div>
    )
}
