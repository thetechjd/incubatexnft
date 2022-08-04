import React,{useState,useEffect} from 'react';
import { UserContext } from './UseContext.js';


const UserProvider = ({ children }) => {
    const [user, setUser] = React.useState({ name: '', auth: false });
    const [userCurrentMembership,setUserCurrentMembership]=useState("");
    const [userGensisMebershipCount,setUserGensisMebershipCount]=useState(0);
    const [userMetaMebershipCount,setUserMetaMebershipCount]=useState(0);

  
    return (
      <UserContext.Provider value={{ userCurrentMembership,setUserCurrentMembership,userGensisMebershipCount,setUserGensisMebershipCount,userMetaMebershipCount,setUserMetaMebershipCount }}>
     {children}
      </UserContext.Provider>
    );
  };

  export default UserProvider;