import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import { useHistory } from "react-router-dom";
import AdminHeader from './AdminHeader.js';
//import Sidebar from './Sidebar.js';
import defaultimg from '../../assets/images/default-img.png';

export default function News() {
    let history = useHistory();
    const [newsData, setNewsData] = useState([]);
    const [newsDatatemp, setNewsDatatemp] = useState([]);

    useEffect(() => {
        getNewsDetails()
    }, [])

    const getNewsDetails = async () => {
        const querySnapshot = await getDocs(collection(db, "News"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            if (newsData.filter(x => x.id === data.id).length === 0) {
                newsData.push(data);
                newsDatatemp.push(data)
                setNewsDatatemp([...newsData, data])
            }
            else {
                console.log("duplicate collection")
            }
        });
    }
    const gotoEditPage = (id) => {
        // history.push({
        //     pathname: '/admin/editnews',
        //     search: '?edit=' + id
        // })
        window.location.href = "/admin/editnews?edit=" + id;
    }

    const deleteNews = async (id) => {
        await deleteDoc(doc(db, "News", id.toString()));
        alert("News Deleted Sucessfully")
        window.location.reload()
    }

    return (
        <div class="bg-color">
            <AdminHeader />
            <Sidebar />
            <section class="right-panel">
                <div class="top-listing">
                    <h2>News</h2>
                    <div class="add-button"><a href="/admin/addnews">Add News</a></div>
                </div>

                <div class="bottom-listing">
                    {newsData.length > 0 ?
                        <div>
                            <table>
                                <tr class="top-border">
                                    <td class="w-20">News Thumbnail</td>
                                    <td class="w-30">News title</td>
                                    <td class="w-30">Publish date</td>
                                    <td class="w-20">Actions</td>
                                </tr>
                                {newsData.map((item) => (
                                    <tr>
                                        <td><img src={item.newsImage} /></td>
                                        <td>{item.newsTitle}</td>
                                        <td>{item.publishDate}</td>
                                        <td><button onClick={() => { gotoEditPage(item.id) }} class="edit"><i class="fas fa-pencil-alt"></i> Edit</button>
                                            <button onClick={() => { deleteNews(item.id) }} class="delete"><i class="fas fa-trash-alt"></i> Delete</button></td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                        : null}
                </div>

            </section>
        </div>
    )
}
