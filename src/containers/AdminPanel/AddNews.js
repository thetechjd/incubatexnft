import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import AdminHeader from './AdminHeader.js';
//import Sidebar from './Sidebar.js';

export default function AddNews() {
  const [newsId, setNewsId] = useState(0);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsThumbnail, setNewsThumbnail] = useState('');
  const [newsThumbnailDisplay, setNewsThumbnailDisplay] = useState('');

  const [loading, setloading] = useState(false)
  const firebaseApp = getApp();
  const storage = getStorage(firebaseApp);


  useEffect(() => {
    getCurrentNewsId()

  }, [])

  const getCurrentNewsId = async () => {
    var getNewsId = Date.now();
    setNewsId(getNewsId);
  }

  const addNews = async () => {
    setloading(true)
    var newsThumbnailUrl;
    console.log("hey there")
    if (
      newsTitle.trim() == "" || newsTitle.trim() == null
      || newsContent.trim() == "" || newsContent.trim() == null
    ) {
      alert("All fields are required")
    } else {
      console.log("is it here")
      var newsImageUrl = newsThumbnail;
      console.log("newsImageUrl", newsImageUrl.name)
      if (newsThumbnail.name) {
        const storageRef = ref(storage, '/Images/NewsImages/' + newsImageUrl.name);
        await uploadBytes(storageRef, newsThumbnail);
        await getDownloadURL(storageRef).then((url) => { newsThumbnailUrl = url }).catch((e) => { console.log("err", e) });
        console.log("newsImageUrl ======== ", newsThumbnailUrl)
      }

      const washingtonRef = doc(db, "News", newsId.toString());
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      var currentDate = today.toDateString()
      console.log("currentDate", currentDate)
      var NewsDetails = {
        id: newsId,
        newsTitle: newsTitle.trim(),
        newsContent: newsContent.trim(),
        newsImage: newsThumbnailUrl,
        publishDate: currentDate
      }
      console.log("News details", NewsDetails)
      const aaa = await setDoc(washingtonRef, NewsDetails);
      setNewsTitle("");
      setNewsContent("");
      setNewsThumbnail("")
      setNewsThumbnailDisplay("")
      setloading(false)
      alert("News Added Sucessfully.");
    }
  }


  const onImageChoose = (event) => {
    console.log("event", event)

    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log("event.target.files[0]", event.target)

      console.log("img", img)
      setNewsThumbnail(img)
      setNewsThumbnailDisplay(URL.createObjectURL(event.target.files[0]))
      console.log(img)
      console.log("Img in state", newsThumbnail)
    }
  };


  return (
    <div class="bg-color">
      <AdminHeader />
      <Sidebar />
      <section class="right-panel">
        <div class="top-listing-add-edit">
          <h2>Add News</h2>
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
                <img src={newsThumbnailDisplay} className="news-image" />
              </td>
            </tr>
            <tr>
              <td class="first"></td>
              <td class="second buttons">
                <button onClick={() => { addNews() }} class="update-button">Add</button>
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
