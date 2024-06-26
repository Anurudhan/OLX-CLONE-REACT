import { Link } from "react-router-dom"


function Home(props) {
  return (
    <>
    <div className="grid grid-cols-4 p-5 ">
      {props?.products?.filter((data)=> data?.productName?.includes(props?.search ? props?.search : props?.menu)).map((data)=>{
        return <Link to="/details" state={{data:data}}><div className="border border-spacing-1 p-2 ml-3 mt-3">
         <img src={data?.url} className="w-60 h-48"/>
         <h1 className="font-bold text-xl">$ {data?.price}</h1>
         <h1>{data?.productName}</h1>
         <h1>{data?.category}</h1>
        </div></Link>
      })}
    </div>
    </>
  )
}

export default Home