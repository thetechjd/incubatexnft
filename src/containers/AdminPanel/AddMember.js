import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDocs, collection, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import { useLocation } from "react-router-dom";
import AdminHeader from './AdminHeader.js';
//import Sidebar from './Sidebar.js';

export default function AddMember() {
    const [addressToadd, setAddressToadd] = useState('');
    const [role, setRole] = useState('admin')
    const [loading, setloading] = useState(false)

    const firebaseApp = getApp();
    const storage = getStorage(firebaseApp);

    useEffect(() => {
        // editNews();
    }, [])


    const createMember = async () => {
        if (addressToadd == "" || addressToadd == undefined || addressToadd == null) {
            alert("Please add wallet address first")
        }
        else {

            console.log("address Toadd", addressToadd)
            var userAdd = addressToadd.toLowerCase()
            console.log("role", role)
            var id = Date.now();
            console.log("memberId id", id)
            const washingtonRef = doc(db, "Users", userAdd);

            const RegisterData = {
                memberId: id,
                address: userAdd,
                name: '',
                IsAdmin: role == "admin" ? true : false,
                balance: '',
                membership: '',
                allocations: ''
            };
            console.log("RegisterData", RegisterData)
            const aaa = await setDoc(washingtonRef, RegisterData);
            alert("Member Added Sucessfully")
            window.location.href = "/admin/members";
            setAddressToadd("");
        }

    }

    return (
        <div class="bg-color">
            <AdminHeader />
            <Sidebar />
            <section class="right-panel">
                <div class="top-listing-add-edit">
                    <h2>Add Admin</h2>
                </div>

                <div class="bottom-listing-add-edit">
                    <table class="first-table">
                        <tr>
                            <td class="first">Wallet Address</td>
                            <td class="second"><input value={addressToadd} onChange={(e) => { setAddressToadd(e.target.value) }} type="text" /></td>
                        </tr>
                        <tr>
                            <td class="first" style={{ verticalAlign: "top" }}>Role</td>
                            <td class="second"> <select value={role} onChange={(e) => { setRole(e.target.value) }}>
                                <option value="admin">Admin</option>
                            </select></td>
                        </tr>
                        <tr>
                            <td class="first"></td>
                            <td class="second buttons">
                                <button onClick={() => { createMember() }} class="update-button">Add</button>
                                {/* <button class="close-button">Close</button> */}
                            </td>
                        </tr>
                    </table>
                    <table class="second-table">
                        <tr>

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
