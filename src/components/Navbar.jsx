import  olx  from "../assets/olx-logo-vector.png";
import search from "../assets/search-512.webp";
import arrow from "../assets/free-arrow-down-icon-3101-thumb.png";
import SearchButton from "../assets/pngtree-vector-find-icon-png-image_854997.jpg"
import { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useUserContext } from "../context/Userprovider";
import { auth } from "../firebase/setup";

function Navbar() {
  const {user,setUser} = useUserContext();
  const [loginPop,setLoginPop] = useState(false);
  

  const handleLogout = async () => {
    try{
      await signOut(auth)
      setUser(null)
    }
    catch(err){
      console.log(err);
    }
}
  return (
    <>
    <div className="flex p-4 bg-slate-100 shadow-md"> 
        <img src={olx}  className="w-11 h-9 ml-2"/>
        <div className="flex border-2 rounded border-spacing-1 w-64 p-2 border-black ml-10 bg-white">
          <img src={search}  className="w-6 h-5 mt-1"/>
          <input  placeholder="Location" className="ml-3 outline-none"/>
          <img src={arrow}  className="w-8 h-6 "/>
        </div>
        <div className="flex h-12 ml-4 border-2 border-black rounded bg-white">
          <input placeholder="Find cars, Mobile phones and more" 
          className="ml-3 w-96 outline-none" />
          <img src={SearchButton } className="w-12" />
        </div>
        <div className="flex h-12 p-3 ml-10 space-x-2 cursor-pointer">
          <h1 className="font-semibold">English</h1>
          <img src={arrow} alt="" className="w-7 h-7" />
        </div>
        <div onClick={!user?() => setLoginPop(!loginPop):handleLogout} className="h-12 p-3 cursor-pointer ml-6 underline hover:no-underline">
                    <h1 className="font-bold text-lg">{user ? "Logout" : "Login"}</h1>
        </div>
        <Link to="/sell">
        <div className="w-28  h-12 p-2 cursor-pointer ml-6 rounded-full border border-yellow-500">
          <h1 className="ml-3 font-bold text-lg ">+ SELL</h1>
        </div>
        </Link>
    </div>
    {loginPop && !user && <Login setLoginPop={setLoginPop}  />}
    </>
  )
}

export default Navbar