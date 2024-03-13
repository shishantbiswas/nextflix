'use client'
import { UserAuth } from '@/context/AuthContext'
import { useState } from 'react'


export default function ForgotPassword(){

    const [email, setEmail] = useState('')

    const authContext = UserAuth();
    if (!authContext) {
        throw new Error('Auth context is null');
      }

    const {user,signUp,GoogleAuth,ForgotPassword} = authContext


    const resetHandler = (e: { preventDefault: () => void })=>{
        e.preventDefault()
        ForgotPassword(email)
    }

    return(
        <>
         <form onSubmit={resetHandler}>
         <input type="text" placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} />
         <button>submit</button>
         </form>
        </>
    )
}