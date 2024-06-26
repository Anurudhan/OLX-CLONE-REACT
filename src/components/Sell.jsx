import { useState } from "react";
import { useNavigate } from "react-router-dom"
import {  useUserContext } from "../context/Userprovider";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/setup";
import olxLogo from "../assets/olx-logo-vector.png"
import ProductValidate from "../valiadation/ProductValidate";


function Sell() {
    const navigate = useNavigate();

    const [productName,setProductName] = useState('');
    const [category,setCategory] = useState('');
    const [price,setPrice] = useState('');
    const [location,setLocation] = useState('')
    const [image,setImage] = useState('')
    const [error,setError] = useState('');

    const {user} = useUserContext()

    async function handleSubmit(e){
        e.preventDefault();
        console.log("helllo");
        // const error = ProductValidate(productName,category,price)
        // if(error){
        //     setError(error);
        //     return;
        // }
        const storage = getStorage();
        console.log(storage,"storratg");
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef,image);
        const url = await getDownloadURL(storageRef);
        console.log(url,"urlll");
        const date = new Date();

        const docRef = await addDoc(collection(db, 'products'),{
            productName,
            category,
            price,
            location,
            url,
            userId:user,
            createdAt : date.toDateString()
        })

        console.log(docRef,"heeeeeeeee")
        if(docRef) navigate('/')
        
    }

  return (
    <>
    <div className="relative top-16 bg-gray-100 grid grid-cols-12 pb-5">
        <span className="col-span-4"></span>
        <div className="col-span-4 m-10 bg-white rounded-xl">
            <div className="mx-auto text-center">
                <img className="p-2 w-24 mx-auto" src={olxLogo}  />
                <h1 className="font-bold text-xl mt-4 text-black">Sell your Product</h1>

                <input onChange={(e)=> setProductName(e.target.value)} type="text" placeholder="Product Name" 
                className='py-2 px-2 border-2 w-3/4 rounded-lg mt-8 border-black bg-white text-black' />
                <input onChange={(e)=> setCategory(e.target.value)} type="text" placeholder="Product category" 
                className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white text-black' />
                <input onChange={(e)=> setPrice(e.target.value)} type="text" placeholder="Product Prize" 
                 className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white text-black' />
                <input onChange={(e)=> setLocation(e.target.value)} type="text" placeholder="Location" 
                 className="py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white text-black" />

                {
                    image !== null ? 
                    <img className="py-2 px-2 border-2 w-3/4 rounded-lg mx-auto"
                     src={image?URL.createObjectURL(image):null} alt="Product image"/>:null
                }
                <div>
                    <label className="text-start ms-12 rounded-lg mt-5 block text-black" htmlFor="">Choose a picture</label>
                    <input onChange={(e) => setImage(e.target.files[0])} className="py-2 px-2 border-2 w-3/4 rounded-lg mt-1 border-black" type="file" placeholder="Choose a picture" />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button onClick={handleSubmit} className='w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-10 mb-16'>Create</button>
            </div>
        </div>
        <span className="col-span-4"></span>
    </div>
    </>
  )
}

export default Sell