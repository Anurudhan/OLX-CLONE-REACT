import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/setup";
import Home from "./Home";


function Main() {
    const [products,setProducts] = useState([]);
    const [search,setSearch] = useState("")
    const [menu,setMenu] = useState("")

    const getProducts = async () => {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allposts = querySnapshot.docs.map((product) =>{
            return {
                ...product.data(),
                id:product.id
            }
        })
        setProducts(allposts)
    }
    useEffect(()=>{
        getProducts()
    },[])
    console.log(products);
    console.log(getProducts());
  return ( 
    <>
    <Navbar />
    <Menubar />
    <Home products = {products} search = {search} menu={menu} />
    <Footer />
    </>
  )
}

export default Main