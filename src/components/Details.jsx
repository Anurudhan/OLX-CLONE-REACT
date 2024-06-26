import { useLocation } from "react-router-dom"


function Details() {
    const location = useLocation()
  return (
    <>
    <div className="flex p-4">
     <img src={location?.state?.data?.url}/>
     <div>
        <h1 className="font-bold text-3xl">$ {location?.state?.data?.price}</h1>
        <h1 className="mt-5"><span className="font-semibold">Category</span> : {location?.state?.data?.category}</h1>
        <h1 className="mt-5"><span className="font-semibold">Title</span> : {location?.state?.data?.productName}</h1>
        <h1 className="mt-5"><span className="font-semibold">Description</span> : {location?.state?.data?.location}</h1>
     </div>
    </div>
    </>
  )
}

export default Details