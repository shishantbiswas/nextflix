'use client'
import { UserAuth } from "@/context/AuthContext";
import Link from "next/link";
import {  useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login (){

    const router = useRouter()
    const params = useSearchParams()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    
      const {user,logIn,GoogleAuth,error} = UserAuth();

    const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof logIn === 'function') {
        const userCredential = logIn(email, password);
         if (userCredential && (await userCredential)?.user) {
          if(params.get('callback')=='profile'){
            router.push('/profile')
          }else{
            router.push('/')
          }
        }
      } else {
        console.log('log in function is not defined');
      }
    } catch (error) {
      console.log('sign up failed');
    }
  };


  

  const GoogleAuthSignIn = async () => {
    try {
      if (typeof GoogleAuth === 'function') {
        const userCredential = await GoogleAuth();
        if(params.get('callback')=='profile'){
          router.push('/profile')
        }else{
          router.push('/')
        }
      } else {
        console.log('GoogleAuth is not defined or not a function');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(user){
      if(params.get('callback')){
        router.push(`/${params.get('callback')}`)
      }else{
        router.push('/')
      }
    }
  },[user])

    return (
        <>
          <div className='w-full h-screen flex bg-slate-800 items-center justify-center text-white'>     
            <div className='w-[350px]'>
              <div className=' overflow-hidden rounded-lg'>
                  <div className='p-4 bg-black/70 '>
                    <h1 className='text-4xl font-bold mb-6'>Log In</h1>
                    
                  <div className="bg-black/30 rounded-md">
                              <button 
                              className="py-2 bg-white/10 rounded-lg  w-full"
                              onClick={GoogleAuthSignIn} >
                                <span className="flex items-center justify-between px-4 ">
                                  <p className="text-sm">Sign In With Google</p>
                                  <FcGoogle size={20} />
                                </span>
                              </button>
                            </div>
                            
                            <div className="my-4 relative">
                              <div className="h-[1px] opacity-50 bg-white w-full "/>
                              <p className="absolute -top-[14px] right-[45%]"><span className="bg-black text-white/50 rounded-full p-1 border-[1px] border-white/50 font-bold text-[9px]">OR</span></p>
                            </div>
                      <form
                      onSubmit={handleFormSubmit}
                      className='w-full flex flex-col pb-4 '
                      >
                        <input 
                        autoComplete='email'
                        placeholder='E-mail'
                        className='p-3 my-2 bg-gray-700 rounded'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        type="email"
                         /><input 
                         autoComplete='current-password'
                         placeholder='Password'
                         className='p-3 my-2 bg-gray-700 rounded'
                         type={showPassword ? "text" : "password"}
                         value={password}
                         onChange={(e)=>setPassword(e.target.value)}
                          />
                          <div 
                          className="flex justify-center w-fit mt-2 items-center gap-2"
                          onClick={() => setShowPassword(!showPassword)}
                          >
                            <input type="checkbox" className=" accent-red-600 h-4 w-4" readOnly checked={showPassword}/>
                            <p className="cursor-pointer text-sm ">
                              Show Password
                            </p>
                          </div>
                          <button className='bg-red-600 py-3 mt-4 mb-2 rounded font-semibold'>
                            Log In
                          </button>
                          <div className="text-lg text-red-600">
                              {error && (
                                <>
                                    <p>{error}</p>
                                </>
                              )}
                              </div>
                          <div className='flex justify-between items-center'>
                            <Link href={'/forgotpassword'}>Forgot Password ?</Link>
                            </div>
    
                            <p className='my-4 opacity-45'>
                              <span>Don&apos;t Have a Account ?</span><br />
                              <Link href={`${params.get('callback')=='profile' ? '/signup?callback=profile' : '/signup'}`}>Sign Up</Link>
                            </p>
                      </form>
                  </div>
              </div>
            </div>
            <div>
    
            </div>
          </div>
    
        </>
      )
}