'use client'
import NextPageComp from '@/components/NextPageComp'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const NextPage = () => {
    const params = useSearchParams()
     
  return (
    <div>
       <NextPageComp type={params.get('type') || ''} endpointName={params.get('endpointName') || ''} pageNo={parseInt(params.get('pageNo') || '0',  10)} />
    </div>
  )
}

export default NextPage
