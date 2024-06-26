import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/setup";
import { addDoc, collection } from "firebase/firestore";
import { useUserContext } from "../context/Userprovider";

function SignUp() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      await addDoc(collection(db, "user"), {
        id: user.user.uid,
        username: username,
        mobile: phone,
        email: email,
      });
      console.log("hloaga");
      setUser(user.user.uid);
      return navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }
  return (
    <>
      <div className="relative top-16 bg-gray-100 grid grid-cols-12 h-screen pb-5">
        <span className="col-span-4"></span>
        <div className="col-span-4 m-10 bg-white h-3/3 my-auto rounded-xl pt-3">
          <Link to={"/"} className="flex justify-center items-center">
            <svg
              width="48px"
              height="48px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              fillRule="evenodd"
            >
              <path
                className="rui-w4DG7"
                d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
              ></path>
            </svg>
          </Link>

          <div className="mx-auto text-center">
            <h1 className="font-bold text-xl mt-2 text-black">
              Create your Account{" "}
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="py-2 px-2 border-2 w-3/4 rounded-lg mt-7 border-black bg-white text-black"
              type="text"
              placeholder="Username"
            />
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white text-black"
              type="text"
              placeholder="Phone Number"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white text-black"
              type="text"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white text-black"
              type="password"
              placeholder="Password"
            />

            <button
              onClick={handleSubmit}
              className="w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-6"
            >
              Create
            </button>

            <Link to={"/login"}>
              <p className="underline my-5 text-black">Login with Account</p>
            </Link>
          </div>
        </div>
        <span className="col-span-4"></span>
      </div>
    </>
  );
}

export default SignUp;
