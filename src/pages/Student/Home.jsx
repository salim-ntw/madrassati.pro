import React from 'react'
import Welcome from './Welcome'
import Highlight from './Highlight'

export default function Home() {
  return (
    <div className='flex flex-col gap-6'>

        <Welcome />
        <Highlight />
    </div>
  )
}
