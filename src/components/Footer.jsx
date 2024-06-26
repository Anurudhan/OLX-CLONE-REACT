import olxfoot from "../assets/phone-app.webp"

function Footer() {
  return (
    <>
    <img src={olxfoot} alt="" className="w-5/7 h-60" />
    <div className="bg-cyan-950 h-20">
        <h1 className="text-white p-4 text-xs"> All rights reserved © 2006-2024 OLX</h1>
    </div>
    </>
  )
}

export default Footer