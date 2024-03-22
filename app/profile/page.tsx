'use client'
import { UserAuth } from "../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile(){

    const router = useRouter()

    const [name, setName] = useState('')
    const [photoURL, setPhotoURL] = useState('')

    const {user}=UserAuth()

    const updateUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (user) {
        await updateProfile(user, { displayName: name, photoURL: photoURL });
        router.refresh()
    }}



    return(
        <>
          <div className="h-screen lg:w-[79vw] flex items-center justify-center">
            <div className="min-h-[300px] px-4 py-6 rounded-xl bg-black/70 ">
                <h1 className="text-5xl mb-6 font-semibold">Update Profile</h1>
                <form onSubmit={updateUser} >
                    <p className="text-xl">Name</p>
                    <input 
                    type="text" 
                    className=' py-1.5 pl-2 bg-gray-700 rounded w-full my-2'
                    placeholder="Enter New Name" value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <p className="text-xl">Profile Picture</p>
                    <input 
                    className=' py-1.5 pl-2 bg-gray-700 rounded w-full my-2'
                    type="text"
                    onChange={(e)=>setPhotoURL(e.target.value)}
                    value={photoURL}
                    placeholder="Enter Image URL"/>
                    <button className="rounded bg-red-600 text-white w-full mt-4 font-semibold text-2xl p-1">Submit</button>
                </form>
            </div>
          </div>
        </>
    )
}
