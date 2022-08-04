import React, { useState, useEffect } from 'react'
import AdminHeader from './AdminHeader.js'
//import Sidebar from './Sidebar.js'
import { doc, setDoc, getDocs, collection, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
export default function Notifications() {
    const [notificationsData, setNotificationsData] = useState([]);
    const [notificationsDatatemp, setNotificationsDatatemp] = useState([]);
    const [projectsDatatemp2, setProjectsDatatemp2] = useState([]);


    useEffect(() => {
        getNotificationDetails()
    }, [])


    const getNotificationDetails = async () => {
        const querySnapshot = await getDocs(collection(db, "Notifications"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var data = doc.data()
            if (notificationsData.filter(x => x.id === data.id).length === 0) {
                notificationsData.push(data);
                notificationsDatatemp.push(data)

                setProjectsDatatemp2([...notificationsData, data])
            }
            else {
                console.log("duplicate collection")
            }
        });
        console.log("notificationsData", notificationsData)
    }

    return (
        <div>
            <div class="bg-color">
                <AdminHeader />
                <Sidebar />
                <section class="right-panel">
                    <div class="top-listing-add-edit">
                        <h2>Notifications</h2>
                    </div>

                    <div class="bottom-listing">
                        <ul class="notifications">
                            {notificationsData.map((item) => (
                                <li>Membership {item.membershipMinted} has been minted by {item.mintedBy}. </li>
                            ))}

                        </ul>
                    </div>

                </section>
            </div>
        </div>
    )
}
