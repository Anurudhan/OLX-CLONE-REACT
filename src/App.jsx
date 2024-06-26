import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Sell from "./components/Sell"
import { useUserContext } from "./context/Userprovider"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/setup"
import LoginWithEmail from "./pages/LoginWithEmail"
import SignUp from "./pages/SignUp"
import Details from "./components/Details"

function App() {
  const {setUser} = useUserContext()
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) {
        const uid = currentUser.uid;
        setUser(uid)
      }
      else setUser(null)
    });
    return () => unsubscribe();
  },[setUser])
  return (
    <>
    <Routes >
       <Route path="/" element={<Main />} />
       <Route path="/sell" element={<Sell />} />
       <Route path = '/login' element={<LoginWithEmail />} />
       <Route path="/signup" element ={<SignUp />} />
       <Route path="/details" element = {<Details />} />
    </Routes>
    </>
  )
}

export default App
