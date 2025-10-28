import React from 'react'
import assets from '../assets/assets'

const Hero = () => {
  return (
    <div
      className="mt-20 flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-no-repeat bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${assets.background2})` }}
    >
      <h1 className="text-5xl font-bold mb-4">Your Journey Starts Here</h1>
      <p className="text-lg max-w-2xl">
        Discover destinations, find affordable flights, and make every trip unforgettable with Altitudes.
      </p>
    </div>
  )
}

export default Hero
