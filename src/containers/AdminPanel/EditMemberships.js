import React, { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc,getDocs ,collection,updateDoc,getDoc} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { getApp } from "firebase/app";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function EditMemberships() {
    const [tierName, setTierName] = useState("");
    const [walletLimit, setWalletLimit] = useState("")
    const [memberVotes, setMemberVotes] = useState("")
    const [content, setContent] = useState("");
    const search = useLocation().search;
    const queryParam = new URLSearchParams(search).get('edit');
    let history = useHistory();


    useEffect(() => {
        getMembershipData()
    }, [])

    const getMembershipData = async () => {
        const docRef = doc(db, "Memberships",queryParam.toString());
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const NewsData = docSnap.data();
            console.log("Edit News Details", NewsData)
            setTierName(NewsData.tier);
            setWalletLimit(NewsData.walletLimit);
            setMemberVotes(NewsData.memberVotes)
            setContent(NewsData.content)

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    const editMembershipfunc = async () => {
        if (
            tierName.trim() == "" || tierName.trim() == null
            || content.trim() == "" || content.trim() == null
            || memberVotes.trim() == "" || memberVotes.trim() == null
            || walletLimit.trim() == "" || walletLimit.trim() == null
        ) {
            alert("All fields are required")
        } else {
            const washingtonRef = doc(db, "Memberships", queryParam.toString());

            var membershipDetails = {
                id: queryParam,
                tier:tierName.trim(),
                content: content.trim(),
                memberVotes: memberVotes.trim(),
                walletLimit: walletLimit.trim()
            }
            console.log("membershipDetails", membershipDetails)


            //   // // Set the "capital" field of the city 'DC'
            const aaa = await updateDoc(washingtonRef, membershipDetails);
            setTierName("");
            setWalletLimit("");
            setMemberVotes("")
            setContent("")
            alert("News Added Sucessfully.");
            window.location.reload()
        }
    }
    return (
        <div>
            <h1>Edit Membership Page</h1>
            <div class="left-table">
                <table>
                    <tr>
                        <td>Tier tierName</td>
                        <td><input value={tierName} onChange={(e) => { setTierName(e.target.value) }} type="text" /></td>
                    </tr>
                    <tr>
                        <td>Wallet Limit </td>
                        <td><input value={walletLimit} onChange={(e) => { setWalletLimit(e.target.value) }} ></input></td>
                    </tr>
                    <tr>
                        <td>Member Votes </td>
                        <td><input value={memberVotes} onChange={(e) => { setMemberVotes(e.target.value) }} ></input></td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td><textarea value={content} onChange={(e) => { setContent(e.target.value) }} ></textarea></td>
                    </tr>
                    <tr>
                        <td>Total Members </td>
                        {/* <td><input value={newsContent} onChange={(e) =>{setContent(e.target.value)}} ></input></td> */}
                    </tr>
                </table>
            </div>

            <div class="right-table">
                <div class="add-close-btn">
                    <button onClick={() => { editMembershipfunc() }}>Edit</button>
                </div>

            </div>
        </div>
    )
}

