import { signInWithEmailAndPassword } from "firebase/auth";
import {useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase/setup";
import { useUserContext } from "../context/Userprovider";
function LoginWithEmail() {
    const {setUser} = useUserContext()
    const navigate = useNavigate()

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function handleLogin (e){
        e.preventDefault();
        try{
           const user =await signInWithEmailAndPassword(auth,email,password);
           setUser(user.user.uid)
            navigate('/')
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <>
        <div className='relative top-16 bg-gray-100 h-screen grid grid-cols-12 pb-1'>
        <span className='col-span-4'></span>
            <div className='col-span-4 m-10 bg-white my-auto rounded-xl h-3/3 pt-3'>

                <Link to={'/'} className='flex justify-center items-center'>
                    <svg width="48px" height="48px" viewBox="0 0 1024 1024" data-aut-id="icon" fillRule="evenodd"><path className="rui-w4DG7" d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path></svg>
                </Link>
                <div className='mx-auto text-center text-black'>

                    <h1 className='font-bold text-xl mt-3'>Enter Email and Password </h1>

                    <input
                        className='py-2 px-2 border-2 w-3/4 rounded-lg mt-7 border-black bg-white'
                        type="text"
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className='py-2 px-2 border-2 w-3/4 rounded-lg mt-5 border-black bg-white'
                        type="password"
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={handleLogin} className='w-3/4 bg-black text-white font-bold text-center text-lg rounded-md py-3 mt-5'>Login</button>

                    <p className='mt-4 font-semibold text-red-500'></p>

                    <Link to={'/signup'}><p className='underline my-14 text-black'>Create an account</p></Link>

                </div>


            </div>
            <span className='col-span-4'></span>


        </div>

    </>
  )
}

export default LoginWithEmail