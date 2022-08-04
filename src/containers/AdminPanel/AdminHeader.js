import React from 'react'
import adminlogo from '../../assets/adminImages/admin-logo.png';
import adminprofilepic from '../../assets/adminImages/admin-profile-pic.png';
import '../AdminPanel/Admincss.css'
import { useEthers } from "@usedapp/core";

export default function AdminHeader() {
    const { activateBrowserWallet, account, deactivate } = useEthers();

    return (
        <div>
        <div class="admin-header">
	<div class="admin-logo">
    	<img onClick={()=>{window.location.href="/admin/projects"}} src={adminlogo} alt="IncubateX" />
    </div>
    <div class="profile-avtar">
   		<div class="right-side"><img src={adminprofilepic} /></div>
     	<div class="middle-side">
        	<span><b>Wallet :</b> {account &&
                                    `${account.slice(0, 4)}...${account.slice(
                                        account.length - 4,
                                        account.length
                                    )}`}</span>
        </div>
    	<div class="left-side"><a href="/admin/notifications"><i class="far fa-bell"></i></a></div>
    </div>
</div>  
        </div>
    )
}
