import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import { useLocation } from "react-router-dom";
import AdminHeader from './AdminHeader.js';
//import Sidebar from './Sidebar.js';

export default function EditNews() {
  const [newsId, setNewsId] = useState(0);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsThumbnail, setNewsThumbnail] = useState('');
  const [newsThumbnailDisplay, setNewsThumbnailDisplay] = useState('');

  const search = useLocation().search;
  const [loading, setloading] = useState(false)

  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp);
  console.log("search", search)
  const queryParam = new URLSearchParams(search).get('edit');

  useEffect(() => {
    editNews();
  }, [])

  const editNews = async () => {
    //     event.preventDefault();
    //     var getItem = JSON.parse(window.localStorage.getItem('state')) ||
    //     console.log("getItem",JSON.parse(getItem))
    // var idToget=getItem;
    const docRef = doc(db, "News", queryParam.toString());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const NewsData = docSnap.data();
      console.log("Edit News Details", NewsData)
      setNewsTitle(NewsData.newsTitle);
      setNewsContent(NewsData.newsContent);
      setNewsThumbnail(NewsData.newsImage)
      setNewsThumbnailDisplay(NewsData.newsImage)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }


  const editNewsfunc = async () => {
    var newsThumbnailUrl;
    console.log("hey there")
    if (
      newsTitle.trim() == "" || newsTitle.trim() == null
      || newsContent.trim() == "" || newsContent.trim() == null
    ) {
      alert("All fields are required")
    } else {
      console.log("is it here")
      var newsThumbnailUrl = newsThumbnail;
      console.log("newsImageUrl", newsThumbnailUrl.name)
      if (newsThumbnail.name) {
        const storageRef = ref(storage, '/Images/NewsImages/' + newsThumbnailUrl.name);
        await uploadBytes(storageRef, newsThumbnail);
        await getDownloadURL(storageRef).then((url) => { newsThumbnailUrl = url }).catch((e) => { console.log("err", e) });
        console.log("newsImageUrl ======== ", newsThumbnailUrl)
      }
      const washingtonRef = doc(db, "News", queryParam.toString());
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      var currentDate = today.toDateString()
      console.log("currentDate", currentDate)
      var NewsDetails = {
        id: queryParam,
        newsTitle: newsTitle.trim(),
        newsContent: newsContent.trim(),
        newsImage: newsThumbnailUrl,
        publishDate: currentDate
      }
      console.log("News details", NewsDetails)


      //   // // Set the "capital" field of the city 'DC'
      const aaa = await updateDoc(washingtonRef, NewsDetails);
      setNewsTitle("");
      setNewsContent("");
      setNewsThumbnail("")
      alert("News Updated Sucessfully.");
      window.location.href("/admin/news")
    }
  }


  const onImageChoose = (event) => {
    console.log("event", event)
    setNewsThumbnail("")
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setNewsThumbnail(img)
      setNewsThumbnailDisplay(URL.createObjectURL(event.target.files[0]))
      console.log(img)
      console.log("Img in state", newsThumbnail)
    }
  };

  return (
    // <div>
    //     <h1>Edit News Page</h1>
    //     <div class="left-table">
    //         <table>
    //             <tr>
    //                 <td>NEWS TITLE</td>
    //                 <td><input  value={newsTitle} onChange={(e) => {setNewsTitle(e.target.value)}} type="text"  /></td>
    //             </tr>
    //             <tr>
    //                 <td>NEWS Content</td>
    //                 <td><textarea value={newsContent} onChange={(e) =>{setNewsContent(e.target.value)}} ></textarea></td>
    //             </tr>
    //         </table>
    //     </div>

    //     <div class="right-table">
    //         <table>
    //             <tr>
    //                 <td><input onChange={(e)=>{onImageChoose(e)}}  type="file" id="myFile" name="myImage" /></td>
    //                 <img src={newsThumbnail}/>
    //             </tr>
    //         </table>

    //         <div class="add-close-btn">
    //             <button onClick={()=>{editNewsfunc()}}>Edit</button>
    //         </div>

    //     </div>
    // </div>
    <div class="bg-color">
      <AdminHeader />
      <Sidebar />
      <section class="right-panel">
        <div class="top-listing-add-edit">
          <h2>Edit News</h2>
        </div>

        <div class="bottom-listing-add-edit">
          <table class="first-table">
            <tr>
              <td class="first">News Title</td>
              <td class="second"><input value={newsTitle} onChange={(e) => { setNewsTitle(e.target.value) }} type="text" /></td>
            </tr>
            <tr>
              <td class="first" style={{ verticalAlign: "top" }}>Content</td>
              <td class="second"><textarea value={newsContent} onChange={(e) => { setNewsContent(e.target.value) }}></textarea></td>
            </tr>
          </table>
          <table class="second-table">
            <tr>
              <td class="first" style={{ verticalAlign: "top" }}>Thumbnail Image</td>
              <td class="second"><input type="file" onChange={(e) => { onImageChoose(e) }} />
                <div class="file-overlay"><i class="fas fa-file-upload"></i>For best result upload dimensions- 1300X900</div>
                <img className="news-image" src={newsThumbnailDisplay} />
              </td>
            </tr>
            <tr>
              <td class="first"></td>
              <td class="second buttons">
                <button onClick={() => { editNewsfunc() }} class="update-button">Add</button>
                {/* <button class="close-button">Close</button> */}
              </td>
            </tr>
          </table>

        </div>
        {loading ? <div class="waiting-overlay"><div class="waiting" id="text">
          <div class="loading-img"></div>
          <div class="loader"></div>
        </div></div> : null}
      </section>
    </div>
  )
}
