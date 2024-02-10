'use client'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

const Anime = () => {
    const pathname = usePathname()
    const router = useRouter()
    if(pathname=='/anime'){
        router.push('/anime/1')
    }
}

export default Anime
